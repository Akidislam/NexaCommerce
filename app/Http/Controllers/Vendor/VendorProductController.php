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
        $shop = auth()->user()->shop;
        if (!$shop) {
            return redirect()->route('vendor.shop.create');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'description' => 'required|string',
        ]);

        // Find or Create Category
        $category = \App\Models\Category::firstOrCreate(
        ['name' => $request->category],
        [
            'slug' => \Illuminate\Support\Str::slug($request->category),
            'status' => 'active',
            'icon' => '📦'
        ]
        );

        $product = new Product();
        $product->shop_id = $shop->id;
        $product->category_id = $category->id;
        $product->name = $request->name;
        $product->slug = \Illuminate\Support\Str::slug($request->name) . '-' . uniqid();
        $product->price = $request->price;
        $product->quantity = $request->quantity;
        $product->description = $request->description;
        $product->status = 'active'; // Default to active for simulation

        // Handle cover image
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $product->thumbnail = '/storage/' . $path;
            $product->images = ['/storage/' . $path];
        }

        $product->save();

        return redirect()->back()->with('success', 'Product created successfully.');
    }

    public function destroy($id)
    {
        $product = Product::where('shop_id', auth()->user()->shop->id)->findOrFail($id);
        $product->delete();
        return redirect()->back()->with('success', 'Product deleted.');
    }
}
