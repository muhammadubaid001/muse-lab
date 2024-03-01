'use client'
import { Table } from '@/components/ui/Table/Table'
import { useEffect, useState } from "react"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useRouter } from "next/navigation"

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

    const data= [
        { id: "Github", github_id: "21847", owner_id: "", updated: new Date().toLocaleDateString(), created: new Date().toLocaleDateString(), name: "Muhammad Ubaid"},
        { id: "Github", github_id: "21847", owner_id: "", updated: new Date().toLocaleDateString(), created: new Date().toLocaleDateString(), name: "Muhammad Ubaid"},
        { id: "Github", github_id: "21847", owner_id: "", updated: new Date().toLocaleDateString(), created: new Date().toLocaleDateString(), name: "Muhammad Ubaid"},
    ]

    const [loading, setLoading] = useState(false)
    const axios = useAxiosAuth()

    useEffect(() => {
        axios.get('/users?tenants=0&limit=100').then(resp => {
            console.log(resp)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const router = useRouter()

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb />
            <Table
                onRow={(id) => router.push(`/dashboard/tenants/${id}`)}
                data={data}
                loadingData={loading}
                columns={columns}
                totalItems={0}
            />
        </div>
    )
}
