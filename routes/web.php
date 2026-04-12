<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Vendor\VendorDashboardController;
use App\Http\Controllers\Customer\CustomerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/* |-------------------------------------------------------------------------- | Web Routes |-------------------------------------------------------------------------- */

// Public Routes
Route::get('/', [HomeController::class , 'index'])->name('home');

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

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class , 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class , 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class , 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class , 'index'])->name('dashboard');
    Route::get('/users', [AdminDashboardController::class , 'users'])->name('users');
    Route::get('/shops', [AdminDashboardController::class , 'shops'])->name('shops');
    Route::get('/categories', [AdminDashboardController::class , 'categories'])->name('categories');
    Route::get('/orders', [AdminDashboardController::class , 'orders'])->name('orders');
});

// Vendor Routes
Route::middleware(['auth', 'verified', 'role:vendor'])->prefix('vendor')->name('vendor.')->group(function () {
    Route::get('/dashboard', [VendorDashboardController::class , 'index'])->name('dashboard');
    Route::get('/products', [VendorDashboardController::class , 'products'])->name('products');
    Route::get('/orders', [VendorDashboardController::class , 'orders'])->name('orders');
});

// Customer Routes
Route::middleware(['auth', 'verified', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/orders', [CustomerController::class , 'orders'])->name('orders');
});

require __DIR__ . '/auth.php';
