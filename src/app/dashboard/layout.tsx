'use client'
import React from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { useSession } from 'next-auth/react'
import { Loader } from '@/components/Loader'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data, status } = useSession()

    if(status === 'loading') {
        return <Loader />
    }

    return (
        <div className='flex h-screen bg-gray-50 gap-2'>
            <Sidebar />
            {children}
        </div>
    )

}

