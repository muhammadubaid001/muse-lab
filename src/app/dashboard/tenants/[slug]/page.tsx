"use client"
import { Table } from "@/components/ui/Table/Table"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import swal from "sweetalert"
import { alertConfig } from "@/utils/alertConfig"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { useNotifications } from "@/lib/hooks/useNotification"

const SpecificTenant = () => {
    const columns = [
        { key: "id", dbColName: "id", title: "ID"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "github_id", dbColName: "github_id", title: "Github ID"},
        { key: "url", dbColName: "url", title: "URL"},
        { key: "tenant", dbColName: "tenant", title: "Tenant", render: tenant => <p>{tenant.name}</p>},
        {
            key: "actions",
            dbColName: "id",
            title: "Actions",
            render: (id) => <DefaultActions id={id} handleDelete={() => console.log(id)}
                                            onEdit={() => console.log("Edit")} />,
        },
    ]

    // const { slug } = useParams()
    // const axios = useAxiosAuth()
    // const { successMessage } = useNotifications()
    // const { data, loading } = useFetchData(`/d2x/${slug}/github-orgs`)


    return(
           <div>
               Talent
           </div>
    )
}

export default SpecificTenant
