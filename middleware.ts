import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'
export async function middleware(request: NextRequest) {
   const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
    const { pathname } = request.nextUrl;

    if (!token && pathname.startsWith("/api/users/profile")) {
        return NextResponse.json(
            { message: 'no token provided, access denied' } ,
            { status: 401 }
        );
    }

    // 2. لو فيه توكن وبيحاول يدخل الـ Login أو الـ Register
    if (token && (pathname === "/loginpage" || pathname === "/registerpage")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next(); // كمل الـ request عادي لو مفيش شروط انطبقت
}

// تعديل الـ Matcher ليكون أشمل
export const config = {
    matcher: [
        '/api/users/profile/:path*',
        '/loginpage',
        '/registerpage'
    ],
};