import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/lib/db";
import { redis } from "@/lib/redis/redis";
import { CartItem } from "@/app/generated/prisma";

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
        { message: "Must Login First" },
        { status: 403 },
      );
    }

    const { productId, quantity, isUpdate } = await request.json();

    // Guarding
    if (!productId || quantity <= 0) {
      return NextResponse.json(
        { message: "Invalid product ID or quantity" },
        { status: 400 },
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
        product: true,
      },
    });
    //delete oldDataFrom redis
    const cacheKey = `cart:${user.id}`;
    await redis.del(cacheKey);
    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    console.error("Cart API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
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
  try {
    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json(
        { message: "Must Login First" },
        { status: 401 },
      );
    }
    const cacheKey = `cart:${user.id}`;

    // 1 Ask Redis first
    const cachedCart = await redis.get(cacheKey);
    if (cachedCart) {
      const data =
        typeof cachedCart === "string" ? JSON.parse(cachedCart) : cachedCart;
      return NextResponse.json({ result: data }, { status: 200 });
    }
    // 1 Ask Redis first

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!cart) {
      const emptyCart = { items: [], totalPrice: 0, totalQuantity: 0 };
      await redis.set(cacheKey, emptyCart, { ex: 3600 });
      return NextResponse.json({ items: [], totalPrice: 0 });
    }
    const cartItem = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: {
        product: true,
      },
    });
    const totals = cartItem.reduce(
      (acc, item) => {
        acc.price += item.quantity * item.product.price;
        acc.quantity += item.quantity;
        return acc;
      },
      { price: 0, quantity: 0 },
    );

    const result = {
      items: cartItem,
      totalPrice: totals.price,
      totalQuantity: totals.quantity,
    };
    await redis.set(cacheKey, result, { ex: 3600 });
    return NextResponse.json(
      {
        result,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
