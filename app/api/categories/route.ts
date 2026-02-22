
    import { NextRequest, NextResponse } from "next/server";
    import prisma from "@/lib/db";
    import { verifyToken } from "@/utils/verifyToken";
    import { categortDto } from "@/utils/dtos";
    import { categorySchema } from './../../../utils/validationSchema';
    import { PRODUCT_PER_PAGE } from "@/utils/constants";

    /**
     *  @method  POST
     *  @route ~/api/categories
     *  @desc    Create New category
     *  @access  private (only admin can add category)
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
        const body = (await request.json() ) as categortDto;
        const validation =  categorySchema.safeParse(body);
        if (!validation.success) {
        return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
        }
        const newCategory = await prisma.category.create({
            data: {
                name:body.name,
                imgSrc:body.imgSrc
            }
        })
                return NextResponse.json(newCategory , {status:201})

        } catch (error) {
            return NextResponse.json(
                { message: 'internal server error' },
                { status: 500 }
            );
        }
    }



    /**
     *  @method  GET
     *  @route  ~/api/categories
     *  @desc    Get categories By Page Number
     *  @access  public
     */
    export async function GET(request: NextRequest) {
        try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
        const allCategories = await prisma.category.findMany()
        const newCategory = await prisma.category.findMany({
        skip: PRODUCT_PER_PAGE * (parseInt(pageNumber) - 1),
        take: PRODUCT_PER_PAGE,
        orderBy: { createdAt: 'desc' }
        });
        const categoriesCount = await prisma.category.count()
       
        return NextResponse.json({
        allCategories ,
        newCategory,
        categoriesCount
        }, { status: 200 });

        } catch (error) {
            return NextResponse.json(
                { message: 'internal server error' },
                { status: 500 }
            );
        }
    }