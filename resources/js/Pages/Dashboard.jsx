import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">ABC - ALUMÍNIO</h2>}
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <h3 className="text-amber-500 font-semibold">Facturas Emitidas</h3>
                          <p className="text-xl mt-4">
                            <span className="mr-2">0 / 210</span>
                            <span className="ml-2"></span>
                          </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <h3 className="text-blue-500 font-semibold">Visão Geral da Empresa</h3>
                          <p>
                            <span className="mr-2">0 / 210</span>
                          </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <h3 className="text-green-500 font-semibold">Visão Geral da Empresa</h3>
                          <p>
                            <span className="mr-2">0 / 210</span>
                          </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
