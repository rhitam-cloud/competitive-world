import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/admin-guard";

// Default admin credentials (can be customized via .env.local)
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const targetPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

    // Validate password
    if (password !== targetPassword) {
      return NextResponse.json(
        { success: false, error: "Incorrect administrator password. Access denied." },
        { status: 401 }
      );
    }

    // Set strict session-only cookie (cleared when session ends / tab closes)
    const cookieStore = cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, "authorized_admin_session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // No long maxAge: expires automatically when leaving or browser session ends
    });

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Authentication server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return NextResponse.json({ success: true, message: "Logged out of admin console" });
}
