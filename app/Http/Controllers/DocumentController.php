<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Document;
use App\Models\Product;
use Inertia\Inertia;

use function Laravel\Prompts\search;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart = session()->get('cart', []);

        $customer = Customer::all();

        return inertia::render('Document/Index', [
            'cart' => collect($cart)->map(function ($item){
                return [
                    'id'        => $item['product']->id,
                    'name'      => $item['product']->name,
                    'price'     => $item['product']->price,
                    'quantity'  => $item['quantity']->quantity,
                    'total'     => $item['price'] * $item['quantity'],
                ];
            }),

            'customers'  =>    collect($customer),

            'totalGeral' => collect($cart)->sum(fn ($item) => $item['price'] * $item['quantity']),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }

    public function add()
    {
        dd(session()->get('cart'));
    }
}
