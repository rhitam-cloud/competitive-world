import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbRepository } from "@/lib/db/repository";
import { LOCAL_AUTH_COOKIE } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, targetExam = "SSC CGL" } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "Full Name and Email are required." },
        { status: 400 }
      );
    }

    // Register user in repository
    const newUser = await dbRepository.registerUser({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      targetExam,
      role: "student",
    });

    // Set user session cookie (valid for 30 days)
    const cookieStore = cookies();
    cookieStore.set(LOCAL_AUTH_COOKIE, encodeURIComponent(JSON.stringify(newUser)), {
      httpOnly: false, // accessible to client for greeting & exam console
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: newUser,
    });
  } catch (err: any) {
    console.error("Registration failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create candidate account." },
      { status: 500 }
    );
  }
}
