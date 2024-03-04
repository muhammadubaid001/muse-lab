"use client"
import { Fragment, useEffect, useState } from "react"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { useParams } from "next/navigation"
import { Table } from "@/components/ui/Table/Table"
import classNames from "classnames"
import { SideSheet } from "@/components/ui/Sidesheet"
import { useFetchData } from "@/lib/hooks/useFetchData"

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
    ]
    const [open, setOpen] = useState(false)

    const axios = useAxiosAuth()
    const { slug } = useParams()
    const { data, loading} = useFetchData(`/d2x/${slug}/jobs`)

    const handleRowClick = (jobId) => {
        setOpen(true)
        axios.get(`/d2x/${slug}/jobs/${jobId}`).then(resp => {
            console.log(resp)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Fragment>
            <SideSheet sidebarOpen={open} setSidebarOpen={setOpen} title="Job Details">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <p className="text-primary-charcol">Status:</p>
                        <Badge status="Pending" />
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-primary-charcol">Status:</p>
                        <Badge status="Pending" />
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-primary-charcol">Status:</p>
                        <Badge status="Accepted" />
                    </div>
                </div>
            </SideSheet>
            <Table
                onRow={(id) => handleRowClick(id)}
                loadingData={loading}
                data={data}
                totalItems={data.length}
                columns={columns}
            />
        </Fragment>
    )
}

export default Jobs
