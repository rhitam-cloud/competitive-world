"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  FolderTree,
  FileQuestion,
  UploadCloud,
  Users,
  ShieldCheck,
  Lock,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [locking, setLocking] = useState(false);

  const links = [
    { label: "Overview", href: "/admin", icon: BarChart3 },
    { label: "Manage Exams", href: "/admin/exams", icon: FolderTree },
    { label: "Mock Tests", href: "/admin/tests", icon: BookOpen },
    { label: "Question Bank", href: "/admin/questions", icon: FileQuestion },
    { label: "Bulk CSV Import", href: "/admin/import", icon: UploadCloud },
    { label: "Student Attempts", href: "/admin/attempts", icon: Users },
  ];

  const handleLockConsole = async () => {
    setLocking(true);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.refresh();
      router.push("/admin");
    } catch {
      setLocking(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-400/40 bg-slate-950">
            <Image
              src="/logo.png"
              alt="Competitive World"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">
                Instructor &amp; Admin Console
              </span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px]">
                Unlocked
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Links and Lock Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Horizontal Navigation Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-bold shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <link.icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Lock Console / Logout Action */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleLockConsole}
            disabled={locking}
            className="h-8 text-xs font-semibold bg-slate-800/80 hover:bg-rose-950/80 hover:text-rose-200 hover:border-rose-700 text-slate-300 border-slate-700 ml-2"
            title="Lock administrator console and return to password gate"
          >
            <Lock className="w-3.5 h-3.5 mr-1 text-amber-400" />
            <span>{locking ? "Locking..." : "Lock Console"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
