<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorProductController extends Controller
{
    public function index()
    {
        $shop = auth()->user()->shop;

        if (!$shop) {
            return redirect()->route('vendor.shop.create');
        }

        $products = Product::where('shop_id', $shop->id)
            ->with('category')
            ->latest()
            ->paginate(10);

        return Inertia::render('Vendor/Products', [
            'products' => $products,
            'shop' => $shop
        ]);
    }

    public function create()
    {
    // View for creating products goes here
    }

    public function store(Request $request)
    {
    // Store product logic goes here
    }

// other standard resource methods (edit, update, destroy) can be implemented here
}
