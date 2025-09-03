import { NextResponse } from "next/server";

export function middleware(req) {
    const { pathname } = req.nextUrl;

    const cookies = req.cookies.get("user");
    const user = cookies ? JSON.parse(decodeURIComponent(cookies.value)) : null;

    // Store last visited page
    const response = NextResponse.next();
    response.cookies.set("lastPage", pathname, { path: "/", maxAge: 86400 });

    // Allow unauthenticated users to access the home page
    if (!user) {
        if (pathname === "/login" || pathname === "/") {
            return response; // Allow access
        }
        return NextResponse.redirect(new URL("/login", req.url)); // Redirect others to login
    }

    // Redirect home ("/") to the user's respective dashboard
    if (pathname === "/") {
        if (user.role === "admin") {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
        if (user.role === "doctor") {
            return NextResponse.redirect(new URL("/doctor", req.url));
        }
        if (user.role === "patient") {
            return NextResponse.redirect(new URL("/patient", req.url));
        }
    }

    // Define protected routes
    const doctorRoutes = ["/doctor", "/doctor/profile", "/doctor/appointments", "/doctor/schedule"];
    const patientRoutes = ["/patient", "/patient/patient-bookings", "/patient/profile"];
    const adminRoutes = ["/admin", "/admin/dashboard", "/admin/doctors", "/admin/patients", "/admin/appointments", "/admin/add-patient", "/admin/add-doctor"];

    // Role-based access control
    if (doctorRoutes.includes(pathname) && user.role !== "doctor") {
        return redirectToLastPage(req);
    }
    if (patientRoutes.includes(pathname) && user.role !== "patient") {
        return redirectToLastPage(req);
    }
    if (adminRoutes.includes(pathname) && user.role !== "admin") {
        return redirectToLastPage(req);
    }

    return response;
}

// Helper function to redirect to the last visited page
function redirectToLastPage(req) {
    const lastPage = req.cookies.get("lastPage")?.value || "/"; // Default to last visited or home
    return NextResponse.redirect(new URL(lastPage, req.url));
}

// Apply middleware to protected routes
export const config = {
    matcher: ["/doctor/:path*", "/patient/:path*", "/admin/:path*"], // Protect only role-based pages, allow home page
};
