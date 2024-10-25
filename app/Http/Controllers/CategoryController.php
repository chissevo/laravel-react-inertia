<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\UserResource;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravel\Prompts\Prompt;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortField      = request("sort_field", "created_at");
        $sortDirection  = request("sort_direction", "desc");

        $busca = Category::query();

        if (request('name'))
        {
            $busca->where("name", "like","%". request("name") .  "%");
        }

        if (request('status'))
        {
            $busca->where("status", request("status"));
        }

        $category = $busca->orderBy($sortField, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);

        return inertia("Category/Index", [
            "category"           => CategoryResource::collection($category),
            "queryParams"        => request()->query() ?: null,
            'success'            => session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        /*$category = Category::query()->orderBy('name', 'asc')->get();
        $users    = User::query()->orderBy('name', 'asc')->get();

        return inertia("Category/Create", [
            'category'     => CategoryResource::collection($category),
            'users'     => UserResource::collection($users),
            'success'   => session("success"),
        ]);*/

        return inertia("Category/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();

        Category::create($data);

        return to_route('category.index')->with('success', 'Categoria criada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $Category)
    {
        $query = $Category->tasks();

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

        $tasks = $query->orderBy($sortField, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);

        return inertia('Category/Show', [
            'Category'       => new CategoryResource($Category),
            'categories'         => CategoryResource::collection($tasks),
            'queryParams'   => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $Category)
    {
        return inertia("Category/Edit", [
            'Category' => new CategoryResource(resource: $Category)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $Category)
    {
        $name = $Category->name;

        $data = $request->validated();

        $data['updated_by'] = Auth::id();

        $Category->update($data);

        return to_route('category.index')->with('success', "Categoria \"$name\" foi actualizado com sucesso.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $Category)
    {
        $name = $Category->name;

        $Category->delete();

        return to_route('category.index')
                ->with('success', "Categoria com o \"$name\" foi apagado com sucesso.");
    }
}
