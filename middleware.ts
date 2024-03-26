import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/((?!api|_next/static|_next/image~|.*\\.png$).*)'],
}

// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import { NextResponse } from "next/server";
// import { i18n } from "./i18n-config";

// export default NextAuth(authConfig).auth;
 
// const locales = i18n.locales;
 
// // Get the preferred locale, similar to the above or using a library
// //function getLocale(request:any) { ... }
 
// export function middleware(request:any) {
//   // Check if there is any supported locale in the pathname
//   const { pathname } = request.nextUrl
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   )
 
//   if (pathnameHasLocale) return
  
//   // Redirect if there is no locale
//   const locale = 'es'
//   request.nextUrl.pathname = `/${locale}${pathname}`
//   // e.g. incoming request is /products
//   // The new URL is now /en-US/products
//   return NextResponse.redirect(request.nextUrl)
// }

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image~|.*\\.png$).*)'],
// };