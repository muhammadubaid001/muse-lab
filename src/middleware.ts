import { type NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware (req: NextRequest) {
    const session = await getToken({ req, secret: process.env.AUTH0_SECRET })

    if(!session) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (req.nextUrl.pathname === '/login' && session) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (req.nextUrl.pathname === '/' && session) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}
