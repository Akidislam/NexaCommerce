<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'category_id',
        'name',
        'slug',
        'description',
        'short_description',
        'price',
        'discount_price',
        'sku',
        'quantity',
        'images',
        'thumbnail',
        'rating',
        'total_reviews',
        'total_sold',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'images' => 'array',
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'rating' => 'decimal:2',
        'is_featured' => 'boolean',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getDiscountPercentageAttribute()
    {
        if ($this->discount_price && $this->price > 0) {
            return round((($this->price - $this->discount_price) / $this->price) * 100);
        }
        return 0;
    }

    public function getEffectivePriceAttribute()
    {
        return $this->discount_price ?? $this->price;
    }
}
