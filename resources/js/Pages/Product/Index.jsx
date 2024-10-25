import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ProductsTable from "./ProductsTable";



export default function Index({auth, products, queryParams = null, success})
{
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) =>
    {
        if(value)
        {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('product.index'), queryParams);
    };

    const onKeyPress = (name, e) =>
    {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) =>
    {
        if( name === queryParams.sort_field){
            if(queryParams.sort_direction === "asc"){
                queryParams.sort_direction = "desc";
            } else{
                queryParams.sort_direction = "asc";
            }
        } else{
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route("product.index"), queryParams);
    };

    const deleteProduct = (product) =>
    {
        if (!window.confirm('Are you sure you want to delete the product?'))
        {
            return;
        }
        router.delete(route('product.destroy', product.id))
    }

    const editProduct = (product) =>
    {
        router.get(route('product.edit', product.id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Productos
                    </h2>

                    <Link href={route("product.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow translate-all hover:bg-emerald-600">
                        Adicionar Producto
                    </Link>
                </div>
            }>

            <Head title="Products" />

            <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              { success &&
                <div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
                    { success }
                </div>
              }
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <div className="overflow-auto">
                    <ProductsTable products={products} queryParams={queryParams}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AuthenticatedLayout>
    )
}
