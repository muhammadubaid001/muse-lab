'use client'
import { useEffect, useState } from "react"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { useParams } from "next/navigation"
import { Table } from "@/components/ui/Table/Table"

const Users = () => {
    const [loading, setLoading] = useState(false)
    const axios = useAxiosAuth()
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        axios.get(`/d2x/${id}/github-users`).then(resp => {
            console.log(resp)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Table data={[]} totalItems={0} loadingData={loading} columns={[]} />
    )
}

export default  Users
