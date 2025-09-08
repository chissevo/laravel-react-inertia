import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm, Link, router } from "@inertiajs/react";
import InputError from "@/Components/InputError";


export default function Create({auth, customer, address, success})
{
    const {data, setData, post, errors, reset } = useForm({
        name:           customer.name   || "",
        nif:            customer.nif  || "",
        email:          customer.email  || "",
        phone_number:   customer.phone_number  || "",
        address_type:   "Cliente",
        street:         customer.street  || "",
        neighborhood:   customer.address.neighborhood  || "",
        city:           customer.address.city  || "",
        province:       customer.address.province  || "",
        country:        customer.address.country  || "",
        _method:        "PUT"
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("customer.update", customer.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Editar Dados do Cliente: { customer.name }
                    </h2>
                </div>
            }>

            <Head title="Editar Cliente" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            { customer.logo_image &&
                              <div className="mb-4">
                                  <img src={ customer.logo_image } className="w-64" />
                              </div>
                            }
                            <pre>{  }</pre>
                            <div className="grid gap-4 grid-cols-2 mt-4">
                                <div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="customer_name"
                                            value="Nome da Empresa" />
                                        <TextInput
                                            name="customer_name"
                                            id="customer_name_id"
                                            type="text"
                                            value={data.name}
                                            isFocused={ true }
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('name', e.target.value)} />

                                            <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="customer_nif"
                                            value="NIF da Empresa" />
                                        <TextInput
                                            name="nif"
                                            id="nif_id"
                                            type="text"
                                            value={data.nif}
                                            isFocused={ true }
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('nif', e.target.value)} />

                                            <InputError message={errors.nif} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="customer_email"
                                            value="Email" />
                                        <TextInput
                                            name="email"
                                            id="email_id"
                                            type="email"
                                            isFocused={ true }
                                            value={data.email}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('email', e.target.value)} />

                                            <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="phone_number"
                                            value="Contacto Telefónico" />
                                        <TextInput
                                            name="phone_number"
                                            id="phone_number_id"
                                            type="text"
                                            isFocused={ true }
                                            value={data.phone_number}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('phone_number', e.target.value)} />

                                            <InputError message={errors.phone_number} className="mt-2" />
                                    </div>

                                    <div className="mt-4" hidden>
                                        <InputLabel
                                            htmlFor="address_type" />
                                        <TextInput
                                            name="address_type"
                                            id="address_type_id"
                                            value= {data.address_type}
                                            type="text"
                                            isFocused={ true }
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('address_type', e.target.value)} />
                                    </div>

                                </div>

                                <div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="country"
                                            value="País" />
                                        <TextInput
                                            name="country"
                                            id="country_id"
                                            type="text"
                                            value={data.country}
                                            isFocused={ true }
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('country', e.target.value)} />

                                            <InputError message={errors.country} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="province"
                                            value="Província" />
                                        <TextInput
                                            name="province"
                                            id="province_id"
                                            type="text"
                                            value={data.province}
                                            isFocused={ true }
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('province', e.target.value)} />

                                            <InputError message={errors.province} className="mt-2" />
                                    </div>


                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="neighborhood"
                                            value="Bairro" />
                                        <TextInput
                                            name="neighborhood"
                                            id="neighborhood_id"
                                            type="text"
                                            value={data.neighborhood}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('neighborhood', e.target.value)} />

                                            <InputError message={errors.neighborhood} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="city"
                                            value="Cidade" />
                                        <TextInput
                                            name="city"
                                            id="city_id"
                                            type="text"
                                            value={data.city}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('city', e.target.value)} />

                                            <InputError message={errors.city} className="mt-2" />
                                    </div>

                                </div>
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route("customer.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-300 mr-2">
                                    Cancelar Processo
                                </Link>

                                <button
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow translate-all hover:bg-emerald-600">
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
