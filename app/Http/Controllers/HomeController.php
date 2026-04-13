<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Shop;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::whereNull('parent_id')
            ->where('is_active', true)
            ->with('children')
            ->orderBy('sort_order')
            ->get();

        $featuredProducts = Product::where('status', 'active')
            ->whereHas('shop', function ($q) {
            $q->where('status', 'active');
        })
            ->where('is_featured', true)
            ->with('shop')
            ->take(12)
            ->get();

        $latestProducts = Product::where('status', 'active')
            ->whereHas('shop', function ($q) {
            $q->where('status', 'active');
        })
            ->with('shop')
            ->latest()
            ->take(24)
            ->get();

        $topShops = Shop::where('status', 'active')
            ->orderBy('rating', 'desc')
            ->take(8)
            ->get();

        return Inertia::render('Home', [
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
            'latestProducts' => $latestProducts,
            'topShops' => $topShops,
        ]);
    }
}
