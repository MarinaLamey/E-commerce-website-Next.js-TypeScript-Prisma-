import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateProductDto } from "@/utils/dtos";


/**
 *  @method  GET
 *  @route https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/products/:id
 *  @desc    Get  product By id
 *  @access  public
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  
  try {
    const  id  = (await params).id;
  
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id:true,
        name: true,
        imgSrc: true,
        description: true,
        price: true,
        stock: true,
        userId:true,
        categoryId: true,
        isOffer: true,
      
      },
    });
     if (!product) {
    return NextResponse.json(
      { message: "product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({product} , {status:200})
 }catch {
        return NextResponse.json(
    { message: "Invalid or missing request body" },
    { status: 400 }) 
  }
}


  /**
 *  @method  PUT
 *  @route  https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/products/:id
 *  @desc    update product
 *  @access  private //only admin can update product
 */

  export async function PUT(request: NextRequest,
   { params }: { params: Promise<{ id: string }> }
){
  try{ 
    const {id} = await params;
    console.log(params)
      const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 403 }
      )
    }
    const product = await prisma.product.findUnique({
      where:{id:  parseInt(id)}
    })
     if (!product) {
    return NextResponse.json(
      { message: "product not found" },
      { status: 404 }
    );}

    const body = (await request.json() )as UpdateProductDto;

   
     const updatedProduct = await prisma.product.update({
      where:{id: parseInt(id)},
      data:{
        name:body.name,
        description:body.description,
        imgSrc:body.imgSrc,
        price:body.price,
        userId:user.id,
        categoryId:body.categoryId,
        stock:body.stock,
     
        isOffer:body.isOffer

      }
     })   

  return NextResponse.json( updatedProduct  , { status: 200 });
  }catch (error) {
  console.error(error);
  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}

  }


    /**
 *  @method  DELETE
 *  @route https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/products/:id
 *  @desc    update product
 *  @access  private //only admin can delete product
 */


    export async function DELETE(request:NextRequest , { params }: { params: Promise<{ id: string }> } ){
    try{
   const {id} = await params ;
          const user = verifyToken(request);
    if (user === null || user.isAdmin === true) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 403 }
      )
    }
    const product = await prisma.product.findUnique({
      where:{id:  parseInt(id)}
    })
     if (!product) {
    return NextResponse.json(
      { message: "product not found" },
      { status: 404 }
    );}
     await prisma.product.delete({ where: { id: product.id } });

    return NextResponse.json(
      { message: "product has been deleted" },
      { status: 200 }
    );

    }catch(error){
      return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
    }
    }