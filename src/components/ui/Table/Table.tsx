import React, { FC, Fragment, useState } from "react"
import { TableHeader } from "./TableHeader"

import classNames from "classnames"
import { DirectNormal } from "iconsax-react"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { Input } from "@/components/ui/Input"

export interface IColumn {
    title: string;
    render?: any;
    sortBy?: boolean;
    key?: string;
    dbColName?: string;
    select?: boolean;
}

export interface ITable {
    rowSelection?: boolean;
    data: any;
    totalItems: number;
    setPagination?: any;
    onTenantChange?: any
    columnFilters?: any;
    onSort?: (type: string) => void;
    pagination?: any;
    filters?: any;
    columns: any;
    onRow?: any
    onRowFieldName?: string;
    loadingData?: boolean;
}

export interface ITableBody extends ITable {
    showingData: any;
    itemsPerPage: number;
    pagination?: any;
    setPagination?: any;
    currentPage: number;
}

export const Table: FC<ITable> = ({
                                      columns,
                                      loadingData,
                                      pagination,
                                      data,
                                      totalItems,
                                      onSort,
                                      onTenantChange,
                                      rowSelection,
                                      onRow,
                                      onRowFieldName = "id",
                                  }) => {
    const [perPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchText, setSearchText] = useState("")


    const filteredData = data?.filter(
        (item: { [x: string]: { toString: () => string } }) => {
            return Object.keys(item).some((key) =>
                item[key]?.toString().toLowerCase().includes(searchText.toLowerCase()),
            )
        },
    )

    const last = currentPage * perPage
    const first = last - perPage
    const current = filteredData?.slice(first, last)

    const pageNumber: number[] = []
    for (let i = 1; i <= Math.ceil(totalItems / perPage); i++) {
        pageNumber.push(i)
    }

    const renderTableColumnData = (col: IColumn, data: Array<any>) => {
        const column =
            col.dbColName !== undefined && data[col.dbColName as keyof typeof data]

        if (col.hasOwnProperty("render") && !col.hasOwnProperty("dbColName")) {
            return (
                <td
                    key={col.key}
                    onClick={
                        onRow && col.key !== "actions"
                            ? () =>
                                onRow(
                                    data[
                                        onRowFieldName
                                        ],
                                )
                            : undefined
                    }
                    className="px-4 py-5 text-sm whitespace-nowrap"
                >
                    {col.render(data)}
                </td>
            )
        } else if (
            col.hasOwnProperty("render") &&
            col.hasOwnProperty("dbColName")
        ) {
            return (
                <td
                    key={col.key}
                    onClick={
                        onRow && col.key !== "actions"
                            ? () =>
                                onRow(
                                    data[
                                        onRowFieldName
                                        ],
                                )
                            : undefined
                    }
                    className="px-4 py-5 text-sm whitespace-nowrap"
                >
                    {col.render(column)}
                </td>
            )
        } else {
            return (
                <td
                    key={col.key}
                    onClick={
                        onRow && col.key !== "actions"
                            ? () =>
                                onRow(
                                    data[
                                        onRowFieldName
                                        ],
                                )
                            : undefined
                    }
                    className="whitespace-nowrap px-4 py-5 text-sm"
                >
                    {column}
                </td>
            )
        }
    }

    const startIndex = (currentPage - 1) * perPage

    return (
        <div className="border overflow-hidden bg-white rounded-lg shadow-sm mt-3">
            <div
                className="flex items-center gap-2 pb-4 bg-white p-4">
                {/*<label htmlFor="table-search" className="text-sm text-primary-charcol" >Select Tenant</label>*/}
                <div className="relative">

                    <Input label="" onChange={value => console.log(value )} value="" container="w-96" placeholder="Search..." />
                </div>
            </div>
            <div className="overflow-auto h-full">
                <table className="min-w-full bg-white">
                    <TableHeader
                        rowSelection={rowSelection}
                        columns={columns}
                        totalItems={totalItems}
                        onSort={onSort}
                        data={current}
                    />

                    <tbody className="bg-white w-full divide-y  divide-gray-100">
                    <tr>
                        {(current?.length === 0 || !current) &&
                            !loadingData && (
                                <td colSpan={8} className="text-primary-gold text-center mx-auto p-10">
                                    <DirectNormal
                                        size="60"
                                        className="mx-auto"
                                    />
                                    <p className="text-primary-charcol font-libre-sb mt-2">
                                        No record found
                                    </p>
                                </td>
                            )}
                        {loadingData && (
                            <td colSpan={8} className="bg-white bg-opacity-70 p-16 w-full h-full text-center">
                                <svg
                                    aria-hidden="true"
                                    className="w-full h-10 mr-2 text-center text-gray-200 animate-slow fill-primary-gold"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                                <p className="ml-3 mt-3 font-libre-m text-primary-charcol">
                                    Loading...
                                </p>
                            </td>
                        )}
                    </tr>
                    {current?.length !== 0 &&
                        current?.map((d, index: number) => (
                            <tr
                                key={index}

                                className={`${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-50 text-primary-charcol cursor-pointer`}
                            >
                                <td className="px-4 py-5 text-sm">
                                    {pagination && pagination?.page > 1
                                        ? pagination?.limit * pagination?.page + index + 1 - 10
                                        : startIndex + index + 1}
                                </td>
                                {columns.map((col: any) => renderTableColumnData(col, d))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="border-t bg-white">
                <div className="flex p-3 items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                            disabled={currentPage === pageNumber[0]}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === pageNumber.length}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between text-right">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-700">
                                Page{" "}
                                <span className="font-medium">
                        {currentPage} of{" "}
                                    {pageNumber.length}
                      </span>{" "}
                            </p>
                            <select
                                onChange={(eve) => {
                                    setCurrentPage(+eve.target.value)

                                }}
                                className="p-1.5 rounded-md border border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none text-xs text-gray-700"
                            >
                                <option>Go to page</option>
                                {pageNumber.map((number) => (
                                    <option key={number} value={number}>
                                        {number}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-1"
                             aria-label="Pagination">
                            <button onClick={() => setCurrentPage(currentPage - 1)}
                                    className="disabled:cursor-not-allowed disabled:bg-gray-100 relative focus:outline-none inline-flex items-center justify-center py-2 w-24 text-center rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    disabled={currentPage === pageNumber[0]}
                            >
                                <span>Previous</span>
                            </button>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="disabled:cursor-not-allowed disabled:bg-gray-100 relative focus:outline-none inline-flex items-center justify-center py-2 w-24 text-center rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                disabled={currentPage === pageNumber.length}
                            >
                                <span>Next</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
