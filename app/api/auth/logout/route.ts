import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LOCAL_AUTH_COOKIE } from "@/lib/auth/session";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.set(LOCAL_AUTH_COOKIE, "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
