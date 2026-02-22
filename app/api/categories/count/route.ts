import prisma from "@/lib/db";
import { NextRequest , NextResponse } from "next/server";



/**
 *  @method  GET
 *  @route  ~/api/categories/count
 *  @desc    Get categories count
 *  @access  public
 */

export async function GET(request:NextRequest ){
    try{
    const count = await prisma.category.count();
    return NextResponse.json({count}, {status:200})
    }catch(error){
        return NextResponse.json({message:"internal server error"} , {status:500})
    }
}