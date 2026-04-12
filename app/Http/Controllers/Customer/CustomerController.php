<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Shop;
use App\Models\Order;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function dashboard()
    {
        $orders = auth()->user()->orders()->with('items.product', 'items.shop')->latest()->take(5)->get();

        return Inertia::render('Customer/Dashboard', [
            'orders' => $orders,
        ]);
    }

    public function orders()
    {
        $orders = auth()->user()->orders()->with('items.product', 'items.shop')->latest()->paginate(10);

        return Inertia::render('Customer/Orders', [
            'orders' => $orders,
        ]);
    }
}
