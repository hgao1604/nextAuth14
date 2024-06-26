import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import {
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggingIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggingIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggingIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
