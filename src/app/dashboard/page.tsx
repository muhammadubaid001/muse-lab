"use client"
import { Table } from "@/components/ui/Table/Table"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { Breadcrumb } from "@/components/Breadcrumb"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useNotifications } from "@/lib/hooks/useNotification"
import swal from "sweetalert"
import { alertConfig } from "@/utils/alertConfig"
import { SideSheet } from "@/components/ui/Sidesheet"
import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button"

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "id" },
        { key: "username", dbColName: "username", title: "Username" },
        {
            key: "actions",
            dbColName: "id",
            title: "Actions",
            render: (id) => <DefaultActions id={id} handleDelete={() => handleDelete(id)} onEdit={() => onEdit(id)} />,
        },
    ]

    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState({
        id: '',
        username: "",
    })

    const { data, setData, loading } = useFetchData("/users?offset=0&limit=100")
    const axios = useAxiosAuth()
    const { successMessage } = useNotifications()

    const onEdit = id => {
        setOpen(true)
        const findUser: any = data.find((item: { id: string }) => item.id === id)
        setCurrent({
            id: findUser.id,
            username: findUser?.username,
        })
    }

    const handleDelete = id => {
        swal(alertConfig).then((willDelete) => {
            if (willDelete) {
                axios.delete(`/users/${id}`).then(resp => {
                    console.log(resp)
                    successMessage("User deleted successfully.")
                })
            }
        })
    }

    const handleUpdate = () => {
        axios.put(`/users/${current.id}`, { username: current.username }).then(resp => {
            console.log(resp)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setOpen(false)
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb label="Users" />
            <SideSheet sidebarOpen={open} setSidebarOpen={setOpen} title="Edit User">
                <Input value={current.username} placeholder="Username" onChange={value => setCurrent({
                    ...current,
                    username: value,
                })} container="" label="Username" />

            </SideSheet>
            <Table
                data={data}
                loadingData={loading}
                columns={columns}
                totalItems={data.length}
            />
        </div>
    )
}
