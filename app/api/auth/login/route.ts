import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbRepository } from "@/lib/db/repository";
import { LOCAL_AUTH_COOKIE } from "@/lib/auth/session";
import { DEMO_USERS } from "@/lib/db/mock-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check existing user in repository
    let user = await dbRepository.getUserByEmail(cleanEmail);

    // 2. If user doesn't exist, check demo users or create profile for them on first login
    if (!user) {
      const demoMatch = DEMO_USERS.find((d) => d.email.toLowerCase() === cleanEmail);
      if (demoMatch) {
        user = demoMatch;
      } else {
        // Derive name from email (e.g. "rhitam@gmail.com" -> "Rhitam")
        const namePart = cleanEmail.split("@")[0].replace(/[._-]/g, " ");
        const formattedName = namePart
          .split(" ")
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        user = await dbRepository.registerUser({
          email: cleanEmail,
          fullName: formattedName || "Candidate",
          targetExam: "SSC CGL",
          role: cleanEmail.includes("admin") ? "admin" : "student",
        });
      }
    }

    // Set user session cookie (valid for 30 days)
    const cookieStore = cookies();
    cookieStore.set(LOCAL_AUTH_COOKIE, encodeURIComponent(JSON.stringify(user)), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (err: any) {
    console.error("Login failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to sign in." },
      { status: 500 }
    );
  }
}
