"use client"

import { Table } from "@/components/ui/Table/Table"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { DefaultActions } from "@/components/ui/Table/defaultAction"

const Jobs = () => {
    const columns = [
        { key: "id", dbColName: "id", title: "ID" },
        { key: "name", dbColName: "name", title: "Name" },
        { key: "description", dbColName: "description", title: "Description" },

        {
            key: "actions",
            dbColName: "id",
            title: "Actions",
            render: (id) => <DefaultActions id={id} handleDelete={() => console.log(id)}
                                            onEdit={() => console.log("Edit")} />,
        },
    ]
    const tenant = localStorage.getItem("tentant")
    const { data, loading } = useFetchData(`/d2x/${tenant}/plans`)

    return (
        <Table
            loadingData={loading}
            data={data}
            totalItems={data.length}
            columns={columns}
        />
    )
}


export default Jobs
