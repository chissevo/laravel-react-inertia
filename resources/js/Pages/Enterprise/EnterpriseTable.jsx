import Pagination from "@/Components/Pagination";
import { ENTERPRISE_STATUS_CLASS_MAP, ENTERPRISE_STATUS_TEXT_MAP } from "@/constants.jsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function EnterprisesTable({ enterprises, queryParams = null, hideEnterpriseColumn = false })
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

        router.get(route('enterprise.index'), queryParams);
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

        router.get(route("enterprise.index"), queryParams);
    };

    const editEnterprise = (enterprise) =>
    {
        router.get(route('enterprise.edit', enterprise.id));
    };

    const deleteEnterprise = (enterprise) =>
    {
        if (!window.confirm("Tens certeza que desejas eliminar a Empresa?"))
        {
            return;
        }
        router.delete(route('enterprise.destroy', enterprise.id));
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
                            >Nome da Empresa</TableHeading>
                            {!hideEnterpriseColumn &&
                                (<th className="px-3 py-3">Endereço</th>)
                            }

                            <th className="px-3 py-3">NIF</th>
                            <th className="px-3 py-3">Capital Social</th>
                            <th className="px-3 py-3">Email</th>
                            <th className="px-3 py-3">Telefone</th>
                            <th className="px-3 py-3">Logotipo</th>

                            <th className="px-3 py-3 text-right">Opções</th>
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

                            {!hideEnterpriseColumn &&
                                (<th className="px-3 py-3"></th>)
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            enterprises.data.map((enterprise) => (
                                <tr className=" bg-white dark:bg-gray-800 border-b dark:border-gray-700" key={enterprise.id}>
                                    <th className="px-3 py-3">{ enterprise.id }</th>

                                    <th className="px-3 py-3">{ enterprise.name }</th>
                                    {!hideEnterpriseColumn &&
                                        (<th className="px-3 py-3">
                                          { enterprise.address.neighborhood },
                                          <pre>{ enterprise.address.city },</pre>
                                          <pre>{ enterprise.address.province },</pre>
                                          <pre>{ enterprise.address.country }</pre>
                                        </th>)
                                    }

                                    <th className="px-3 py-3">{ enterprise.nif }</th>
                                    <th className="px-3 py-3">{ enterprise.joint_stock } Kz</th>
                                    <th className="px-3 py-3 text-nowrap">{ enterprise.email }</th>
                                    <th className="px-3 py-3">{ enterprise.phone_number }</th>

                                    <th className="px-3 py-3">
                                        <img src={ enterprise.logo_image } style={{width: 60}} />
                                    </th>

                                    <th className="px-3 py-3 text-nowrap">
                                        <button onClick={ (e) => editEnterprise(enterprise) }
                                            className="font-medium text-blue-600 dark-text-blue-500 hover:underline mx-1" >Editar
                                        </button>

                                        <button onClick={ (e) => deleteEnterprise(enterprise) }
                                            className="font-medium text-red-600 dark-text-red-500 hover:underline mx-1">Deletar
                                        </button>
                                    </th>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={ enterprises.meta.links } />
        </>);
}
