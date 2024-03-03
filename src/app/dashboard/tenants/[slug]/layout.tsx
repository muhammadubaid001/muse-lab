"use client"
import classNames from "classnames"
import { ArrowLeft } from "iconsax-react"
import { Breadcrumb } from "@/components/Breadcrumb"
import { useParams, usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Fragment } from "react"

const TenantLayout = ({ children }) => {
    const tab: string = "Candslugates"

    const { slug } = useParams()
    const router = useRouter()
    const pathname = usePathname()

    return (
        <Fragment>
            <div className="flex items-center gap-2">
                <button type="button" onClick={() => router.push('/dashboard/tenants')}
                        className="bg-white border border-gray-200 px-3 py-2 rounded-md">
                    <ArrowLeft size="20" />
                </button>
                <Breadcrumb  />
            </div>
            <div className="text-sm p-1.5 mt-4 text-center text-gray-500 border border-gray-200 rounded-md bg-gray-100">
                <div className="flex flex-wrap -mb-px gap-3">
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
            {children}
        </Fragment>
    )
}

const tabStyles = {
    default:
        "px-5 font-libre-sb py-2.5 flex-1 hover:shadow-tab hover:text-primary-charcol transition-all ease-in-out hover:bg-gray-50 hover:rounded-md",
    active: "shadow-tab text-gray-700 shadow-md bg-gray-50 rounded-md",
    select:
        "focus:border-gray-300 w-full focus:ring-0 focus:outline-none rounded-md border border-gray-200 text-gray-700 text-xs",
}

export default TenantLayout
