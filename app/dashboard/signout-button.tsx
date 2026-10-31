"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function DashboardSignOutButton() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/auth/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSignOut}
      disabled={loggingOut}
      className="text-xs font-semibold text-slate-700 hover:text-rose-600 hover:border-rose-300"
    >
      <LogOut className="w-3.5 h-3.5 mr-1" />
      {loggingOut ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
