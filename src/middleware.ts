import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Check if the request is for an admin route
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Skip authentication for the login page
        if (request.nextUrl.pathname === "/admin/login") {
            return NextResponse.next();
        }

        // Check for admin authentication cookie
        const adminAuth = request.cookies.get("admin_auth");
        if (!adminAuth) {
            // Redirect to admin login if not authenticated
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
