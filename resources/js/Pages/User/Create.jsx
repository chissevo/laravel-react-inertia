import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";


export default function Create({auth})
{
    const {data, setData, post, errors, reset } = useForm({
        name: '',
        meail: '',
        password: '',
        password_confirmation: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("user.store"))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Adicionar Usuário
                    </h2>
                </div>
            }>

            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="">
                                <div>
                                    <div className="mt-4">
                                        <InputLabel 
                                            htmlFor="user_name"
                                            value="Nome" />
                                        <TextInput 
                                            name="name" 
                                            id="user_name"
                                            type="text"
                                            value={data.name} 
                                            isFocused={ true }
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('name', e.target.value)} />

                                            <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel 
                                            htmlFor="user_email"
                                            value="Email" />
                                        <TextInput
                                            name="email" 
                                            id="user_email"
                                            value={data.email} 
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('email', e.target.value)} />

                                            <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel 
                                            htmlFor="user_password"
                                            value="Password" />
                                        <TextInput 
                                            name="password" 
                                            id="user_password"
                                            type="password"
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('password', e.target.value)} />

                                            <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel 
                                            htmlFor="user_password_confirmation"
                                            value="Confirmar Password" />
                                        <TextInput 
                                            name="password_confirmation" 
                                            id="user_password_confirmation"
                                            type="password"
                                            value={data.due_date} 
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('password_confirmation', e.target.value)} />

                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>

                                    <div className="mt-4 text-right">
                                    <Link href={route("user.index")} 
                                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow
                                            transition-all hover:bg-gray-200 mr-2">
                                        Cancelar
                                    </Link>

                                    <button 
                                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow translate-all hover:bg-emerald-600">
                                        Registar
                                    </button>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout> 
    )
}