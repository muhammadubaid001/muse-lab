"use client"
import { useParams } from "next/navigation"
import { Table } from "@/components/ui/Table/Table"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { useState } from "react"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"

const Repos = () => {
    const columns = [
        { key: "id", dbColName: "id", title: "ID" },
        { key: "name", dbColName: "name", title: "Name" },
        { key: "github_id", dbColName: "github_id", title: "Github ID" },
        { key: "url", dbColName: "url", title: "URL" },
        { key: "tenant", dbColName: "tenant", title: "Tenant", render: tenant => <p>{tenant.name}</p> },
        { key: "org", dbColName: "org", title: "Org", render: org => <p>{org.name}</p> },

    ]

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const axios = useAxiosAuth()

    const fetchData = (tenant) => {
        setLoading(true)
        axios.get(`/d2x/${tenant}/github-repos`).then(resp => {
            console.log()
            setData(resp.data)
            setLoading(false)
        })
    }

    return (
        <Table data={data} onTenantChange={value => fetchData(value)} totalItems={data.length} loadingData={loading} columns={columns} />
    )
}

export default Repos
