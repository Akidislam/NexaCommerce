<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorOrderController extends Controller
{
    public function index()
    {
        $shop = auth()->user()->shop;

        if (!$shop) {
            return redirect()->route('vendor.shop.create');
        }

        $orderItems = OrderItem::where('shop_id', $shop->id)
            ->with(['order.user'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Vendor/Orders', [
            'orderItems' => $orderItems,
            'shop' => $shop
        ]);
    }
}
