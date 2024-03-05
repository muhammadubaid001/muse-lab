'use client'
import { useParams } from "next/navigation"
import { Table } from "@/components/ui/Table/Table"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { Fragment, useEffect, useState } from "react"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { Breadcrumb } from "@/components/Breadcrumb"

const Users = () => {
    const columns = [
        { key: "id", dbColName: "name", title: "Name"},
        { key: "plan", dbColName: "plan", title: "Plan"},
    ]

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const axios = useAxiosAuth()
    const fetchData = (value) => {
        setLoading(true)
        axios.get(`/d2x/${value}/github-users`).then(resp => {
            console.log(resp)
            setData(resp.data)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
           <Table data={data} onTenantChange={value => fetchData(value)} totalItems={data.length} loadingData={loading} columns={columns} />
    )
}

export default  Users
