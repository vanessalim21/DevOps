import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  // console.log(sessionClaims)
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Jika pengguna memiliki peran, lakukan redirect ke halaman yang sesuai
//   if (role) {
//     const matchedRoute = matchers.find((matcher) => matcher.matcher(req));
//     if (matchedRoute && matchedRoute.allowedRoles.includes(role)) {
//       return NextResponse.redirect(new URL(`/${role}`, req.url));
//     }
//   }

  // Jika pengguna tidak memiliki peran atau tidak memiliki akses ke rute, lakukan tindakan lain
  // Misalnya, redirect ke halaman login atau halaman error
  // ... logika untuk menangani pengguna tanpa peran atau akses yang tidak diizinkan

  // Contoh: Redirect ke halaman login jika tidak memiliki akses
//   return NextResponse.redirect(new URL("/", req.url));

//   for (const { matcher, allowedRoles } of matchers) {
//       if (matcher(req) && !allowedRoles.includes(role!)) {
//         return NextResponse.redirect(new URL(`/${role}`, req.url));
//       }
//   }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
