// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the request is for a file in uploaded-files directory
  if (pathname.startsWith('/uploaded-files/')) {
    // Create a new URL for the API route
    const url = request.nextUrl.clone()
    url.pathname = `/api${pathname}`
    
    // Redirect to the API route
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/uploaded-files/:path*',
}