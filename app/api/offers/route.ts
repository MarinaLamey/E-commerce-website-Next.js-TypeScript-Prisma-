import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import { getOffersProduct } from "@/apiCalls/productCalls";


/**
 *  @method  GET
 *  @route ~/api/offers
 *  @desc    Get offers product
 *  @access  public
 */
export async function GET(request: NextRequest) {

     const pageNumber = Number(request.nextUrl.searchParams.get("pageNumber") || "1");
     const categoryId =Number( request.nextUrl.searchParams.get("category") || "1");
       const sort =request.nextUrl.searchParams.get("sort") || "default";

  try {
    const data = await getOffersProduct(pageNumber, categoryId ,sort);
    return NextResponse.json(JSON.parse(JSON.stringify(data)));
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }

}