import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "competitiveworld_admin_auth";

export function isAdminAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return token === "authorized_admin_session";
  } catch {
    return false;
  }
}
