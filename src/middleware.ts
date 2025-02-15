import {type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isApiRequest = pathname.startsWith(`/api`);
  
  if (isApiRequest) {
    return updateSession(request);
  }

  const locales = routing.locales;

  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  if (!hasLocale) {
    return intlMiddleware(request);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/",
    "/(fr|en)/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
