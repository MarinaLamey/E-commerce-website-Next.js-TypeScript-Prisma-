import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";



export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    
  cookieStore.delete("jwtToken");

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