"use client"
import { Fragment, useEffect, useState } from "react"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { useParams } from "next/navigation"
import { Table } from "@/components/ui/Table/Table"
import classNames from "classnames"
import { SideSheet } from "@/components/ui/Sidesheet"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useNotifications } from "@/lib/hooks/useNotification"
import swal from "sweetalert"
import { alertConfig } from "@/utils/alertConfig"

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

    const axios = useAxiosAuth()
    const { slug } = useParams()
    const { successMessage } = useNotifications()
    const { data, loading } = useFetchData(`/d2x/${slug}/jobs`)

    const handleDelete = (id) => {
        swal(alertConfig).then(willDelete => {
            if (willDelete) {
                axios.delete(`/d2x/${slug}/jobs/${id}`).then(resp => {
                    console.log(resp)
                    successMessage("Job deleted successfully")
                })
            }
        })
    }

    const handleClickRow = (id) => {
        setOpen(true)
        const findApp = data.find((item: { id: string }) => item.id === id)
        setCurrent(findApp)
    }

    console.log(current)

    return (
        <Fragment>
            <SideSheet sidebarOpen={open} setSidebarOpen={setOpen} title="Job Details">
                <div className="flex flex-col gap-3">
                    <div className={styles.list}>
                        <p className="text-primary-charcol text-sm">ID:</p>
                        <span className="text-xs ">{current?.id}</span>
                    </div>
                    <div className={styles.list}>
                        <p className="text-sm">Status:</p>
                        <Badge status={current?.status} />
                    </div>
                    <div className={styles.list}>
                        <p className="text-sm">Log:</p>
                        <span className="text-xs ">{current?.log}</span>
                    </div>
                    <div className={styles.list}>
                        <p className="text-sm">Exception:</p>
                        <span className="text-xs ">{current?.exception}</span>
                    </div>
                    <p className="text-primary-charcol font-libre-sb">Scratch Create Request</p>
                    <div className={styles.list}>
                        <p className="text-sm">Days:</p>
                        <span className="text-xs ">{current?.scratch_create_request?.days}</span>
                    </div>
                    <div className={styles.list}>
                        <p className="text-primary-charcol text-sm">Org Name:</p>
                        <span className="text-xs ">{current?.scratch_create_request?.org_name}</span>
                    </div>
                    <div className={styles.list}>
                        <p className="text-sm">Namespace:</p>
                        <span className="text-xs ">{current?.scratch_create_request?.namespace}</span>
                    </div>
                    <div className={styles.list}>
                        <p className="text-sm">Prerelease:</p>
                        <span
                            className="text-xs">{current?.scratch_create_request?.prerelease ? "True" : "False"}</span>
                    </div>
                    <div className={styles.list}>
                        <p className="text-sm">Status:</p>
                        <Badge status={current?.scratch_create_request?.status} />
                    </div>
                </div>
            </SideSheet>
            <Table
                onRow={(id) => handleClickRow(id)}
                loadingData={loading}
                data={data}
                totalItems={data.length}
                columns={columns}
            />
        </Fragment>
    )
}

const styles = {
    list: "flex text-primary-charcol justify-between items-center",
}
export default Jobs
