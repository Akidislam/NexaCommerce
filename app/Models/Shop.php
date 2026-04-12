<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'logo',
        'banner',
        'phone',
        'email',
        'address',
        'rating',
        'total_products',
        'total_orders',
        'status',
    ];

    protected $casts = [
        'rating' => 'decimal:2',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class , 'user_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function isActive()
    {
        return $this->status === 'active';
    }
}
