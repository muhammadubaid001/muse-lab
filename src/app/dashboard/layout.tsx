'use client'
import React from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className='flex h-screen bg-gray-50 gap-2'>
            <Sidebar />
            {children}
        </div>
    )

}

