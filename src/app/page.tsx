'use client'

import { useSession } from 'next-auth/react'

export default function Home() {
    const { data: session, status } = useSession()
    // if (session) {
    //     redirect('/dashboard')
    // } else {
    //     redirect('/login')
    // }

    return <div>
        This is amazing
    </div>

}

