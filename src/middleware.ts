import { type NextRequest, NextResponse } from 'next/server'

export function middleware (request: NextRequest) {
    const token = request.cookies.get('next-auth.session-token')
    if(!token?.value) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}
