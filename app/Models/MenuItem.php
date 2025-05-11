<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = ['name', 'description', 'display_order', 'is_available', 'category_id', 'price', 'image_url'];

    protected $casts = [
        'is_available' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(MenuCategory::class, 'category_id');
    }
}
