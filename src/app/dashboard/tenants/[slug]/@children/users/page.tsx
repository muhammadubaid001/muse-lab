'use client'
import { useParams } from "next/navigation"
import { Table } from "@/components/ui/Table/Table"
import { useFetchData } from "@/lib/hooks/useFetchData"

const Users = () => {
    const columns = [
        { key: "id", dbColName: "name", title: "Name"},
        { key: "plan", dbColName: "plan", title: "Plan"},
    ]
    const { slug } = useParams()
    const { data, loading } = useFetchData(`/d2x/${slug}/github-users`)

    return (
        <Table data={data} totalItems={data.length} loadingData={loading} columns={columns} />
    )
}

export default  Users
