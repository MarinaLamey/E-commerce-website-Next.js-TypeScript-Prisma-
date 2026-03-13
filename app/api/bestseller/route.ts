import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import { getBestellerProduct } from "@/apiCalls/productCalls";


/**
 *  @method  GET
 *  @route  ~/api/bestseller
 *  @desc    Get best seller
 *  @access  public
 */
// app/api/products/bestseller/route.ts

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("pageNumber")) || 1;
  const sort = searchParams.get("sort") || "default";

  try {
    const data = await getBestellerProduct(page, sort);
    return NextResponse.json(JSON.parse(JSON.stringify(data)));
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}