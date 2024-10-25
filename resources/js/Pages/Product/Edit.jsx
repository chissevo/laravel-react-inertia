import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";


export default function Create({auth, product})
{
    const {data, setData, post, errors, reset } = useForm({

        image: "",
        name:           product.name || "",
        status:         product.status || "",
        description:    product.description || "",
        due_date:       product.due_date || "",
        _method:        "PUT"
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("product.update", product.id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Editar: { product.name}
                    </h2>
                </div>
            }>

            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="grid gap-1 grid-cols-2 mt-4">

                                { product.image_path && <div className="mb-4">
                                        <img src={ product.image_path } className="ww-64" />
                                    </div>}
                                <div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="product_name"
                                            value="Nome Producto" />
                                        <TextInput
                                            name="name"
                                            id="product_image_path"
                                            type="text"
                                            value={data.name}
                                            isFocused={ true }
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('name', e.target.value)} />

                                            <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="product_description"
                                            value="Descrição do Producto" />
                                        <TextAreaInput
                                            name="description"
                                            id="product_description"
                                            value={data.description}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('description', e.target.value)} />

                                            <InputError message={errors.description} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="product_image_path"
                                            value="Imagem Producto" />
                                        <TextInput
                                            name="image"
                                            id="product_image_path"
                                            type="file"
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('image', e.target.files[0])} />

                                            <InputError message={errors.image} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="product_due_date"
                                            value="Data de Conclusão"
                                        />
                                        <TextInput
                                            name="due_date"
                                            id="product_due_date"
                                            type="date"
                                            value={ data.due_date }
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('due_date', e.target.value)} />

                                            <InputError message={errors.due_date} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="product_status"
                                            value="Estado do Producto" />
                                        <SelectInput
                                            name="status"
                                            id="product_status"
                                            type="text"
                                            value={data.status}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('status', e.target.value)}>

                                            <option value="">Seleccionar Estado</option>
                                            <option value="pending">Pendente</option>
                                            <option value="in_progress">Em Progresso</option>
                                            <option value="completed">Concluído</option>
                                        </SelectInput>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route("product.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow
                                        transition-all hover:bg-gray-200 mr-2">
                                    Cancelar
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
