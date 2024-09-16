import { url } from "inspector";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export default async function  middleware(req:NextRequest) {
    const path = req.nextUrl.pathname;
    const token = cookies().get("userToken")

    if ((path === '/login' || path === '/signup') && token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (path == '/' && !token) {
        return NextResponse.redirect(new URL('/signup',req.url))
    }

    return NextResponse.next()
}

export  const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }