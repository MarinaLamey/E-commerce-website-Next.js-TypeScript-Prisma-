
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";
import { categorySchema } from "@/utils/validationSchema";
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import { UpdateCategoryDto } from "@/utils/dtos";
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 *  @method  GET
 *  @route https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/categories/:id
 *  @desc    Get cagetory products By Page Number
 *  @access  public
 */

export async function GET(
  request: NextRequest,
 { params }: { params: Promise<{ id: string }> }
  ) {
  try{
      // 🔹 unwrap params

   const  {id}  = await params;
const pageNumber =
  Number(request.nextUrl.searchParams.get("pageNumber")) || 1;

    const category = await prisma.category.findUnique({
        where:{id:Number(id)},
        select:{
            id:true,
            name:true,
            imgSrc:true
        }
    })
      if (!category) {
    return NextResponse.json(
      { message: "Category not found" },
      { status: 404 }
    );
  }
  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where: {
        categoryId: category.id,
      },
  skip:PRODUCT_PER_PAGE * (Number(pageNumber) -1),
  take:PRODUCT_PER_PAGE
    }),

    prisma.product.count({
      where: {
        categoryId: category.id,
      },
    })
  ]);
  const categoryProductCount = await prisma.product.count({
      where: {
        categoryId: category.id,
      },
    })
  return NextResponse.json({
  products , 
  categoryProductCount
} , {status:200});

  }catch(error){
    return NextResponse.json( { message: "internal server error" },
      { status: 500 })
  }

  }


  /**
 *  @method  PUT
 *  @route  https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/categories/:id
 *  @desc    update category by id
 *  @access  private //only admin can update category
 */

  export async function PUT(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
    try{
   const {id} = await params;
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 403 }
      )
    }

     const category = await prisma.category.findUnique({
      where:{id: parseInt(id)}
     })
     
        if (!category) {
            return NextResponse.json({ message: 'category not found' }, { status: 404 });
        }
    const body = (await request.json() ) as UpdateCategoryDto;
    const validation =  categorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
    }
     const updateCategory = await prisma.category.update({
      where:{id : parseInt(id)},
      data:{
        name:body.name,
        imgSrc:body.imgSrc
      }
     })
     
     return NextResponse.json(updateCategory, { status: 200 });
    }catch(error){
       return NextResponse.json( { message: "internal server error" },
      { status: 500 })
    }
  }

    /**
 *  @method  DELETE
 *  @route https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/categories/:id
 *  @desc    DELETE category by id
 *  @access  private //only admin can DELETE category
 */

    export async function DELETE(request: NextRequest,
 { params }: { params: Promise<{ id: string }> }){
  
try{
  const {id} =  await params ;
  const user = verifyToken(request);
    if (user === null || user.isAdmin === true) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 403 }
      )
    }

     const category = await prisma.category.findUnique({
      where:{id: parseInt(id)},
      include :{
      products:true
      }
     })
     
        if (!category) {
            return NextResponse.json({ message: 'category not found' }, { status: 404 });
        }

        const productsId : number[]= category?.products.map(pro => pro.id)
    // 🔹 delete user
    await prisma.category.delete({ where: { id: category.id } });
    await prisma.product.deleteMany({
      where:{id:{in:productsId}}
    })
    
    return NextResponse.json(
      { message: "Category has been deleted" },
      { status: 200 }
    );

}catch(error){
    return NextResponse.json( { message: "internal server error" },
      { status: 500 })
}
 }