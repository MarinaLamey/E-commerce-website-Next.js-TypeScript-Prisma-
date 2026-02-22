import prisma from "@/lib/db";
import { NextRequest , NextResponse } from "next/server";



/**
 *  @method  GET
 *  @route  https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/categoryProducts/count
 *  @desc    Get categories count
 *  @access  public
 */

export async function GET( request: NextRequest,
 { params }: { params: Promise<{ id: string }> } ){
    try{
    const count = await prisma.category.count();
    return NextResponse.json({count}, {status:200})
    }catch(error){
        return NextResponse.json({message:"internal server error"} , {status:500})
    }
}