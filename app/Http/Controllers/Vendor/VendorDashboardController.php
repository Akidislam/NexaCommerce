<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;

class VendorDashboardController extends Controller
{
    public function index()
    {
        $shop = auth()->user()->shop;

        if (!$shop) {
            return Inertia::render('Vendor/SetupShop');
        }

        $stats = [
            'shop' => $shop,
            'total_products' => $shop->products()->count(),
            'active_products' => $shop->products()->where('status', 'active')->count(),
            'total_orders' => OrderItem::where('shop_id', $shop->id)->distinct('order_id')->count('order_id'),
            'total_revenue' => OrderItem::where('shop_id', $shop->id)->sum('total'),
            'recent_orders' => OrderItem::where('shop_id', $shop->id)
            ->with('order.user', 'product')
            ->latest()
            ->take(5)
            ->get(),
        ];

        return Inertia::render('Vendor/Dashboard', [
            'stats' => $stats,
        ]);
    }

    public function products()
    {
        $shop = auth()->user()->shop;

        if (!$shop) {
            return redirect()->route('vendor.dashboard');
        }

        $products = $shop->products()->with('category')->latest()->paginate(15);

        return Inertia::render('Vendor/Products', [
            'products' => $products,
            'shop' => $shop,
        ]);
    }

    public function orders()
    {
        $shop = auth()->user()->shop;

        if (!$shop) {
            return redirect()->route('vendor.dashboard');
        }

        $orderItems = OrderItem::where('shop_id', $shop->id)
            ->with('order.user', 'product')
            ->latest()
            ->paginate(15);

        return Inertia::render('Vendor/Orders', [
            'orderItems' => $orderItems,
            'shop' => $shop,
        ]);
    }
}
