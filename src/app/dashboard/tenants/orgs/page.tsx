"use client"
import { Table } from "@/components/ui/Table/Table"
import { useParams, usePathname } from "next/navigation"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"
import { DefaultActions } from "@/components/ui/Table/defaultAction"
import { useFetchData } from "@/lib/hooks/useFetchData"
import { useNotifications } from "@/lib/hooks/useNotification"
import { Fragment, useState } from "react"
import Link from "next/link"
import classNames from "classnames"

const Orgs = () => {
    const columns = [
        { key: "id", dbColName: "id", title: "ID"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "github_id", dbColName: "github_id", title: "Github ID"},
        { key: "url", dbColName: "url", title: "URL"},
        { key: "tenant", dbColName: "tenant", title: "Tenant", render: tenant => <p>{tenant.name}</p>},
        {
            key: "actions",
            dbColName: "id",
            title: "Actions",
            render: (id) => <DefaultActions id={id} handleDelete={() => console.log(id)}
                                            onEdit={() => console.log("Edit")} />,
        },
    ]

    const tenant = localStorage.getItem("tenant")
    const { data, loading } = useFetchData(`/d2x/${tenant}/github-orgs`)
    const pathname = usePathname()
    const slug = ""

    return(
        <Fragment>
            <div className="text-sm p-1.5 mt-4 text-center text-gray-500 border border-gray-200 rounded-md bg-gray-100">
                <div className="flex overflow-x-auto md:overflow-x-clip -mb-px gap-3">
                    <Link
                        href={`/dashboard/tenants/${slug}`}
                        className={classNames(tabStyles.default, {
                            [tabStyles.active]: pathname === `/dashboard/tenants/${slug}`,
                        })}
                    >
                        Github Orgs
                    </Link>
                    <Link
                        href={`/dashboard/tenants/${slug}/repos`}
                        className={classNames(tabStyles.default, {
                            [tabStyles.active]: pathname.includes("repos"),
                        })}
                    >
                        Github Repos
                    </Link>
                    <Link
                        href={`/dashboard/tenants/${slug}/users`}
                        className={classNames(tabStyles.default, {
                            [tabStyles.active]: pathname.includes("users"),
                        })}
                    >
                        Github Users
                    </Link>
                    <Link
                        href={`/dashboard/tenants/${slug}/jobs`}
                        className={classNames(tabStyles.default, {
                            [tabStyles.active]: pathname.includes("jobs"),
                        })}
                    >
                        Jobs
                    </Link>
                </div>
            </div>
        <Table data={data} loadingData={loading} totalItems={data.length} columns={columns} />
        </Fragment>
    )
}

const tabStyles = {
    default:
        "px-5 font-libre-sb py-2.5 flex-1 hover:shadow-tab whitespace-nowrap hover:text-primary-charcol transition-all ease-in-out hover:bg-gray-50 hover:rounded-md",
    active: "shadow-tab text-gray-700 shadow-md bg-gray-50 rounded-md",
    select:
        "focus:border-gray-300 w-full focus:ring-0 focus:outline-none rounded-md border border-gray-200 text-gray-700 text-xs",
}


export default Orgs
