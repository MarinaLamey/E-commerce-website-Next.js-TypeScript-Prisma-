
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";
import { productDto } from './../../../utils/dtos';
import { productSchema } from "@/utils/validationSchema";
import { PRODUCT_PER_PAGE } from "@/utils/constants";
/**
 *  @method  POST
 *  @route  https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/products
 *  @desc    Create New product
 *  @access  private (only admin can add product)
 */
export async function POST(request: NextRequest) {
    try {
     const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 403 }
      )
    }
    const body = (await request.json() ) as productDto;

     const validation =  productSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
    }
    const newProduct = await prisma.product.create({
        data: {
            name:body.name,
            imgSrc:body.imgSrc,
            description:body.description,
            price:Number(body.price),
            stock:Number(body.stock),
            categoryId:Number(body.categoryId),
            userId:user.id,
            isOffer:body.isOffer,
            isBestseller:body.isBestseller
        }
    })
            return NextResponse.json(newProduct , {status:201})

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        );
    }
}

/**
 *  @method  GET
 *  @route  http://localhost:3000/api/products
 *  @desc    Get categories By Page Number
 *  @access  public
 */
export async function GET(request: NextRequest) {
    try {
     const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    const products = await prisma.product.findMany({
      skip: PRODUCT_PER_PAGE * (parseInt(pageNumber) - 1),
      take: PRODUCT_PER_PAGE,
      orderBy: { createdAt: 'desc' }
    });

    //return Response.json(articles, { status: 200 })
    return NextResponse.json(products, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        );
    }
}