"use client"
import { Table } from "@/components/ui/Table/Table"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useFetchData } from "@/lib/hooks/useFetchData"

const Salesforce = () => {
    const columns = [
        { key: "id", dbColName: "id", title: "ID"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "description", dbColName: "description", title: "Description"},
        { key: "url", dbColName: "instance_url", title: "URL"},
        { key: "architecture", dbColName: "architecture", title: "Architecture"},
        { key: "org_type", dbColName: "org_type", title: "Org Type"},
        { key: "tenant", dbColName: "tenant", title: "Tenant", render: tenant => <p>{tenant.name}</p>},
    ]

    const tenant = localStorage.getItem("tenant")
    const { data, loading } = useFetchData(`/d2x/${tenant}/orgs`)

    return(
        <Table data={data} loadingData={loading} totalItems={data.length} columns={columns} />
    )
}

export default Salesforce
