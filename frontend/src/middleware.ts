import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export async function middleware(req: NextRequest) {
  const token = await getToken({req, secret:process.env.NEXTAUTH_SECRET});
  // Authenticated User will land on /problems page
  if(req.nextUrl.pathname === '/' && token){
    return NextResponse.redirect(new URL('/problems', req.url));
  }

  if(req.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Public routes are open for all
  if(publicRoutes.includes(req.nextUrl.pathname)){
    return NextResponse.next();
  }
  // No token redirect to landing('/')
  if(!token){
    return NextResponse.redirect(new URL('/', req.url));
  }
  // If token then go bro.
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/problems/:path*", '/'],
};

const publicRoutes = [ '/', '/test'];