<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Vendor\VendorDashboardController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\CategoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/* |-------------------------------------------------------------------------- | Web Routes |-------------------------------------------------------------------------- */

// Public Routes
Route::get('/', [HomeController::class , 'index'])->name('home');
Route::get('/category/{slug}', [CategoryController::class , 'show'])->name('category.show');

// Customer Dashboard (default for authenticated users)
Route::get('/dashboard', function () {
    $user = auth()->user();
    switch ($user->role) {
        case 'admin':
            return redirect()->route('admin.dashboard');
        case 'vendor':
            return redirect()->route('vendor.dashboard');
        default:
            return app(CustomerController::class)->dashboard();
    }
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile & Cart Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class , 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class , 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class , 'destroy'])->name('profile.destroy');

    // Database Cart
    Route::get('/api/cart', [\App\Http\Controllers\CartController::class , 'getCart'])->name('cart.api');
    Route::get('/cart', [\App\Http\Controllers\CartController::class , 'index'])->name('cart.index');
    Route::post('/cart', [\App\Http\Controllers\CartController::class , 'store'])->name('cart.store');
    Route::put('/cart/{id}', [\App\Http\Controllers\CartController::class , 'update'])->name('cart.update');
    Route::delete('/cart/{id}', [\App\Http\Controllers\CartController::class , 'destroy'])->name('cart.destroy');
});

// Admin Routes
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class , 'index'])->name('dashboard');
    Route::get('/users', [AdminDashboardController::class , 'users'])->name('users');
    Route::get('/shops', [AdminDashboardController::class , 'shops'])->name('shops');
    Route::post('/shops/{id}/toggle-status', [AdminDashboardController::class , 'toggleShopStatus'])->name('shops.toggleStatus');
    Route::post('/products/{id}/status/{status}', [AdminDashboardController::class , 'updateProductStatus'])->name('products.updateStatus');
    Route::get('/categories', [AdminDashboardController::class , 'categories'])->name('categories');
    Route::get('/orders', [AdminDashboardController::class , 'orders'])->name('orders');
});

// Vendor Routes
Route::middleware(['auth', 'verified', 'role:vendor'])->prefix('vendor')->name('vendor.')->group(function () {
    Route::get('/dashboard', [VendorDashboardController::class , 'index'])->name('dashboard');

    // Shop setup & management
    Route::get('/shop/create', [\App\Http\Controllers\Vendor\ShopController::class , 'create'])->name('shop.create');
    Route::post('/shop', [\App\Http\Controllers\Vendor\ShopController::class , 'store'])->name('shop.store');

    // Products & Orders
    // We already have index logic in VendorDashboardController optionally, but let's use the dedicated controllers:
    Route::resource('products', \App\Http\Controllers\Vendor\VendorProductController::class);
    Route::resource('orders', \App\Http\Controllers\Vendor\VendorOrderController::class)->only(['index', 'show', 'update']);
});

// Customer Routes
Route::middleware(['auth', 'verified', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/orders', [CustomerController::class , 'orders'])->name('orders');
});

require __DIR__ . '/auth.php';
