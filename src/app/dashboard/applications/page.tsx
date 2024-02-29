'use client'
import { Table } from '@/components/ui/Table/Table'
import { useEffect, useState } from "react"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { Breadcrumb } from '@/components/Breadcrumb'

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "id"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "platform", dbColName: "platform", title: "platform"},
        { key: "owner_id", dbColName: "owner_id", title: "owner id"},
        { key: "created", dbColName: "created", title: "Created at"},
        { key: "updated", dbColName: "updated", title: "Updated at"},
        { key: "actions", dbColName: "actions", title: "Actions"},
    ]

    const data= [
        { id: "Github", platform: "GitHub Actions", owner_id: "", updated: new Date().toLocaleDateString(), created: new Date().toLocaleDateString(), name: "Muhammad Ubaid"},
        { id: "Github", platform: "GitHub Actions", owner_id: "", updated: new Date().toLocaleDateString(), created: new Date().toLocaleDateString(), name: "Muhammad Ubaid"},
        { id: "Github", platform: "GitHub Actions", owner_id: "", updated: new Date().toLocaleDateString(), created: new Date().toLocaleDateString(), name: "Muhammad Ubaid"},
    ]

    const [loading, setLoading] = useState(false)
    const axios = useAxiosAuth()

    useEffect(() => {
        axios.get('/users?applications=0&limit=100').then(resp => {
            console.log(resp)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb label="Applications" />
            <Table
                data={data}
                loadingData={loading}
                columns={columns} totalItems={0}
            />
        </div>
    )
}
