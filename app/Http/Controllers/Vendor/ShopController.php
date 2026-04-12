<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function create()
    {
        // Check if user already has a shop
        if (auth()->user()->shop) {
            return redirect()->route('vendor.dashboard');
        }

        return Inertia::render('Vendor/SetupShop');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:shops,name',
            'description' => 'required|string',
            'address' => 'required|string|max:500',
        ]);

        Shop::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->name),
            'description' => $request->description,
            'address' => $request->address,
            'status' => 'pending', // Requires admin approval
            // logo upload logic could go here
        ]);

        return redirect()->route('vendor.dashboard')->with('success', 'Shop creation request submitted successfully. Please wait for admin approval.');
    }
}
