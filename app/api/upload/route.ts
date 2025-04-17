// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";

// Set body size limit for file uploads
export const config = {
  api: {
    // Disable default body parser for file uploads
    bodyParser: false,
    // Increase size limit for files (5MB)
    responseLimit: '5mb',
  },
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return new NextResponse("Invalid file type", { status: 400 });
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new NextResponse("File too large (max 5MB)", { status: 400 });
    }

    // Create directory if it doesn't exist
    const uploadDir = join(process.cwd(), "public", "uploaded-files");
    
    try {
      // Check if directory exists and create it if not
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }
    } catch (dirError) {
      console.error("Error creating directory:", dirError);
      return new NextResponse("Error creating upload directory", { status: 500 });
    }

    // Generate unique filename
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    try {
      // Convert file to buffer and save it
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
    } catch (writeError) {
      console.error("Error writing file:", writeError);
      return new NextResponse("Error saving file", { status: 500 });
    }

    // Return URL to saved file - use new API route pattern
    const fileUrl = `/api/uploaded-files/${fileName}`;
    console.log("File successfully uploaded:", fileUrl);

    return NextResponse.json({ url: fileUrl }, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new NextResponse(`Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}