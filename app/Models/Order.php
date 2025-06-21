<?php

namespace App\Models;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['order_type', 'status', 'total_amount', 'tax_amount', 'discount_amount', 'payment_method', 'payment_status', 'notes', 'customer_id'];

    protected $casts = [
        'status' => OrderStatus::class,
        'payment_status' => PaymentStatus::class,
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function orderItemsWithProduct()
    {
        return $this->hasMany(OrderItem::class, 'order_id')
            ->with('product');
    }
}
