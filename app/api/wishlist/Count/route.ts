import prisma from "@/lib/db";
import { NextRequest , NextResponse } from "next/server";



/**
 *  @method  GET
 *  @route ~/api/wishlist/count
 *  @desc    Get wishlist count
 *  @access  public
 */

export async function GET(request:NextRequest ){
    try{
    const count = await prisma.wishlist.count();
    return NextResponse.json({count}, {status:200})
    }catch(error){
        return NextResponse.json({message:"internal server error"} , {status:500})
    }
}