
    import { NextRequest, NextResponse } from "next/server";
    import prisma from "@/lib/db";
    import { redis } from "@/lib/redis/redis";
    import { verifyToken } from "@/utils/verifyToken";
    import { categortDto } from "@/utils/dtos";
    import { categorySchema } from './../../../utils/validationSchema';
    import { PRODUCT_PER_PAGE } from "@/utils/constants";
    import { getAllCategories } from "@/apiCalls/categoriesCalls";
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
           const patterns = [
                  
                    "Categories:*"
                ];
        
                const keysToClear = await Promise.all(
                    patterns.map(pattern => redis.keys(pattern))
                );
        
                const finalKeys = keysToClear.flat();
        
                if (finalKeys.length > 0) {
                    await redis.del(...finalKeys);
                    console.log(`🧹 Cache cleared: ${finalKeys.length} keys removed.`);
                }
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
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("pageNumber")) || 1;
  try {
    const data = await getAllCategories(page);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}