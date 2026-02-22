import { NextResponse  , NextRequest} from "next/server";
import { cookies } from "next/headers";

/**
 *  @method  GET
 *  @route   https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/user/logout
 *  @desc    Logout User
 *  @access  public
 */

export async function GET(request:NextRequest) {
  try{
  (await cookies()).delete("jwtToken")
  return NextResponse.json({ message: 'logout' }, { status: 200 });
  }catch(error){
    return NextResponse.json({messege:'internal server error' },
      {status:500}
    )
  }
}