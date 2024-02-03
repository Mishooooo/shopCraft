import { getToken } from 'next-auth/jwt';
import {  NextResponse } from 'next/server';

export default async function middleware (req) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;


  if (isAuthenticated && req.nextUrl.pathname.startsWith("/auth/")) {
    return  NextResponse.redirect(new URL("/", req.url));
  }
  if (!isAuthenticated && req.nextUrl.pathname.startsWith("/user-page/")) {
    return  NextResponse.redirect(new URL("/", req.url));
  }


}

