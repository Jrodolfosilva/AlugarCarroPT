

import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from "jwt-decode";
import { TokenType } from './utils/types';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // LOGIN COM token comum
  if (url === "/login") {
    const token = request.cookies.get("token")?.value;

    if (token) {
      const isToken = JSON.parse(token).access;
      const decoded: TokenType = jwtDecode(isToken);

      if (decoded.user_id === 1) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // ROTAS PROTEGIDAS DO /panel/gestao
  if (
    url.startsWith("/panel/gestao") &&
    request.cookies.has("token")
  ) {
    const token = request.cookies.get("token")?.value;
    const isToken = JSON.parse(token).access;
    const decoded: TokenType = jwtDecode(isToken);

    if (decoded.user_id !== 1) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }

  // ROTAS PROTEGIDAS DO /admin/*
  if (url.startsWith("/admin")) {
    const tokenAdmin = request.cookies.get("tokenAdmin")?.value;

    if (!tokenAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    const isToken = JSON.parse(tokenAdmin).access;
    const decoded: TokenType = jwtDecode(isToken);

    if (decoded.user_id !== 1) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/panel/gestao/:path*',
    '/admin/:path*',
  ],
};
