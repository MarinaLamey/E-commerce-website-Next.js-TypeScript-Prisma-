import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/lib/db";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * @method  DELETE
 * @route   https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/cart/[id]
 * @desc    Delete specific item from cart
 */
export async function DELETE(request: NextRequest ,{ params }: { params: Promise<{ id: string }> }) {
  try {
   const {id} =  await params ;
   const itemId = Number(id);
   if (isNaN(itemId)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json({ message: 'Must Login First' }, { status: 401 });
    }
  
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: Number(id) },
      include: { cart: true }
    });

    if (!cartItem) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }


    await prisma.cartItem.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ message: "Item removed from cart" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}




/**
 * @method  PATCH
 * @route   https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/cart/[id]
 * @desc    Delete specific item from cart
 */

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const { quantity } = await request.json();     
    const user = verifyToken(request);

    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const updatedItem = await prisma.cartItem.update({
      where: { id: Number(id) },
      data: { 
        quantity: Number(quantity) 
      }
    });

    return NextResponse.json({ message: "Quantity updated", data: updatedItem });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating quantity' }, { status: 500 });
  }
}