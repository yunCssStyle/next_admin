import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { menuInfo } from '@/common/config';

export default withAuth(function middleware(req) {
  const token = req.nextauth.token;
  const path = req.nextUrl.pathname.split('/')[1];

  let role = menuInfo.find((item) => item.path === path)?.role;

  if ((token && !path) || role?.includes(token?.role as string)) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL('/not-found', req.url));
});

export const config = {
  matcher: ['/((?!login|api|_next/static|_next/image|favicon.ico).*)']
};
