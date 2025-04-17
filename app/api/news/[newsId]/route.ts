import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const newsUpdateSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany").optional(),
  description: z.string().min(1, "Opis jest wymagany").optional(),
  content: z.string().optional(),
  imageUrl: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { newsId: string } }    
) {
  try {
    console.log("Route params:", params);
    console.log("newsId from params:", params.newsId);
    
    if (!params.newsId) {
      return new NextResponse("Missing newsId parameter", { status: 400 });
    }

    const newsItem = await db.news.findUnique({
      where: {
        id: params.newsId,
      },
    });

    if (!newsItem) {
      return new NextResponse("News not found", { status: 404 });
    }


    if (newsItem.status !== "PUBLISHED") {
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== "ADMIN") {
        return new NextResponse("Not authorized", { status: 403 });
      }
    }

    return NextResponse.json(newsItem);
  } catch (error) {
    console.error("Error getting news item:", error);
    return new NextResponse(`Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { newsId: string } }
) {
  try {
    
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = newsUpdateSchema.parse(json);

    if (!params.newsId) {
      return new NextResponse("Missing newsId parameter", { status: 400 });
    }

    const existingNews = await db.news.findUnique({
      where: {
        id: params.newsId,
      },
    });

    if (!existingNews) {
      return new NextResponse("News not found", { status: 404 });
    }

    const updatedNews = await db.news.update({
      where: {
        id: params.newsId,
      },
      data: {
        title: body.title !== undefined ? body.title : existingNews.title,
        description: body.description !== undefined ? body.description : existingNews.description,
        content: body.content !== undefined ? body.content : existingNews.content,
        imageUrl: body.imageUrl !== undefined ? body.imageUrl : existingNews.imageUrl,
        status: body.status || existingNews.status,
      },
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error("Error updating news:", error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    
    return new NextResponse(`Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { newsId: string } }
) {
  try {
    // Debug log
    console.log("DELETE - Route params:", params);
    
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.newsId) {
      return new NextResponse("Missing newsId parameter", { status: 400 });
    }

    const existingNews = await db.news.findUnique({
      where: {
        id: params.newsId,
      },
    });

    if (!existingNews) {
      return new NextResponse("News not found", { status: 404 });
    }

    await db.news.delete({
      where: {
        id: params.newsId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting news:", error);
    return new NextResponse(`Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}