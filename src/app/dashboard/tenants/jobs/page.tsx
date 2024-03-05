"use client"
import { useParams, useRouter } from "next/navigation"
import { Table } from "@/components/ui/Table/Table"
import classNames from "classnames"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import swal from "sweetalert"
import { alertConfig } from "@/utils/alertConfig"
import { useFetchData } from "@/lib/hooks/useFetchData"

const Badge = ({ status }) => {
    return (
        <span
            className={classNames("px-3 py-1  text-xs text-center rounded-full", {
                "bg-green-100 text-[#027a48]": status === "success",
                "bg-yellow-100 text-yellow-700": status === "pending",
                "bg-red-100 text-[#c01048]": status === "failed",
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

    const tenant = localStorage.getItem("tenant")
    const { data, loading } = useFetchData(`/d2x/${tenant}/jobs`)
    const router = useRouter()

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
                totalItems={data.length}
                columns={columns}
            />
    )
}


export default Jobs
