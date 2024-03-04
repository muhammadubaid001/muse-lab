"use client"
import { useParams } from "next/navigation"
import { Table } from "@/components/ui/Table/Table"
import { useFetchData } from "@/lib/hooks/useFetchData"

const Repos = () => {
    const columns = [
        { key: "id", dbColName: "id", title: "ID" },
        { key: "name", dbColName: "name", title: "Name" },
        { key: "github_id", dbColName: "github_id", title: "Github ID" },
        { key: "url", dbColName: "url", title: "URL" },
        { key: "tenant", dbColName: "tenant", title: "Tenant", render: tenant => <p>{tenant.name}</p> },
        { key: "org", dbColName: "org", title: "Org", render: org => <p>{org.name}</p> },

    ]

    const { slug } = useParams()
    const { data, setData, loading } = useFetchData(`/d2x/${slug}/github-repos`)

    return (
        <Table data={data} totalItems={data.length} loadingData={loading} columns={columns} />
    )
}

export default Repos
