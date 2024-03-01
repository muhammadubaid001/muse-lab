import type { Metadata } from 'next'
import AuthProvider from './context/AuthProvider'
import NextTopLoader from 'nextjs-toploader';
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
                <NextTopLoader showSpinner={false} color="#f99f1b" />
                    {children}
                </body>
            </AuthProvider>
        </html>
    )
}
