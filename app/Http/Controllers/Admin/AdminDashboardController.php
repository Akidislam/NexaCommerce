<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Shop;
use App\Models\Product;
use App\Models\Order;
use App\Models\Category;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_vendors' => User::where('role', 'vendor')->count(),
            'total_customers' => User::where('role', 'customer')->count(),
            'total_shops' => Shop::count(),
            'active_shops' => Shop::where('status', 'active')->count(),
            'pending_shops' => Shop::where('status', 'pending')->count(),
            'total_products' => Product::count(),
            'pending_products' => Product::where('status', 'pending')->count(),
            'total_orders' => Order::count(),
            'total_categories' => Category::count(),
            'total_revenue' => Order::where('payment_status', 'paid')->sum('total'),
        ];

        $allShops = Shop::with('owner')->latest()->get();
        $pendingProducts = Product::with('shop')->where('status', 'pending')->latest()->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'shops' => $allShops,
            'pendingProducts' => $pendingProducts,
        ]);
    }

    public function toggleShopStatus($id)
    {
        $shop = Shop::findOrFail($id);
        $shop->status = $shop->status === 'active' ? 'inactive' : 'active';
        $shop->save();

        return back()->with('success', 'Shop status updated successfully.');
    }

    public function updateProductStatus($id, $status)
    {
        if (!in_array($status, ['active', 'rejected'])) {
            return back()->with('error', 'Invalid status.');
        }

        $product = Product::findOrFail($id);
        $product->status = $status;
        $product->save();

        return back()->with('success', 'Product status updated to ' . $status . ' successfully.');
    }

    public function users()
    {
        $users = User::latest()->paginate(15);

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function shops()
    {
        $shops = Shop::with('owner')->latest()->paginate(15);

        return Inertia::render('Admin/Shops', [
            'shops' => $shops,
        ]);
    }

    public function categories()
    {
        $categories = Category::with('parent', 'children')->orderBy('sort_order')->get();

        return Inertia::render('Admin/Categories', [
            'categories' => $categories,
        ]);
    }

    public function orders()
    {
        $orders = Order::with('user', 'items.shop')->latest()->paginate(15);

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
        ]);
    }
}
