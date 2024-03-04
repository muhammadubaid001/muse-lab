'use client'
import { Table } from '@/components/ui/Table/Table'
import { useEffect, useState } from "react"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { Breadcrumb } from '@/components/Breadcrumb'
import { SideSheet } from "@/components/ui/Sidesheet"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useNotifications } from "@/lib/hooks/useNotification"
import swal from "sweetalert"

interface IApplication {
    id: string,
    name: string,
    platform: string,
    owner: {
        name: string,
        id: string
    }
}

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "ID"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "platform", dbColName: "platform", title: "Platform"},
        { key: "owner", dbColName: "owner", title: "Owner", render: (owner) => <p>{owner.username}</p>},
        { key: "created", dbColName: "created", title: "Created at"},
        { key: "updated", dbColName: "updated", title: "Updated at"},
        { key: "actions", dbColName: "id", title: "Actions", render: (id) => <DefaultActions id={id} handleDelete={() => handleDelete(id)} onEdit={() => console.log("Edit")} />}
    ]
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
                axios.delete(`/applications/${id}`).then(resp => {
                    console.log(resp)
                    successMessage("Tenant deleted successfully.")
                })
            }
        });
    }
    const [current, setCurrent] = useState<IApplication | undefined>({
        id: '',
        name: '',
        platform: '',
        owner: {
            name: '',
            id: ''
        }
    })
    const [open, setOpen] = useState(false)

    const { data, setData, loading } = useFetchData('/applications?offset=0&limit=100')

    const handleClickRow = (id) => {
        const findApp = data.find((item: { id: string }) => item.id === id)
        setCurrent(findApp)
    }

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb />
            <SideSheet sidebarOpen={open} setSidebarOpen={setOpen} title={current?.name || ''}>
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                        <p>Platform: </p>
                        <p>{current?.platform}</p>
                    </div>
                </div>
            </SideSheet>
            <Table
                data={data}
                onRow={(id) => handleClickRow(id)}
                loadingData={loading}
                columns={columns}
                totalItems={data?.length}
            />
        </div>
    )
}
