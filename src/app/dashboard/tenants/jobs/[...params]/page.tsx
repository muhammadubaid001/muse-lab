'use client'
import { useParams } from "next/navigation"
import { useFetchData } from "@/lib/hooks/useFetchData"
import classNames from "classnames"

const Badge = ({ status }) => {
    return (
        <span
            className={classNames("px-3 py-1  text-xs text-center rounded-full", {
                "bg-green-100 text-[#027a48]": status === "accepted",
                "bg-red-100 text-[#c01048]": status === "pending",
            })}
        >
            {status}
        </span>
    )
}
const SpecificJob = () => {
    const { jobid } = useParams()
    const current: any = null

    const { data } = useFetchData(``)

    return (
     <div className="bg-white shadow-sm mt-3 rounded-md">
         <p className="text-primary-charcol font-libre-sb border-b p-4 border-gray-200">Job Details</p>
         <div className="flex flex-col max-w-md p-5 gap-3">
             <div className={styles.list}>
                 <p className="text-primary-charcol text-sm">ID:</p>
                 <span className="text-xs ">{current?.id}</span>
             </div>
             <div className={styles.list}>
                 <p className="text-sm">Status:</p>
                 <Badge status={current?.status} />
             </div>
             <div className={styles.list}>
                 <p className="text-sm">Log:</p>
                 <span className="text-xs ">{current?.log}</span>
             </div>
             <div className={styles.list}>
                 <p className="text-sm">Exception:</p>
                 <span className="text-xs ">{current?.exception}</span>
             </div>
             <p className="text-primary-charcol font-libre-sb">Scratch Create Request</p>
             <div className={styles.list}>
                 <p className="text-sm">Days:</p>
                 <span className="text-xs ">{current?.scratch_create_request?.days}</span>
             </div>
             <div className={styles.list}>
                 <p className="text-primary-charcol text-sm">Org Name:</p>
                 <span className="text-xs ">{current?.scratch_create_request?.org_name}</span>
             </div>
             <div className={styles.list}>
                 <p className="text-sm">Namespace:</p>
                 <span className="text-xs ">{current?.scratch_create_request?.namespace}</span>
             </div>
             <div className={styles.list}>
                 <p className="text-sm">Prerelease:</p>
                 <span
                     className="text-xs">{current?.scratch_create_request?.prerelease ? "True" : "False"}</span>
             </div>
             <div className={styles.list}>
                 <p className="text-sm">Status:</p>
                 <Badge status={current?.scratch_create_request?.status} />
             </div>
         </div>
     </div>
    )
}

const styles = {
    list: "flex text-primary-charcol justify-between items-center",
}

export default SpecificJob
