import { type NextRequest, NextResponse } from 'next/server'

export function middleware (req: NextRequest) {
    const token = req.cookies.get('next-auth.session-token')

    if(!token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (req.nextUrl.pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // if (req.nextUrl.pathname === '/' && token) {
    //     return NextResponse.redirect(new URL('/dashboard', req.url))
    // }

    return NextResponse.next()

}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}
