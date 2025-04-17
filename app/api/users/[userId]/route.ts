import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Podaj prawidłowy adres email"),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.id !== params.userId && session.user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const json = await req.json();
    const body = updateUserSchema.parse(json);

    const existingUser = await db.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if email is being changed and if it's already in use
    if (body.email !== existingUser.email) {
      const emailExists = await db.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (emailExists) {
        return new NextResponse(
          JSON.stringify({ message: "Email jest już używany" }),
          { status: 400 }
        );
      }
    }

    const updatedUser = await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}