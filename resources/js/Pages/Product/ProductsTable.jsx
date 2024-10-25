import Pagination from "@/Components/Pagination";
import { ENTERPRISE_STATUS_CLASS_MAP, ENTERPRISE_STATUS_TEXT_MAP } from "@/constants.jsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function ProductsTable({ products, queryParams = null, hideProductColumn = false })
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

    const editProduct = (product) =>
    {
        router.get(route('product.edit', product.id));
    };

    const deleteProduct = (product) =>
    {
        if (!window.confirm("Tens certeza que desejas eliminar o producto?"))
        {
            return;
        }
        router.delete(route('product.destroy', product.id));
    };

    return (
            <>
             <div className="overflow-auto">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                    dark:text-gray-400 border-b-1 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sort_field={ queryParams.sort_field }
                                sort_direction={ queryParams.sort_direction }
                                sortChanged= { sortChanged }
                            >ID</TableHeading>
                            <th className="px-3 py-3">Imagem do Produto</th>
                            <TableHeading
                                name="name"
                                sort_field={ queryParams.sort_field }
                                sort_direction={ queryParams.sort_direction }
                                sortChanged= { sortChanged }
                                >Nome do Produto
                            </TableHeading>
                            <th className="px-3 py-3">Descrição</th>
                            <th className="px-3 py-3">Preço de Compra</th>
                            <th className="px-3 py-3">Preço de Venda</th>
                            <th className="px-3 py-3">Quantidade em Stoque</th>
                            <th className="px-3 py-3">Categoria</th>
                            <th className="px-3 py-3">Cadastrado Por</th>
                            <th className="px-3 py-3 text-center">Opções</th>
                        </tr>
                    </thead>

                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                    dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>

                            {!hideProductColumn &&
                                (<th className="px-3 py-3"></th>)
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.data.map((product) => (
                                <tr className=" bg-white dark:bg-gray-800 border-b dark:border-gray-700" key={product.id}>
                                    <th className="px-3 py-3">{ product.id }</th>
                                    <th className="px-3 py-3">{ product.image_path }</th>
                                    <th className="px-3 py-3">{ product.product_name }</th>

                                    <th className="px-3 py-3 text-nowrap">{ product.description }</th>
                                    <th className="px-3 py-3 text-center">{ product.purchase_price }</th>

                                    <th className="px-3 py-3 text-center">{ product.sale_price} </th>

                                    <th className="px-3 py-3 text-center">{ product.quantity} </th>

                                    <th className="px-3 py-3">{ product.category.name} </th>
                                    <th className="px-3 py-3">{ product.assignedUser.name} </th>
                                    <th className="px-3 py-3 text-nowrap">
                                        <button onClick={ (e) => editProduct(product) }
                                            className="font-medium text-blue-600 dark-text-blue-500 hover:underline mx-1" >Editar
                                        </button>

                                        <button onClick={ (e) => deleteProduct(product) }
                                            className="font-medium text-red-600 dark-text-red-500 hover:underline mx-1">Deletar
                                        </button>
                                    </th>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={ products.meta.links } />
        </>);
}
