import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import prisma from "@/lib/db";
import { setCookie } from "@/utils/generateToken";

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }

        const decodedToken = await adminAuth.verifyIdToken(token);
        const { email, name } = decodedToken;

        if (!email) {
            return NextResponse.json({ message: "Email missing" }, { status: 400 });
        }

        // تقسيم الاسم لـ firstName و lastName زي ما الـ Schema محتاجة
        const nameParts = name?.split(" ") || ["User", ""];
        const firstName = nameParts[0] || "User";
        const lastName = nameParts.slice(1).join(" ") || " ";

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    firstName: firstName,
                    lastName: lastName,
                    isAdmin: false,
                    // الباسوورد هيتساب null وده صح في حالتك عشان هو Optional
                },
            });
        }

        // استدعاء setCookie بالبيانات اللي الـ Interface بتاعك مستنيها
        const cookieString = setCookie({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin || false,
            phone: user.phone || "" // حل مشكلة الـ Error: بنبعت قيمة فاضية لو مفيش موبايل
        });

        const response = NextResponse.json(
            { message: "User synced successfully", user },
            { status: 200 }
        );

        response.headers.set("Set-Cookie", cookieString);
        return response;

    } catch (error: any) {
        console.error("Auth Sync Error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}