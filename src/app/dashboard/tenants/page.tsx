'use client'
import { Table } from '@/components/ui/Table/Table'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useRouter } from "next/navigation"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import swal from "sweetalert"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { useNotifications } from "@/lib/hooks/useNotification"
import { SideSheet } from "@/components/ui/Sidesheet"
import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button"
import { alertConfig } from "@/utils/alertConfig"

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "ID"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "github_id", dbColName: "github_id", title: "Github ID"},
        { key: "owner_id", dbColName: "owner_id", title: "Owner ID"},
        { key: "created", dbColName: "created", title: "Created at"},
        { key: "updated", dbColName: "updated", title: "Updated at"},
        { key: "actions", dbColName: "id", title: "Actions", render: (id) => <DefaultActions id={id} handleDelete={() => handleDelete(id)} onEdit={onEdit} />}
    ]

    const [open, setOpen] = useState(false)
    const axios = useAxiosAuth()
    const { successMessage } = useNotifications()

    const handleDelete = id => {
        swal(alertConfig).then((willDelete) => {
          if(willDelete) {
              axios.delete(`/tenants/${id}`).then(resp => {
                  console.log(resp)
                  successMessage("Tenant deleted successfully.")
              })
          }
        });
    }

    const onEdit = () => {
        setOpen(true)
    }

    const {data, setData, loading } = useFetchData('/tenants?offset=0&limit=100')

    const router = useRouter()

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb />
            <SideSheet handleClickPrimary={() => console.log("")} handleClickSecondary={() => console.log("")} sidebarOpen={open} setSidebarOpen={setOpen} title="Edit Tenant">
                <div className="flex flex-col gap-3">
                    <Input value="" placeholder="Name" onChange={value => console.log(value)} container="" label="Name" />
                    <Input value="" placeholder="Github" onChange={value => console.log(value)} container="" label="Github" />
                    <Input value="" placeholder="Value" onChange={value => console.log(value)} container="" label="Value" />
                </div>
            </SideSheet>
            <Table
                onRow={(slug) => router.push(`/dashboard/tenants/${slug}`)}
                data={data}
                loadingData={loading}
                columns={columns}
                onRowFieldName="slug"
                totalItems={0}
            />
        </div>
    )
}
