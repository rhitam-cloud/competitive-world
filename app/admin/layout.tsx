import React from "react";
import { isAdminAuthenticated } from "@/lib/auth/admin-guard";
import { AdminLockGate } from "@/components/admin/AdminLockGate";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthorized = isAdminAuthenticated();

  if (!isAuthorized) {
    return <AdminLockGate />;
  }

  return <>{children}</>;
}
