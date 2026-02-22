    import { NextRequest , NextResponse } from "next/server";
    import { verifyToken } from "@/utils/verifyToken";
    import prisma from "@/lib/db";
    import { ORDERS_PER_PAGE } from "@/utils/constants";

    /**
     *  @method  POST
     *  @route   ~/api/order
     *  @desc    add orders 
     *  @access  private  (Registered users)
     */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json({ message: 'Must Login First' }, { status: 403 });
    }

    const { City, Adress, Phone } = await request.json();

    // 1. Get Cart
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      return NextResponse.json({ message: 'Shopping cart not found' }, { status: 404 });
    }

  //2. get Item to check about stock and Price
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
    }

    // 3. calc total
    const totals = cartItems.reduce(
      (acc, item) => {
        acc.price += item.quantity * item.product.price;
        acc.quantity += item.quantity;
        return acc;
      },
      { price: 0, quantity: 0 }
    );

    // 4. calc shipping 
    let shippingPrice = 50;
    if (totals.price > 2000) {
      shippingPrice = 0;
    } else {
      if (City === "Cairo") {
        shippingPrice = 40;
      } else if (City === "Giza" || City === "Alex") {
        shippingPrice = 60;
      } else {
        shippingPrice = 100;
      }
    }

    const taxPrice = Math.round(totals.price * 0.14 * 100) / 100;
    const grandTotal = Math.round((totals.price + taxPrice + shippingPrice) * 100) / 100;

    

    // check if there stock of product
    //if any method in transaction faild all method will not happen
     const result = await prisma.$transaction(async (tx) => {
      
      for (const item of cartItems) {
        
        if (item.product.stock < item.quantity) {
          throw new Error(`Product ${item.product.name} is out of stock. Available: ${item.product.stock}`);
        }

        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity }
          }
        });
      }

      // creat order
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          totalPrice: totals.price,
          shippingPrice,
          taxPrice,
          grandTotal,
          shippingAddress: Adress,
          phone: Phone,
          items: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
        include: { items: true },
      });

    //delete cartItems
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    });

    return NextResponse.json(result, { status: 201 });

  } catch (error: any) {
    if (error.message.includes("out of stock")) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error("Order Error:", error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}



    /**
     * @method  GET
     * @route  ~/api/order
     * @desc    get orders
     * @access  private (Registered users)
     */

    export async function GET(request: NextRequest) {
    try{
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || 1;
    const user = verifyToken(request);
        if (user === null ) {
        return NextResponse.json(
            { message: 'Must Login First' },
            { status: 401 }
        )
        }
        
        const orderItems = await prisma.order.findMany({
           where: { userId: user.id },
    include: {
        items: {
            include: {
                product: true 
              
            }
        }
    },
    orderBy: { createdAt: 'desc' },
    skip:ORDERS_PER_PAGE * (Number(pageNumber ) -1 ),
    take:ORDERS_PER_PAGE
        })

      

        return NextResponse.json({
        orderItems
        }, { status: 200 });
    }catch(error){
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

    }