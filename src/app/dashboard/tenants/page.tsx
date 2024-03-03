'use client'
import { Table } from '@/components/ui/Table/Table'
import { useEffect, useState } from "react"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useRouter } from "next/navigation"
import { useFetchData } from "@/lib/hooks/useFetchData"

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "ID"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "github_id", dbColName: "github_id", title: "Github ID"},
        { key: "owner_id", dbColName: "owner_id", title: "Owner ID"},
        { key: "created", dbColName: "created", title: "Created at"},
        { key: "updated", dbColName: "updated", title: "Updated at"},
        { key: "actions", dbColName: "actions", title: "Actions"},
    ]
    const {data, setData, loading } = useFetchData('/tenants?offset=0&limit=100')

    const router = useRouter()

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb />
            <Table
                onRow={(id) => router.push(`/dashboard/tenants/${id}`)}
                data={data}
                loadingData={loading}
                columns={columns}
                onRowFieldName="slug"
                totalItems={0}
            />
        </div>
    )
}
