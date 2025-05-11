<?php

namespace App\Http\Controllers\Guest;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $products = MenuItem::where('is_available', true)
            ->orderBy('id')
            ->get();

        return inertia('Guest/OrderPage', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'carts' => 'required|array|min:1',
            'carts.*.product_id' => 'required|exists:menu_items,id',
            'carts.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $totalAmount = 0;
                $orderItems = [];

                $products = MenuItem::whereIn('id', collect($validated['carts'])->pluck('product_id'))->get();

                foreach ($validated['carts'] as $cart) {

                    $product = $products->find($cart['product_id']);

                    if (!$product) {
                        return redirect()->back()->withErrors(['carts' => 'Product not found.']);
                    }

                    $totalAmount += $product->price * $cart['quantity'];

                    $orderItems[] = new OrderItem([
                        'menu_item_id' => $cart['product_id'],
                        'quantity' => $cart['quantity'],
                        'unit_price' => $product->price,
                        'status' => OrderStatus::PENDING,
                    ]);
                }

                $order = Order::create([
                    'order_type' => 2,
                    'status' => OrderStatus::PENDING,
                    'total_amount' => $totalAmount,
                    'payment_method' => 'cash',
                    'payment_status' => 0,
                ]);

                $order->orderItems()->saveMany($orderItems);
            });
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'An error occurred while processing your order.']);
        }

        return redirect()->route('orders.success');
    }

    public function success()
    {
        return inertia('Guest/OrderSuccess');
    }
}
