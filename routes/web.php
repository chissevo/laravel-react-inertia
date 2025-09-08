<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EnterpriseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function()
{
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    Route::resource('product',      ProductController::class);
    Route::resource('category',     CategoryController::class);
    Route::resource('enterprise',   EnterpriseController::class);
    Route::resource('user',         UserController::class);
    Route::resource('customer',     CustomerController::class);
    /*Route::resource('document',     DocumentController::class);
    Route::resource('cart', CartController::class);*/

    Route::prefix('cart')->group(function() {
        Route::get('/index', [CartController::class, 'index'])->name('cart.index');
        Route::post('/add', [CartController::class, 'add'])->name('cart.add');
        Route::post('/edit/{cart}', [CartController::class, 'edit'])->name('cart.edit');
        Route::post('/remove/{cart}', [CartController::class, 'destroy'])->name('cart.remove');
        Route::post('/update', [CartController::class, 'update'])->name('cart.update');
        Route::post('/search/{search}', [CartController::class, 'search'])->name('cart.search');
        Route::get('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
    });

    /*Route::get('/home', function(){
        return inertia::render('Cart.Cart', [
            'cart'      => session()->get('cart', []),
            'products'  => Product::all(),
        ]);
    })->name('home');*/
});

Route::middleware('auth')->group(function () {
    Route::get('/profile',      [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile',    [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile',   [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
