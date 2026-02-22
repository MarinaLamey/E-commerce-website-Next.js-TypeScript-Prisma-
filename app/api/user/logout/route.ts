import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";



export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    cookieStore.set("jwtToken", "", {
      path: "/",
      expires: new Date(0),
      httpOnly: true,
      secure: true,        
      sameSite: "lax",
    });

    return NextResponse.json(
      { message: 'logout successful' }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 }
    );
  }
}