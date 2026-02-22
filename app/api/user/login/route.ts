import { NextRequest , NextResponse } from "next/server";
import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchema";
import  prisma  from "@/lib/db";
import { setCookie } from "@/utils/generateToken";
import bcrypt from "bcryptjs";


/**
 *  @method  POST
 *  @route   ~/api/user/login
 *  @desc    Login User [(Log In) (Sign In)]
 *  @access  public
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as LoginUserDto;
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (!user) {
            return NextResponse.json(
                { message: 'invalid email or password' },
                { status: 400 }
            )
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: 'invalid email or password' },
                { status: 400 }
            );
        }

        const cookie = setCookie({
              id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            phone:user.phone
        });

        return NextResponse.json(
            { message: 'Authenticated' },
            {
                status: 200,
                headers: { "Set-Cookie": cookie }
            }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }}