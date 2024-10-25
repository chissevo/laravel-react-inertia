import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";


export default function Create({auth, Category})
{
    const {data, setData, post, errors, reset } = useForm({
        name:           Category.name || "",
        description:    Category.description || "",
        _method:        "PUT"
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("category.update", Category.id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Editar: { Category.name}
                    </h2>
                </div>
            }>

            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="mt-4">
                              <InputLabel
                                  htmlFor="category_name"
                                  value="Nome da Categoria" />
                              <TextInput
                                  name="category_name"
                                  id="category_name_id"
                                  type="text"
                                  value={data.name}
                                  isFocused={ true }
                                  className="mt-1 blcok w-full"
                                  onChange={(e) => setData('name', e.target.value)} />

                                  <InputError message={errors.name} className="mt-2" />
                          </div>

                          <div>
                              <InputLabel
                                  htmlFor="category_description"
                                  value="Descrição da Tarefa" />
                              <TextAreaInput
                                  name="description"
                                  id="category_description"
                                  value={data.description}
                                  className="mt-1 blcok w-full"
                                  onChange={(e) => setData('description', e.target.value)} />

                                  <InputError message={errors.description} className="mt-2" />
                          </div>



                            <div className="mt-4 text-right">
                                <Link href={route("category.index")}
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
