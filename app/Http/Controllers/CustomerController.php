<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAddressRequest;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateAddressRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Requests\UpdateEnterpriseRequest;
use App\Http\Resources\AddressResource;
use App\Http\Resources\CustomerResource;
use App\Models\Address;
use App\Models\Customer;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortField      = request("sort_field", "created_at");
        $sortDirection  = request("sort_direction", "desc");

        $busca = Customer::query();

        if (request('name'))
        {
            $busca->where("name", "like","%". request("name") .  "%");
        }

        if (request('created_at'))
        {
            $busca->where("created_at", request("created_at"));
        }

        $customer = $busca->orderBy($sortField, $sortDirection)
                            ->paginate(10)
                            ->onEachSide(1);

        return inertia("Customer/Index", [
            "customers"        => CustomerResource::collection($customer),
            "queryParams"        => request()->query() ?: null,
            'success'            => session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Customer/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $customer, StoreAddressRequest $a)
    {
        //save the address model on database
        $address = Address::create($a->validated());

        $customer = Customer::create(
            [
                'address_id'    => $address->id,
                'name'          => $customer->input('name'),
                'nif'           => $customer->input('nif'),
                'email'         => $customer->input('email'),
                'phone_number'  => $customer->input('phone_number'),
            ]);

        return to_route('customer.index')->with('success', 'Cliente cadastrado com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        $query = $customer();

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

        $customers = $query->orderBy($sortField, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);

        return inertia('Customer/Show', [
            'customers'         => CustomerResource::collection($customers),
            'queryParams'   => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        $address    = Address::query()->orderBy('city', 'asc')->get();

        return inertia("Customer/Edit", [
            'customer'      => new CustomerResource($customer),
            'address'   => AddressResource::collection($address)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $c, Customer $customer, UpdateAddressRequest $a)
    {
        $addresses = Address::find($customer->address_id);
        $endereco = $a->validated();

        $customers  = $c->validated();

        $addresses->update($endereco);
        $customer->update($customers);

        return to_route('customer.index')
                    ->with('success', "A cliente \"$customer->name\" foi actualizado com sucesso!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $name = $customer->name;

        $customer->address()->delete();
        $customer->delete();

        return to_route('customer.index')
                    ->with('success', "A cliente \"$name\" foi apagado com sucesso!");
    }
}
