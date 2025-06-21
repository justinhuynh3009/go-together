<?php

namespace App\Http\Controllers\Guest;

use App\Enums\OrderStatus;
use App\Events\OrderCreated;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Enums\PaymentStatus;

class OrderController extends Controller
{
    public function index(Customer $customer)
    {
        $products = MenuItem::where('is_available', true)
            ->orderBy('id')
            ->get();

        return inertia('Guest/OrderPage', [
            'customer_uuid' => $customer->uuid,
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_uuid' => 'required',
            'carts' => 'required|array|min:1',
            'carts.*.product_id' => 'required|exists:menu_items,id',
            'carts.*.quantity' => 'required|integer|min:1',
        ]);

        $customer = Customer::where('uuid', $validated['customer_uuid'])->first();

        if (!$customer) {
            return redirect()->back()->withErrors(['customer_uuid' => 'Customer not found.']);
        }

        try {
            $order = DB::transaction(function () use ($validated,  $customer) {
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
                    'payment_status' => PaymentStatus::UNPAID,
                    'customer_id' => $customer->id,
                ]);

                $order->orderItems()->saveMany($orderItems);

                return $order;
            });

            OrderCreated::dispatch($order);
        } catch (\Exception $e) {
            info('Order creation failed: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'An error occurred while processing your order.']);
        }

        return redirect()->route('orders.success', ['customer_uuid' => $customer->uuid]);
    }

    public function success($customer_uuid)
    {
        return inertia('Guest/OrderSuccess', [
            'customer_uuid' => $customer_uuid,
        ]);
    }
}
