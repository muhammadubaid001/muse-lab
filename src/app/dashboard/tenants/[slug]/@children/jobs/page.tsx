"use client"
import { Fragment, useEffect, useState } from "react"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { useParams } from "next/navigation"
import { Table } from "@/components/ui/Table/Table"
import classNames from "classnames"
import { SideSheet } from "@/components/ui/Sidesheet"

// {
//     "org_connect_request_id": "00000000-0000-0000-0000-000000000000",
//     "scratch_create_request_id": "00000000-0000-0000-0000-000000000000",
//     "org_user_id": "00000000-0000-0000-0000-000000000000",
//     "repo_id": "00000000-0000-0000-0000-000000000000",
//     "deployment_id": 12345,
//     "plan_version_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "steps": "string",
//     "ref": "main",
//     "running_application_id": "00000000-0000-0000-0000-000000000000",
//     "running_user_id": "00000000-0000-0000-0000-000000000000",
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "status": "pending",
//     "log": "",
//     "exception": "An error occurred while running the job.",
//     "tenant_id": "00000000-0000-0000-0000-000000000000"
// }


const Badge = ({ status }) => {
    return (
        <span
            className={classNames("px-3 py-1  text-xs text-center rounded-full", {
                "bg-green-100 text-[#027a48]": status === "Accepted",
                "bg-red-100 text-[#c01048]": status === "Pending",
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
    const data = [
        {
            id: "1",
            repo_id: "12",
            org_user_id: "22",
            ref: "main",
            status: "Pending",
            exception: "An error occurred while running the job.",
        },
        {
            id: "2",
            repo_id: "13",
            org_user_id: "42",
            ref: "main",
            status: "Accepted",
            exception: "An error occurred while running the job.",
        },
    ]
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const axios = useAxiosAuth()
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        axios.get(`/d2x/${id}/jobs`).then(resp => {
            console.log(resp)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const handleRowClick = (jobId) => {
        setOpen(true)
        axios.get(`/d2x/${id}/jobs/${jobId}`).then(resp => {
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
            <Table onRow={(id) => handleRowClick(id)} loadingData={loading} data={data} totalItems={2} columns={columns} />
        </Fragment>
    )
}

export default Jobs
