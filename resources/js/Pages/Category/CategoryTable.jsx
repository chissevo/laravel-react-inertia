import Pagination from "@/Components/Pagination";
import { CATEGORY_STATUS_CLASS_MAP, CATEGORY_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function CategorysTable({ category, queryParams = null, hideCategoryColumn = false })
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

        router.get(route('category.index'), queryParams);
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

        router.get(route("category.index"), queryParams);
    };

    const editCategory = (category) =>
      {
          router.get(route('category.edit', category.id));
      };

      const deleteCategory = (category) =>
      {
          if (!window.confirm("Tens certeza que desejas eliminar esta categoria?"))
          {
              return;
          }
          router.delete(route('category.destroy', category.id));
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

                            <TableHeading
                                name="name"
                                sort_field={ queryParams.sort_field }
                                sort_direction={ queryParams.sort_direction }
                                sortChanged= { sortChanged }
                            > Nome da Categoria
                            </TableHeading>

                            {!hideCategoryColumn &&
                                (<th className="px-3 py-3">Descrição da Categoria</th>)
                            }

                          <TableHeading
                                name="name"
                                sort_field={ queryParams.sort_field }
                                sort_direction={ queryParams.sort_direction }
                                sortChanged= { sortChanged }
                              > Data de Criação
                            </TableHeading>

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
                            {!hideCategoryColumn &&
                                (<th className="px-3 py-3"></th>)
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            category.data.map((Category) => (
                                <tr className=" bg-white dark:bg-gray-800 border-b dark:border-gray-700" key={Category.id}>
                                    <th className="px-3 py-3">{ Category.id }</th>

                                    <th className="px-3 py-3">{ Category.name }</th>
                                    {!hideCategoryColumn &&
                                        (<th className="px-3 py-3">{ Category.description }</th>)
                                    }

                                    <th className="px-3 py-3 text-center">{ Category.created_at }</th>

                                    <th className="px-3 py-3 text-nowrap">
                                      <button onClick={ (e) => editCategory(Category) }
                                        className="font-medium text-blue-600 dark-text-blue-500 hover:underline mx-1" >Editar
                                      </button>

                                      <button onClick={ (e) => deleteCategory(Category) }
                                        className="font-medium text-red-600 dark-text-red-500 hover:underline mx-1">Deletar
                                      </button>
                                    </th>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={ category.meta.links } />

        </>);
}
