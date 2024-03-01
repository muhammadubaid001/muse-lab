'use client'
import { Table } from '@/components/ui/Table/Table'
import { useEffect, useState } from "react"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { Breadcrumb } from '@/components/Breadcrumb'
import { SideSheet } from "@/components/ui/Sidesheet"

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "id"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "platform", dbColName: "platform", title: "Platform"},
        { key: "owner_id", dbColName: "owner_id", title: "Owner ID"},
        { key: "created", dbColName: "created", title: "Created at"},
        { key: "updated", dbColName: "updated", title: "Updated at"},
    ]

    const data= [
        { id: "Github", platform: "GitHub Actions", owner_id: "", updated: new Date().toLocaleDateString(), created: new Date().toLocaleDateString(), name: "Muhammad Ubaid"},
        { id: "Github", platform: "GitHub Actions", owner_id: "", updated: new Date().toLocaleDateString(), created: new Date().toLocaleDateString(), name: "Muhammad Ubaid"},
        { id: "Github", platform: "GitHub Actions", owner_id: "", updated: new Date().toLocaleDateString(), created: new Date().toLocaleDateString(), name: "Muhammad Ubaid"},
    ]
    const [open, setOpen] = useState(false)
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
            <Breadcrumb />
            <SideSheet sidebarOpen={open} setSidebarOpen={setOpen} title={"Title"}>
                asdfasdf
            </SideSheet>
            <Table
                data={data}
                onRow={() => setOpen(true)}
                loadingData={loading}
                columns={columns} totalItems={0}
            />
        </div>
    )
}
