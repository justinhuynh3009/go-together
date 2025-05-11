<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::orderBy('id', 'desc')->get();

        return inertia('Order/List', [
            'orders' => OrderResource::collection($orders)->resolve(),
        ]);
    }
}
