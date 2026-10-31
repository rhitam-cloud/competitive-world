import { UserProfile, UserRole } from "@/types";
import { cookies } from "next/headers";
import { isSupabaseConfigured } from "../supabase/client";
import { getSupabaseServerClient } from "../supabase/server";
import { dbRepository } from "../db/repository";

export const LOCAL_AUTH_COOKIE = "competitiveworld_session_user";

/**
 * Gets the current active user profile:
 * 1. From Supabase Auth if Supabase credentials are configured.
 * 2. Or from the secure session cookie `competitiveworld_session_user`.
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  // If Supabase is connected, attempt Supabase Auth first
  if (isSupabaseConfigured()) {
    try {
      const supabase = await getSupabaseServerClient();
      if (supabase) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profile) {
            return {
              id: profile.id,
              email: profile.email,
              fullName: profile.full_name,
              role: profile.role,
              targetExam: profile.target_exam,
              avatarUrl: profile.avatar_url,
              createdAt: profile.created_at,
            };
          }
        }
      }
    } catch (err) {
      console.warn("Supabase auth check error, falling back to local session:", err);
    }
  }

  // Check the active session cookie
  try {
    const cookieStore = cookies();
    const rawSession = cookieStore.get(LOCAL_AUTH_COOKIE)?.value;
    if (rawSession) {
      const user = JSON.parse(decodeURIComponent(rawSession)) as UserProfile;
      if (user && user.id && user.fullName) {
        return user;
      }
    }
  } catch (err: unknown) {
    if ((err as { digest?: string })?.digest === "DYNAMIC_SERVER_USAGE") {
      throw err;
    }
    console.error("Error parsing user session cookie:", err);
  }

  return null;
}

/**
 * Checks if the user is an administrator
 */
export async function requireAdmin(): Promise<UserProfile | null> {
  const user = await getCurrentUser();
  if (user && user.role === "admin") {
    return user;
  }
  return null;
}
