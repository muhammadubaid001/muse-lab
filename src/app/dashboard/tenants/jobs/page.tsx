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
        { key: "repo_id", dbColName: "repo_id", title: "Repo ID" },
        { key: "org_user_id", dbColName: "org_user_id", title: "Org User ID" },
        { key: "ref", dbColName: "ref", title: "Ref" },
        { key: "status", dbColName: "status", title: "Status", render: (status) => <Badge status={status} /> },
        { key: "exception", dbColName: "exception", title: "Exception" },
        {
            key: "actions",
            dbColName: "id",
            title: "Actions",
            render: (id) => <DefaultActions id={id} handleDelete={() => handleDelete(id)}
                                            onEdit={() => console.log("Edit")} />,
        },
    ]
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState<any>(null)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [tenant, setTenant] = useState('')

    const axios = useAxiosAuth()
    const router = useRouter()

    const fetchData = value => {
        setTenant(value)
        setLoading(true)
        axios.get(`/d2x/${value}/jobs`).then(resp => {
            setData(resp.data)
            setLoading(false)
        })
    }

    const handleDelete = (id) => {
        swal(alertConfig).then(willDelete => {
            if (willDelete) {
               console.log(willDelete)
            }
        })
    }

    const handleClickRow = (id) => {
        router.push(`/dashboard/tenants/jobs/${id}/${tenant}`)
    }

    return (
            <Table
                onRow={(id) => handleClickRow(id)}
                loadingData={loading}
                data={data}
                onTenantChange={value => fetchData(value)}
                totalItems={data.length}
                columns={columns}
            />
    )
}


export default Jobs
