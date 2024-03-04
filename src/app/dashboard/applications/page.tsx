'use client'
import { Table } from '@/components/ui/Table/Table'
import { useState } from "react"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { Breadcrumb } from '@/components/Breadcrumb'
import { SideSheet } from "@/components/ui/Sidesheet"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useNotifications } from "@/lib/hooks/useNotification"
import swal from "sweetalert"
import { alertConfig } from "@/utils/alertConfig"
import { Input } from "@/components/ui/Input"

interface IApplication {
    id: string,
    name: string,
    slug: string,
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
        swal(alertConfig).then((willDelete) => {
            if(willDelete) {
                axios.delete(`/applications/${id}`).then(resp => {
                    console.log(resp)
                    successMessage("Tenant deleted successfully.")
                })
            }
        });
    }
    const [current, setCurrent] = useState<IApplication >({
        id: '',
        name: '',
        slug: '',
        platform: '',
        owner: {
            name: '',
            id: ''
        }
    })
    const [open, setOpen] = useState(false)

    const { data, setData, loading } = useFetchData('/applications?offset=0&limit=100')

    const handleClickRow = (id) => {
        const findApp: any = data.find((item: { id: string }) => item.id === id)
        setCurrent(findApp)
    }

    const handleUpdate = () => {
        axios.put(`/applications/${current.id}`).then(resp => {
            console.log(resp)
            setOpen(false)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb />
            <SideSheet handleClickPrimary={handleUpdate} sidebarOpen={open} setSidebarOpen={setOpen} title={current?.name || ''}>
                <div className="flex flex-col gap-3">
                    <Input value={current.name} placeholder="Name" onChange={value => setCurrent({
                        ...current,
                        name: value,
                    })} container="" label="Name" />
                    <Input value={current.slug} placeholder="Slug" onChange={value => setCurrent({
                        ...current,
                        slug: value,
                    })} container="" label="Slug" />
                    <Input value={current.platform} placeholder="Platform" onChange={value => setCurrent({
                        ...current,
                        platform: value,
                    })} container="" label="Platform" />
                    <Input disabled value={current.owner.id} placeholder="Owner" onChange={value => console.log(value)} container="" label="Owner" />
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
