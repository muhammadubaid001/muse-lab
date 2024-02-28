import type { Metadata } from 'next'
import AuthProvider from './context/AuthProvider'

import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Muse Lab',
    description: 'Muse Lab Dashboard',
    icons: {
        icon: [
            {
                url: '/favicon.png',
                href: '/favicon.png',
            },
        ],
    },
}

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
        <AuthProvider>
            <body className='font-libre antialiased'>

            {children}
            </body>
        </AuthProvider>
        </html>
    )
}
