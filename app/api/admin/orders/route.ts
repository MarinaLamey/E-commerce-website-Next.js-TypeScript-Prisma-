import { NextRequest , NextResponse } from "next/server";
    import { verifyToken } from "@/utils/verifyToken";
    import prisma from "@/lib/db";
import { ORDERS_ADMIN_PER_PAGE } from "@/utils/constants";


export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: 'Access Denied. Admins Only.' },
        { status: 403 } // Forbidden
      );
    }

    const pageNumber = Number(request.nextUrl.searchParams.get("pageNumber")) || 1;
    console.log(pageNumber);

    const allOrders = await prisma.order.findMany({
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true , phone:true }
        },
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: ORDERS_ADMIN_PER_PAGE * (Number(pageNumber) - 1),
      take: ORDERS_ADMIN_PER_PAGE   
    });
    const totalOrders = await prisma.order.count();
    const totalRevenue = await prisma.order.aggregate({
      _sum: { grandTotal: true }
    });
    const avgOrderValue = totalOrders > 0 
      ? (totalRevenue._sum.grandTotal || 0) / totalOrders 
      : 0;
    return NextResponse.json({
      orders: allOrders,
      totalOrders,
     totalRevenue: totalRevenue._sum.grandTotal || 0,
     avgOrderValue: avgOrderValue.toFixed(2)
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
