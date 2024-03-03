import { useEffect, useState } from "react"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"

export const useFetchData = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const axios = useAxiosAuth()

    useEffect(() => {
        setLoading(true)
        axios.get(url).then(resp => {
            setData(resp.data)
        }).catch(error => {
            console.log("Error fetching data")
        }).finally(() => {
            setLoading(false)
        })
    }, [axios])

    return {
        data,
        setData,
        loading,
    }
}
