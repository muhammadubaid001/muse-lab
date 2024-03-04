"use client"
import { Table } from "@/components/ui/Table/Table"
import { Breadcrumb } from "@/components/Breadcrumb"
import { useRouter } from "next/navigation"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import swal from "sweetalert"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { useNotifications } from "@/lib/hooks/useNotification"
import { SideSheet } from "@/components/ui/Sidesheet"
import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { alertConfig } from "@/utils/alertConfig"

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "ID" },
        { key: "name", dbColName: "name", title: "Name" },
        { key: "github_id", dbColName: "github_id", title: "Github ID" },
        { key: "owner_id", dbColName: "owner_id", title: "Owner ID" },
        { key: "created", dbColName: "created", title: "Created at" },
        { key: "updated", dbColName: "updated", title: "Updated at" },
        {
            key: "actions",
            dbColName: "id",
            title: "Actions",
            render: (id) => <DefaultActions id={id} handleDelete={() => handleDelete(id)} onEdit={() => onEdit(id)} />,
        },
    ]

    const [current, setCurrent] = useState({
        "id": "",
        "slug": "",
        "name": "",
        "github_id": 0,
        "owner_id": "",
    })
    const [open, setOpen] = useState(false)

    const axios = useAxiosAuth()
    const { data, setData, loading } = useFetchData("/tenants?offset=0&limit=100")

    const router = useRouter()
    const { successMessage } = useNotifications()

    const handleDelete = id => {
        swal(alertConfig).then((willDelete) => {
            if (willDelete) {
                axios.delete(`/tenants/${id}`).then(resp => {
                    console.log(resp)
                    successMessage("Tenant deleted successfully.")
                })
            }
        })
    }

    const onEdit = (id) => {
        setOpen(true)
        const findTenant: any = data.find((item: { id: string }) => item.id === id)
        setCurrent(findTenant)
    }

    const handleUpdate = () => {
        axios.put(`/tenants/${current.id}`, {
            slug: current.slug,
            name: current.name,
            github_id: current.github_id,
            owner_id: current.owner_id,
        }).then(resp => {
            setOpen(false)
            successMessage("Tenant updated successfully")
        }).catch(error => {
            console.log({ error })
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb />
            <SideSheet handleClickPrimary={handleUpdate}
                       sidebarOpen={open} setSidebarOpen={setOpen} title="Edit Tenant">
                <div className="flex flex-col gap-3">
                    <Input value={current.name} placeholder="Name" onChange={value => setCurrent({
                        ...current,
                        name: value,
                    })} container="" label="Name" />
                    <Input value={current.slug} placeholder="Slug" onChange={value => setCurrent({
                        ...current,
                        slug: value,
                    })} container="" label="Slug" />
                    {/*<Input value={current.github_id} placeholder="Github" onChange={value => setCurrent({*/}
                    {/*    ...current,*/}
                    {/*    github_id: value,*/}
                    {/*})} container="" label="Github" />*/}
                    <Input value={current.owner_id} placeholder="Owner" onChange={value => setCurrent({
                        ...current,
                        owner_id: value,
                    })} container="" label="Owner" />
                </div>
            </SideSheet>
            <Table
                onRow={(slug) => router.push(`/dashboard/tenants/${slug}`)}
                data={data}
                loadingData={loading}
                columns={columns}
                onRowFieldName="slug"
                totalItems={data.length}
            />
        </div>
    )
}
