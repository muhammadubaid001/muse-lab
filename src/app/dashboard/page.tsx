'use client'
import { Table } from '@/components/ui/Table/Table'

export default function Page() {
    const columns = [
        { key: "title", dbColName: "title", title: "Title"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "github", dbColName: "github", title: "Github"},
        { key: "actions", dbColName: "actions", title: "Actions"},
    ]

    const data= [
        { title: "Github", name: "Muhammad Ubaid", github: "https://github.com"},
        { title: "Github", name: "Muhammad Ubaid", github: "https://github.com"},
        { title: "Github", name: "Muhammad Ubaid", github: "https://github.com"},
    ]
    return (
        <div className="flex flex-col gap-2">
            <ol className="flex items-center whitespace-nowrap mt-1" aria-label="Breadcrumb ">
                <li className="inline-flex items-center">
                    <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
                       href="#">
                        <svg className="flex-shrink-0 me-3 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                             stroke-linecap="round" stroke-linejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Dashboard
                    </a>
                    <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </li>

                <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200"
                    aria-current="page">
                    Users
                </li>
            </ol>

            <Table
                data={data}
                loadingData={false}
                columns={columns} totalItems={0}
            />
        </div>
    )
}
