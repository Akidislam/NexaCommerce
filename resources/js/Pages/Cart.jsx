import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useCart } from '@/Contexts/CartContext';

export default function Cart() {
    const { auth } = usePage().props;
    const { cartItems, removeFromCart, updateQuantity, cartTotalCount } = useCart();

    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.discount_price ? Number(item.discount_price) : Number(item.price);
        return acc + (price * item.quantity);
    }, 0);

    const shipping = subtotal > 500 ? 0 : 60;
    const total = subtotal + shipping;

    return (
        <GuestLayout title="Shopping Cart">
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart ({cartTotalCount} Items)</h1>

                    {cartItems.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Cart Items List */}
                            <div className="flex-1">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50/50 text-sm font-medium text-gray-500">
                                        <div className="col-span-6">Product Details</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-2 text-center">Quantity</div>
                                        <div className="col-span-2 text-right">Total</div>
                                    </div>

                                    <div className="divide-y divide-gray-100">
                                        {cartItems.map((item) => {
                                            const itemPrice = item.discount_price ? Number(item.discount_price) : Number(item.price);
                                            return (
                                                <div key={item.id} className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center flex flex-col gap-4">
                                                    {/* Product Details */}
                                                    <div className="col-span-6 flex gap-4">
                                                        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                                                            <img
                                                                src={item.thumbnail || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=eff6ff&color=2979FF&size=400`}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-between py-1">
                                                            <div>
                                                                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                                                                    {item.name}
                                                                </h3>
                                                                {item.category?.name && (
                                                                    <p className="text-xs text-gray-500">{item.category.name}</p>
                                                                )}
                                                            </div>
                                                            <button
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="text-xs font-medium text-red-500 hover:text-red-700 w-fit flex items-center gap-1"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Price (Mobile & Desktop) */}
                                                    <div className="col-span-2 flex sm:block justify-between items-center sm:text-center">
                                                        <span className="sm:hidden text-sm text-gray-500">Price:</span>
                                                        <div>
                                                            <span className="text-sm font-semibold text-nexa-blue">৳{itemPrice.toLocaleString()}</span>
                                                            {item.discount_price && (
                                                                <span className="block text-xs text-gray-400 line-through">৳{Number(item.price).toLocaleString()}</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Quantity */}
                                                    <div className="col-span-2 flex sm:block justify-between items-center sm:text-center">
                                                        <span className="sm:hidden text-sm text-gray-500">Quantity:</span>
                                                        <div className="inline-flex items-center border border-gray-200 rounded-lg bg-white">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="px-3 py-1 text-gray-500 hover:text-nexa-blue disabled:opacity-50"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-8 text-center text-sm font-medium border-x border-gray-200 py-1">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="px-3 py-1 text-gray-500 hover:text-nexa-blue"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Total */}
                                                    <div className="col-span-2 flex sm:block justify-between items-center sm:text-right">
                                                        <span className="sm:hidden text-sm text-gray-500">Total:</span>
                                                        <span className="text-sm font-bold text-nexa-orange">
                                                            ৳{(itemPrice * item.quantity).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary Summary */}
                            <div className="w-full lg:w-80 shrink-0">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

                                    <div className="space-y-3 text-sm text-gray-600 mb-6">
                                        <div className="flex justify-between">
                                            <span>Subtotal ({cartTotalCount} items)</span>
                                            <span className="font-medium text-gray-800">৳{subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping Fee</span>
                                            <span className="font-medium text-gray-800">
                                                {shipping === 0 ? <span className="text-green-500">Free</span> : `৳${shipping}`}
                                            </span>
                                        </div>
                                        {shipping > 0 && (
                                            <p className="text-xs text-nexa-blue bg-blue-50 p-2 rounded">
                                                Add ৳{500 - subtotal} more for free shipping!
                                            </p>
                                        )}
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 mb-6">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-base font-bold text-gray-800">Total</span>
                                            <span className="text-xl font-bold text-nexa-orange">৳{total.toLocaleString()}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-400 text-right">VAT included, where applicable</p>
                                    </div>

                                    <Link
                                        href={route('dashboard')}
                                        className="btn-primary w-full py-3 text-base flex justify-center uppercase tracking-wide font-bold"
                                    >
                                        Proceed to Checkout
                                    </Link>

                                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Secure transaction
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto mt-10">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Looks like you haven't added anything to your cart yet. Discover our amazing products and start shopping!
                            </p>
                            <Link href="/" className="btn-primary inline-flex gap-2 items-center px-8 py-3">
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
