import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";


export default function Create({ auth, products, categories })
{
    const {data, setData, post, errors, reset } = useForm({
        product_name: '',
        description: '',
        purchase_price: '',
        sale_price: '',
        quantity: '',
        image_path:'',
        category_id:'',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("product.store"))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Registar Producto
                    </h2>
                </div>
            }>

            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="grid gap-1 grid-cols-2 mt-4">
                                <div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="product_name"
                                            value="Mome do Produto" />
                                        <TextInput
                                            name="name"
                                            id="product_name"
                                            type="text"
                                            value={data.product_name}
                                            isFocused={ true }
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('product_name', e.target.value)} />

                                            <InputError message={errors.product_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="product_description"
                                            value="Descrição do Produto" />
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
                                            htmlFor="purchase_price"
                                            value="Preço de Compra" />
                                        <TextInput
                                            name="purchase_price"
                                            id="purchase_price"
                                            type="number"
                                            value={data.purchase_price}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('purchase_price', e.target.value)} />

                                            <InputError message={errors.purchase_price} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="product_image_path"
                                            value="Product Image" />
                                        <TextInput
                                            name="image_path"
                                            id="image_path_id"
                                            type="file"
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('image_path', e.target.files[0])} />

                                            <InputError message={errors.image_path} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="product_category"
                                            value="Categoria do Produto" />
                                        <SelectInput
                                            name="category_id"
                                            id="product_category_id"
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('category_id', e.target.value)}>

                                            <option value="">Seleccionar Categoria</option>
                                            { categories.data.map(( category ) => (
                                              <option value={category.id} key={ category.id }>{ category.name }</option>
                                            ))}
                                        </SelectInput>

                                        <InputError message={errors.category_id} className="mt-2" />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="sale_price"
                                            value="Preço de Venda" />
                                        <TextInput
                                            name="sale_price"
                                            id="sale_price"
                                            type="number"
                                            value={data.sale_price}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('sale_price', e.target.value)} />

                                            <InputError message={errors.sale_price} className="mt-2" />
                                    </div>

                                    {/*<div className="mt-4">
                                        <InputLabel
                                            htmlFor="sale_price"
                                            value="Preço de Venda" />
                                        <TextInput
                                            name="sale_price"
                                            id="sale_price"
                                            type="number"
                                            value={data.sale_price}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('sale_price', e.target.value)} />

                                            <InputError message={errors.sale_price} className="mt-2" />
                                    </div>*/}

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="quantity"
                                            value="Quatidade Adquirida" />
                                        <TextInput
                                            name="quantity"
                                            id="quantity"
                                            type="number"
                                            value={data.quantity}
                                            className="mt-1 blcok w-full"
                                            onChange={(e) => setData('quantity', e.target.value)} />

                                            <InputError message={errors.quantity} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route("product.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow
                                        transition-all hover:bg-gray-200 mr-2">
                                    Cancel
                                </Link>

                                <button
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow translate-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
