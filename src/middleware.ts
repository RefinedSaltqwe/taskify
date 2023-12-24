import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"],
  afterAuth(auth, req) {
    //? If user is logged in and goes to the landing page -- redirect to select-org
    if (auth.userId && auth.isPublicRoute) {
      let path = "select-org";

      //? If organization has been selected already -- redirect back to organization
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }
    //? If user is not logged in AND attempt to access a private route -- redirect to sign-in page
    if (!auth.userId && !auth.isPublicRoute) {
      //? After user has signed in -- redirect to the private page the user was trying to access
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    //? If the user is logged in but has not selected an oganization AND not in select-org page -- force them to create or select one first
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
