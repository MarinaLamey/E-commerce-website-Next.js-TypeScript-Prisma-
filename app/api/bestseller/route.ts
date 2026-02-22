import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { PRODUCT_PER_PAGE } from "@/utils/constants";



/**
 *  @method  GET
 *  @route  https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/bestseller
 *  @desc    Get best seller
 *  @access  public
 */
export async function GET(request: NextRequest) {
    try {
     const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    const products = await prisma.product.findMany({
     where:{ isBestseller : true},
      skip: PRODUCT_PER_PAGE * (parseInt(pageNumber) - 1),
      take: PRODUCT_PER_PAGE,
      orderBy: { createdAt: 'desc' }
    });
   const ProductsCount = await prisma.product.count({
    where:{isBestseller:true}
   })
   
    return NextResponse.json({products , ProductsCount} ,{ status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        );
    }
}