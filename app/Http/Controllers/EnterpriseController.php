<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAddressRequest;
use App\Http\Requests\StoreEnterpriseRequest;
use App\Http\Requests\UpdateAddressRequest;
use App\Http\Requests\UpdateEnterpriseRequest;
use App\Http\Resources\AddressResource;
use App\Http\Resources\EnterpriseResource;
use App\Models\Address;
use App\Models\Enterprise;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EnterpriseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortField      = request("sort_field", "created_at");
        $sortDirection  = request("sort_direction", "desc");

        $busca = Enterprise::query();

        if (request('name'))
        {
            $busca->where("name", "like","%". request("name") .  "%");
        }

        if (request('status'))
        {
            $busca->where("status", request("status"));
        }

        $enterprise = $busca->orderBy($sortField, $sortDirection)
                            ->paginate(10)
                            ->onEachSide(1);

        return inertia("Enterprise/Index", [
            "enterprises"        => EnterpriseResource::collection($enterprise),
            "queryParams"        => request()->query() ?: null,
            'success'            => session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Enterprise/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEnterpriseRequest $e, StoreAddressRequest $a)
    {
        //save the address model on database
        $address = Address::create($a->validated());
        /** @var $image \Illuminate\Http\UploadedFile */
        $logo = $e['logo_image'] ?? null;

        if ($logo)
        {
            $logo_image = $e['logo_image'] = $logo->store('logotipos/' . Str::random(), 'public');
        }

        $enterprise = Enterprise::create(
            [
                'address_id'    => $address->id,
                'name'          => $e->input('name'),
                'nif'           => $e->input('nif'),
                'joint_stock'   => $e->input('joint_stock'),
                'email'         => $e->input('email'),
                'phone_number'  => $e->input('phone_number'),
                'logo_image'    => $logo_image ?? null,
            ]);

        return to_route('enterprise.index')->with('success', 'Empresa Cadastrada com Sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Enterprise $enterprise)
    {
        $query = $enterprise();

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

        $enterprises = $query->orderBy($sortField, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);

        //dd($enterprises);

        return inertia('Enterprise/Show', [
            'enterprises'         => EnterpriseResource::collection($enterprises),
            'queryParams'   => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enterprise $enterprise)
    {
        $address    = Address::query()->orderBy('city', 'asc')->get();

        return inertia("Enterprise/Edit", [
            'enterprise'      => new EnterpriseResource($enterprise),
            'address'   => AddressResource::collection($address)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnterpriseRequest $e, Enterprise $enterprise, UpdateAddressRequest $a)
    {
        $addresses = Address::find($enterprise->address_id);
        $endereco = $a->validated();

        $empresa  = $e->validated();

        /** @var $image \Illuminate\Http\UploadedFile */
        $logo = $empresa['logo'] ?? null;

        if (!empty($logo))
        {
            if ($enterprise->logo_image)
            {
                Storage::disk('public')->deleteDirectory(dirname($enterprise->logo_image));
            }
            $empresa['logo_image'] = $logo->store('logotipos/' . Str::random(), 'public');
        }

        $addresses->update($endereco);
        $enterprise->update($empresa);

        return to_route('enterprise.index')
                    ->with('success', "A Empresa \"$enterprise->name\" foi actualizado com sucesso!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enterprise $enterprise)
    {
        $name = $enterprise->name;
        $enterprise->address()->delete();
        $enterprise->delete();

        if ($enterprise->logo_image)
        {
            Storage::disk('public')->deleteDirectory(dirname($enterprise->logo_image));
        }

        return to_route('enterprise.index')
                    ->with('success', "A Empresa \"$name\" foi apagada com sucesso!");
    }

    public function verifyEnterprise()
    {
        $enterprise = Enterprise::exists();
        dd($enterprise);
        return response()->json(['existe' => $enterprise]);
    }
}
