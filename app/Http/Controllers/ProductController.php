<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\UserResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use User;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortField      = request("sort_field", "created_at");
        $sortDirection  = request("sort_direction", "desc");

        $busca = Product::query();

        if (request('name'))
        {
            $busca->where("name", "like","%". request("name") .  "%");
        }

        if (request('status'))
        {
            $busca->where("status", request("status"));
        }

        $products = $busca->orderBy($sortField, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);

        return inertia("Product/Index", [
            "products"      => ProductResource::collection($products),
            "queryParams"   => request()->query() ?: null,
            "success"       => session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products   = Product::all();
        $categories = Category::all();

        return inertia("Product/Create", [
            'products'   => ProductResource::collection($products),
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $product = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $product['image_path'] ?? null;

        $product['created_by']         = Auth::id();
        $product['updated_by']         = Auth::id();
        $product['assigned_user_id']   = Auth::id();

        if ($image)
        {
            $product['image_path'] = $image->store('produtos/' . Str::random(), 'public');
        }

        Product::create($product);

        return to_route('product.index')->with('success', 'Produto criado com sucesso.');
    }
    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        dd($product);
        $query = $product->categories();

        $sortField      = request("sort_field", "created_at");
        $sortDirection  = request("sort_direction", "desc");

        if (request('name'))
        {
            $query->where("name", "like","%". request("name") .  "%");
        }

        if (request('status'))
        {
            $query->where("status", request("status"));
        }

        $categories = $query->orderBy($sortField, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);

        return inertia('Product/Show', [
            'products'           => new ProductResource($product),
            'categories'        => CategoryResource::collection($categories),
            'queryParams'       => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return inertia('Product/Edit',
        [
            'product' => new ProductResource($product)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $name = $product->name;

        $data = $request->validated();

        $image = $data['image'] ?? null;

        $data['updated_by'] = Auth::id();

        if ($image)
        {
            if ($product->image_path)
            {
                Storage::disk('public')->deleteDirectory(dirname($product->image_path));
            }
            $data['image_path'] = $image->store('product/' . Str::random(), 'public');
        }

        $product->update($data);

        return to_route('product.index')->with('success', "Product \"$name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $name = $product->name;

        $product->tasks()->delete();

        if ($product->image_path)
        {
            Storage::disk('public')->deleteDirectory(dirname($product->image_path));
        }

        return to_route('product.index')->with('success', "Product \"$name\"  was deleted.");
    }
}
