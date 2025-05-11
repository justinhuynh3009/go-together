<?php

namespace App\Models;

use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['order_type', 'status', 'total_amount', 'tax_amount', 'discount_amount', 'payment_method', 'payment_status', 'notes'];

    protected $casts = [
        'status' => OrderStatus::class,
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }
}
