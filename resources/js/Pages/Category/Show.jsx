import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CATEGORY_STATUS_CLASS_MAP, CATEGORY_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head } from "@inertiajs/react";
import CategorysTable from "../Category/CategorysTable";

export default function Show({ auth, Category, tasks, queryParams })
{
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                { `Categoryo: ${Category.name}` }
            </h2>}
        >
            <Head  title={ `Category ${Category.name}` } />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">ID do Categoryo</label>
                                        <p className="mt-1">{ Category.id }</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Nome do Categoryo</label>
                                        <p className="mt-1">{ Category.name }</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Estado do Categoryo</label>
                                        <p className="mt-1">
                                            <span className=
                                                { "px-2 py-1 rounded text-white "
                                                    + CATEGORY_STATUS_CLASS_MAP[Category.status]
                                                }>
                                                {
                                                    CATEGORY_STATUS_TEXT_MAP[Category.status]
                                                }
                                            </span>
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="font-bold text-lg">Descrição do Categoryo</label>
                                <p className="mt-1">{ Category.description }</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <CategorysTable tasks={tasks} queryParams={queryParams} hideCategoryColumn={ true }/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
