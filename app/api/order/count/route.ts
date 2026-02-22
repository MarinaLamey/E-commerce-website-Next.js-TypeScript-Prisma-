import prisma from "@/lib/db";
import { NextRequest , NextResponse } from "next/server";
   import { verifyToken } from "@/utils/verifyToken";


/**
 *  @method  GET
 *  @route  https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/order/count
 *  @desc    Get order count
 *  @access  private
 */

export async function GET(request:NextRequest ){
    try{
        const user = verifyToken(request);
                if (user === null ) {
                return NextResponse.json(
                    { message: 'Must Login First' },
                    { status: 403 }
                )
                }
    const count = await prisma.order.count({
                 where: { userId: user.id },
        
    
    });
    return NextResponse.json(count, {status:200})
    }catch(error){
        return NextResponse.json({message:"internal server error"} , {status:500})
    }
}