'use client'
import { Table } from '@/components/ui/Table/Table'
import { useEffect, useState } from "react"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { Breadcrumb } from '@/components/Breadcrumb'

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "id"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "actions", dbColName: "actions", title: "Actions"},
    ]

    const data= [
        { id: "Github", name: "Muhammad Ubaid"},
        { id: "Github", name: "Muhammad Ubaid"},

        { id: "Github", name: "Muhammad Ubaid"},
    ]
    const [loading, setLoading] = useState(false)
    const axios = useAxiosAuth()

    useEffect(() => {
        setLoading(true)
        axios.get('/users?offset=0&limit=100').then(resp => {
            console.log(resp)
        }).catch(error => {
            console.log(error)
        }).finally(() =>{
            setLoading(false)
        })
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb label="Users" />
            <Table
                data={[]}
                loadingData={loading}
                columns={columns} totalItems={0}
            />
        </div>
    )
}
