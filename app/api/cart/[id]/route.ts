  import { NextRequest, NextResponse } from "next/server";
  import { verifyToken } from "@/utils/verifyToken";
  import prisma from "@/lib/db";
  import { redis } from "@/lib/redis/redis";
  import { CartItem } from "@/app/generated/prisma";
  interface Props {
    params: Promise<{ id: string }>;
  }

  /**
     * @method  DELETE
     * @route   ~/api/cart/[id]
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
    await redis.del(`cart:${user.id}`);
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



