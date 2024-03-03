'use client'
import { Table } from '@/components/ui/Table/Table'
import { useEffect, useState } from "react"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useRouter } from "next/navigation"
import { useFetchData } from "@/lib/hooks/useFetchData"

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "id"},
        { key: "username", dbColName: "username", title: "Username"},
        { key: "actions", dbColName: "actions", title: "Actions"},
    ]

    const { data, setData, loading } = useFetchData('/users?offset=0&limit=100')

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb label="Users" />
            <Table
                data={data}
                loadingData={loading}
                columns={columns}
                totalItems={0}
            />
        </div>
    )
}
