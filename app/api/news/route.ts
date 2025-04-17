import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const newsCreateSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany"),
  description: z.string().min(1, "Opis jest wymagany"),
  content: z.string().optional(),
  imageUrl: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = newsCreateSchema.parse(json);

    const news = await db.news.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        imageUrl: body.imageUrl,
        status: body.status,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    
    const session = await getServerSession(authOptions);
    
    // If user is not admin, only return published news
    if (!session || session.user.role !== "ADMIN") {
      const news = await db.news.findMany({
        where: {
          status: "PUBLISHED",
        },
        orderBy: {
          date: "desc",
        },
      });
      
      return NextResponse.json(news);
    }
    
    // Admin can get all news or filter by status
    const news = await db.news.findMany({
      where: status
        ? {
            status: status as any,
          }
        : undefined,
      orderBy: {
        date: "desc",
      },
    });
    
    return NextResponse.json(news);
  } catch (error) {
    console.error("Error getting news:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}