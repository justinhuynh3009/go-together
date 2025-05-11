<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Guest\OrderController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController as AdminOrderController;

Route::get('/', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/orders/customer', [OrderController::class, 'index'])->name('orders.index');
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/success', [OrderController::class, 'success'])->name('orders.success');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');

    Route::get('/menus/categories', [MenuController::class, 'index'])->name('menu-categories.index');
    Route::post('/menu-categories', [MenuController::class, 'store'])->name('menu-categories.store');
    Route::delete('/menu-categories/{id}', [MenuController::class, 'destroy'])->name('menu-categories.destroy');

    Route::get('/menus/items', [MenuController::class, 'menuItems'])->name('menu-items.index');
    Route::post('/menu-items', [MenuController::class, 'storeItem'])->name('menu-items.store');

    Route::get('/orders', [AdminOrderController::class, 'index'])->name('admin.orders.index');

    // Route::get('/customers/create', [CustomerController::class, 'create'])->name('customers.create');
    // Route::get('/customers/{id}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
