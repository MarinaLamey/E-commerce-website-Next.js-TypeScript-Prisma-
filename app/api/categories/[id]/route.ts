
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";
import { categorySchema } from "@/utils/validationSchema";
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import { UpdateCategoryDto } from "@/utils/dtos";
import { getCategoryProducts } from "@/apiCalls/productCalls";
/**
 *  @method  GET
 *  @route ~/api/categories/:id
 *  @desc    Get cagetory products By Page Number
 *  @access  public
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("pageNumber")) || 1;
  const sort = searchParams.get("sort") || "default";

  try {
    const data = await getCategoryProducts(Number(id), page, sort);
return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
  /**
 *  @method  PUT
 *  @route ~/api/categories/:id
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
 *  @route ~/api/categories/:id
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