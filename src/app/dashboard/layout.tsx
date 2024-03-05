"use client"
import React, { useState } from "react"
import { Sidebar } from "@/components/dashboard/Sidebar"

import "react-notifications-component/dist/theme.css"


import { useSession } from "next-auth/react"
import { Loader } from "@/components/Loader"
import { MobileSidebar } from "@/components/dashboard/MobileSidebar"
import { HambergerMenu } from "iconsax-react"
import { ReactNotifications } from "react-notifications-component"
import { Breadcrumb } from "@/components/Breadcrumb"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { data, status } = useSession()

    return status === "loading" ? <Loader /> : (
        <div className="flex h-screen bg-gray-50">
            <ReactNotifications />

            <div className="block lg:hidden">
                <MobileSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <main className="focus:outline-none overflow-auto h-screen p-6">
                   <button type="button" className="block mb-3 lg:hidden" onClick={() => setSidebarOpen(true)}>
                       <HambergerMenu />
                   </button>
<Breadcrumb />
                    {children}
                </main>
            </div>
        </div>
    )

}

