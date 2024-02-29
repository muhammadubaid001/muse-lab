import type { Metadata } from 'next'
import AuthProvider from './context/AuthProvider'

import './globals.css'

export const metadata: Metadata = {
    title: 'Muse Lab',
    description: 'Muse Lab Dashboard',
    icons: {
        icon: [
            {
                url: '/icon.png',
                href: '/icon.png',
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
                <body className="font-libre antialiased">
                {children}
                </body>
            </AuthProvider>
        </html>
    )
}
