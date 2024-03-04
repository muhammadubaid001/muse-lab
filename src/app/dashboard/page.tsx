'use client'
import { Table } from '@/components/ui/Table/Table'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useFetchData } from "@/lib/hooks/useFetchData"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useNotifications } from "@/lib/hooks/useNotification"
import swal from "sweetalert"
import { alertConfig } from "@/utils/alertConfig"

export default function Page() {
    const columns = [
        { key: "id", dbColName: "id", title: "id"},
        { key: "username", dbColName: "username", title: "Username"},
        { key: "actions", dbColName: "id", title: "Actions", render: (id) => <DefaultActions id={id} handleDelete={() => handleDelete(id)} onEdit={() => console.log("Edit")} />}
    ]

    const axios = useAxiosAuth()
    const { successMessage } = useNotifications()

    const handleDelete = id => {
        swal(alertConfig).then((willDelete) => {
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
