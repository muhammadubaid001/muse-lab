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
import { Button } from "@headlessui/react/dist/components/button/button"
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button"

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
        swal({
            title: "Are you sure, you want to delete?",
            icon: "warning",
            className: "w-[500px]",
            buttons: {
                cancel: {
                    text: "Cancel",
                    visible: true,
                },
                confirm: {
                    text: "Delete",
                    className: "bg-primary text-white",
                },
            },
            dangerMode: true,
        }).then((willDelete) => {
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
            <SideSheet sidebarOpen={open} setSidebarOpen={setOpen} title="Edit Tenant">
                <div className="flex flex-col gap-3">
                    <Input value="" placeholder="Name" onChange={value => console.log(value)} container="" label="Name" />
                    <Input value="" placeholder="Github" onChange={value => console.log(value)} container="" label="Github" />
                    <Input value="" placeholder="Value" onChange={value => console.log(value)} container="" label="Value" />
                    <div className="flex gap-2 mt-2">
                        <PrimaryButton type="button" className="px-4 py-2 w-full" label="Save" onClick={() => console.log("here")} container="flex-1" />
                        <SecondaryButton type="button" className="px-4 py-1.5 w-full " label="Cancel" onClick={() => console.log("here")} container="flex-1" />
                    </div>

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
