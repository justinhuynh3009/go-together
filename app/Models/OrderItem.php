<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'menu_item_id', 'quantity', 'unit_price', 'special_instructions', 'status'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function product()
    {
        return $this->hasOne(MenuItem::class, 'id', 'menu_item_id');
    }
}
