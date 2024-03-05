"use client"
import { Fragment, useEffect, useState } from "react"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { useParams, useRouter } from "next/navigation"
import { Table } from "@/components/ui/Table/Table"
import classNames from "classnames"
import { SideSheet } from "@/components/ui/Sidesheet"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useNotifications } from "@/lib/hooks/useNotification"
import swal from "sweetalert"
import { alertConfig } from "@/utils/alertConfig"
import { router } from "next/client"

const Badge = ({ status }) => {
    return (
        <span
            className={classNames("px-3 py-1  text-xs text-center rounded-full", {
                "bg-green-100 text-[#027a48]": status === "accepted",
                "bg-red-100 text-[#c01048]": status === "pending",
            })}
        >
            {status}
        </span>
    )
}


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
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const axios = useAxiosAuth()

    const fetchData = value => {
        setLoading(true)
        axios.get(`/d2x/${value}/plans`).then(resp => {
            setData(resp.data)
            setLoading(false)
        })
    }


    return (
        <Table
            loadingData={loading}
            data={data}
            onTenantChange={value => fetchData(value)}
            totalItems={data.length}
            columns={columns}
        />
    )
}


export default Jobs
