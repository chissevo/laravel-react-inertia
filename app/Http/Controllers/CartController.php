<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart = session()->get('cart', []);

        $products = Product::all();
        $customer = Customer::all();

        //dd(session()->get('cart', []));

        return inertia::render('Cart/Cart', [
            'cart'       =>    collect($cart),
            'products'   =>    collect($products),
            'customers'  =>    collect($customer),
        ]);

    }

    /**
     * Search a listing of the products
     */

     public function search(string $search)
     {
        dd($search);
     }

    public function add(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity  = $request->input('quantity', 1);

        $cart = session()->get('cart', []);

        if(isset($cart[$productId])){
            $cart[$productId] += $quantity;
        } else{
            $cart[$productId] = $quantity;
        }
        session()->put('cart', $cart);

        return redirect()->route('cart.index');
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        dd($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity  = $request->input('quantity');

        if($quantity < 1)
        {
            return redirect()->back()->withErrors(['quantity' => 'A quantidade deve ser pelomenos 1.']);
        }

        $cart = session()->get('cart', []);

        if (isset($cart[$productId]))
        {
            $cart[$productId] = $quantity;
            session()->put('cart', $cart);
        }

        return redirect()->route('cart.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        dd($id);
    }
}
