<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Cart::with('product')
            ->where('user_id', auth()->id())
            ->get();

        return response()->json($cartItems);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
        ]);

        $cart = Cart::updateOrCreate(
        [
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
        ],
        [
            'quantity' => \DB::raw('quantity + ' . ($request->quantity ?? 1))
        ]
        );

        return response()->json([
            'message' => 'Product added to cart successfully',
            'cart' => $cart
        ]);
    }

    public function destroy($id)
    {
        Cart::where('user_id', auth()->id())->where('id', $id)->delete();
        return response()->json(['message' => 'Item removed from cart']);
    }

    public function update(Request $request, $id)
    {
        $request->validate(['quantity' => 'required|integer|min:1']);
        $cart = Cart::where('user_id', auth()->id())->findOrFail($id);
        $cart->update(['quantity' => $request->quantity]);
        return response()->json(['message' => 'Quantity updated', 'cart' => $cart]);
    }
}
