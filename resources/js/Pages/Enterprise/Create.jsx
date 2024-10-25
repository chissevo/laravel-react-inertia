import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
//import { useEffect, useState } from "react/cjs/react.production.min";
import axios from "axios";


export default function Create({auth})
{
    const {data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        nif: '',
        joint_stock: '',
        phone_number: '',
        city: '',
        country: '',
        province: '',
        logo_image: '',
        neighborhood: '',
        address_type: 'Empresa',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("enterprise.store"))
    }

    /*const [existeEnterprise, setExisteEnterprise] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
            {
              const verifyedEnterprise = async () => {
                try{
                  const response = await axios.get('enterprise')
                }
              }
            }
        )}*/

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Registar Empresa
                    </h2>
                </div>
            }>

            <Head title="Empresa" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="grid gap-4 grid-cols-2 mt-4">
                                <div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="enterprise_name"
                                            value="Nome da Empresa" />
                                        <TextInput
                                            name="enterprise_name"
                                            id="enterprise_name_id"
                                            type="text"
                                            value={data.name}
                                            isFocused={ true }
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('name', e.target.value)} />

                                            <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="enterprise_nif"
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
                                            htmlFor="enterprise_email"
                                            value="Email" />
                                        <TextInput
                                            name="email"
                                            id="email_id"
                                            type="email"
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
                                            type="number"
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
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('address_type', e.target.value)} />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="joint_stock"
                                            value="Capital Social" />
                                        <TextInput
                                            name="joint_stock"
                                            id="joint_stock_id"
                                            type="number"
                                            value={data.joint_stock}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('joint_stock', e.target.value)} />

                                            <InputError message={errors.joint_stock} className="mt-2" />
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

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="logo_image"
                                            value="Logotipo da Empresa" />
                                        <TextInput
                                            name="logo_image"
                                            id="logo_image_id"
                                            type="file"
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('logo_image', e.target.files[0])} />
                                            <InputError message={errors.logo_image} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route("enterprise.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-300 mr-2">
                                    Cancelar Processo
                                </Link>

                                <button
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow translate-all hover:bg-emerald-600">
                                    Registar Empresa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
