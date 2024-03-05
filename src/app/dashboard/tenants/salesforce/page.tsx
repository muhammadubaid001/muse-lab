"use client"
import { Table } from "@/components/ui/Table/Table"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useState } from "react"

const Salesforce = () => {
    const columns = [
        { key: "id", dbColName: "id", title: "ID"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "description", dbColName: "description", title: "Description"},
        { key: "url", dbColName: "instance_url", title: "URL"},
        { key: "architecture", dbColName: "architecture", title: "Architecture"},
        { key: "org_type", dbColName: "org_type", title: "Org Type"},
        { key: "tenant", dbColName: "tenant", title: "Tenant", render: tenant => <p>{tenant.name}</p>},
        {
            key: "actions",
            dbColName: "id",
            title: "Actions",
            render: (id) => <DefaultActions id={id} handleDelete={() => console.log(id)}
                                            onEdit={() => console.log("Edit")} />,
        },
    ]

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const axios = useAxiosAuth()

    const fetchData = value => {
        setLoading(true)
        axios.get(`/d2x/${value}/orgs`).then(resp => {
            console.log(resp)
            setLoading(resp.data)
            setLoading(false)
        })
    }


    return(
        <Table data={data} onTenantChange={value => fetchData(value)} loadingData={loading} totalItems={data.length} columns={columns} />
    )
}

export default Salesforce
