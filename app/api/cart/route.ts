import { NextRequest , NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/lib/db";



/**
 * @method  POST
 * @route   ~/api/cart
 * @desc    add to cart or update quantity
 * @access  private
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json(
        { message: 'Must Login First' },
        { status: 403 }
      );
    }

    const { productId, quantity, isUpdate } = await request.json();

    // Guarding
    if (!productId || quantity <= 0) {
      return NextResponse.json(
        { message: 'Invalid product ID or quantity' },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });

    const item = await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: Number(productId),
        },
      },
      update: {
      
        quantity: isUpdate ? Number(quantity) : { increment: Number(quantity) },
      },
      create: {
        cartId: cart.id,
        productId: Number(productId),
        quantity: Number(quantity) || 1,
      },
      include: {
        product: true
      }
    });

    return NextResponse.json({ item }, { status: 200 });

  } catch (error) {
    console.error("Cart API Error:", error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * @method  GET
 * @route   ~/api/cart
 * @desc    get user cart with items
 * @access  private (Registered users)
 */

export async function GET(request: NextRequest) {
try{
const user = verifyToken(request);
    if (user === null ) {
      return NextResponse.json(
        { message: 'Must Login First' },
        { status: 401 }
      )
    }
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true, 
          },
          orderBy: { createdAt: 'desc' }       
        }
      }
    });

  
    if (!cart) {
      return NextResponse.json({ items: [], totalPrice: 0 });
    }
  const cartItem = await prisma.cartItem.findMany({
    where:{cartId : cart.id},
    include :{
    product:true
    }
  }) 
 const totals = cartItem.reduce((acc, item) => {
      acc.price += item.quantity * item.product.price;
      acc.quantity += item.quantity;
      return acc;
    }, { price: 0, quantity: 0 });

    return NextResponse.json({
      items: cartItem,
      totalPrice: totals.price,
      totalQuantity:totals.quantity
    }, { status: 200 });
}catch(error){
return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
}

}