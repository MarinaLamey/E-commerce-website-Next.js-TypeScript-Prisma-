import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { JWTPayload } from './utils/type'; 
async function verifyToken(token: string) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
        const { payload } = await jwtVerify(token, secret);
        return payload as JWTPayload; 
    } catch (error) {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("jwtToken")?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
        if (!token) return NextResponse.redirect(new URL("/loginpage", request.url));
        
        const payload = await verifyToken(token);
        if (!payload || !payload.isAdmin) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (token && (pathname === "/loginpage" || pathname === "/registerpage")) {
        const payload = await verifyToken(token);
        if (payload) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/loginpage',
        '/registerpage',
    ],
};