"use client"
import { Table } from "@/components/ui/Table/Table"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"

const SpecificTenant = () => {
    const columns = [
        { key: "id", dbColName: "id", title: "ID"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "github_id", dbColName: "github_id", title: "Github ID"},
        { key: "url", dbColName: "url", title: "URL"},
        { key: "tenant", dbColName: "tenant", title: "Tenant", render: tenant => <p>{tenant.name}</p>}
    ]
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const { slug } = useParams()
    const axios = useAxiosAuth()

    useEffect(() => {
        setLoading(true)
        axios.get(`/d2x/${slug}/github-orgs`).then(resp => {
            console.log(resp)
            setData(resp.data)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return(
        <div>
            <Table data={data} loadingData={loading} totalItems={data.length} columns={columns} />
        </div>
    )
}

export default SpecificTenant
