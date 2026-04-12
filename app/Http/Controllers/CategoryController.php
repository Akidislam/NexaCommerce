<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // Fetch products that belong to this category (add with shop for shop details)
        // Check if the product's shop is also active (production practice)
        $products = Product::where('category_id', $category->id)
            ->where('status', 'active')
            ->whereHas('shop', function ($query) {
            $query->where('status', 'active');
        })
            ->with(['shop'])
            ->latest()
            ->paginate(12);

        return Inertia::render('Category/Show', [
            'category' => $category,
            'products' => $products,
        ]);
    }
}
