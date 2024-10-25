import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import CustomersTable from "./CustomersTable";


export default function Index({ auth, customers, queryParams = null, success })
{
  return (
    <AuthenticatedLayout
        user={ auth.user }
        header= {
             <div className="flex justify-between items-center">
             <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                 Cliente { customers.name }
             </h2>

            {customers &&
              (<Link href={route("customer.create")}
                className="bg-emerald-500 py-1 px-3 text-white rounded shadow translate-all hover:bg-emerald-600">
                  Registar Cliente
              </Link>)
            }
         </div>
        }>

      <Head title="Cliente"/>
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
                <CustomersTable customers={customers} queryParams={queryParams}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )}



