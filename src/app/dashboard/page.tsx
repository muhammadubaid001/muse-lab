'use client'
import { Table } from '@/components/ui/Table/Table'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useFetchData } from "@/lib/hooks/useFetchData"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useNotifications } from "@/lib/hooks/useNotification"
import swal from "sweetalert"

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "id"},
        { key: "username", dbColName: "username", title: "Username"},
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
                axios.delete(`/users/${id}`).then(resp => {
                    console.log(resp)
                    successMessage("User deleted successfully.")
                })
            }
        });
    }

    const { data, setData, loading } = useFetchData('/users?offset=0&limit=100')

    return (
        <div className="flex flex-col gap-2">
            <Breadcrumb label="Users" />
            <Table
                data={data}
                loadingData={loading}
                columns={columns}
                totalItems={data.length}
            />
        </div>
    )
}
