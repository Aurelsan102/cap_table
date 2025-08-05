import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes publiques
  if (pathname === "/" || pathname === "/login") {
    return NextResponse.next();
  }

  // Vérifier l'authentification pour les routes protégées
  const authToken = request.cookies.get("captable_auth_user");

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = JSON.parse(authToken.value);

    // Vérifier les permissions selon le rôle
    if (pathname.startsWith("/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/shareholder") && user.role !== "shareholder") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch {
    // Token invalide
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/shareholder/:path*", "/login"],
};
