"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  ShieldCheck,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Flame,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/types";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Check current session
  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
        }
      } catch {}
    }
    checkUser();
  }, [pathname]);

  // Hide top navigation during active examination attempt
  const isTakingExam = pathname.includes("/attempt");
  if (isTakingExam) {
    return null;
  }

  // Clear admin session whenever user clicks to enter Admin (forcing password prompt)
  const handleAdminClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {}
    router.push("/admin");
    router.refresh();
  };

  // Clear admin session whenever user leaves Admin area
  const handleLeaveAdmin = async () => {
    if (pathname.startsWith("/admin")) {
      try {
        await fetch("/api/admin/auth", { method: "DELETE" });
      } catch {}
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      router.push("/auth/login");
      router.refresh();
    } catch {}
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={handleLeaveAdmin}
          className="flex items-center gap-3 group"
        >
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-md group-hover:scale-105 transition-all border border-amber-400/50 bg-slate-950">
            <Image
              src="/logo.png"
              alt="Competitive World Logo"
              width={44}
              height={44}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                Competitive
              </span>
              <span className="text-blue-600 font-extrabold text-xl tracking-tight">
                World
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 -mt-1">
              SSC CGL • CHSL Mock Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            href="/"
            onClick={handleLeaveAdmin}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === "/"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Home
          </Link>

          <Link
            href="/exams"
            onClick={handleLeaveAdmin}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === "/exams"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Browse Exams
          </Link>

          <Link
            href="/exams?filter=tests"
            onClick={handleLeaveAdmin}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname.includes("filter=tests")
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Mock Tests
          </Link>

          <Link
            href="/dashboard"
            onClick={handleLeaveAdmin}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === "/dashboard"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Dashboard
          </Link>

          {/* Admin Portal Link */}
          <button
            onClick={handleAdminClick}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              pathname.startsWith("/admin")
                ? "bg-blue-600 text-white font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>Admin Portal</span>
            <Badge
              variant="outline"
              className={`text-[10px] py-0 px-1 font-bold ${
                pathname.startsWith("/admin")
                  ? "bg-blue-800 text-white border-blue-400"
                  : "text-blue-600 border-blue-200"
              }`}
            >
              Password
            </Badge>
          </button>
        </nav>

        {/* Right CTA / Auth controls */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="h-7 w-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : "C"}
                </div>
                <span className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                  {currentUser.fullName}
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-xs text-slate-500 hover:text-rose-600 h-8"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" /> Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth/login" onClick={handleLeaveAdmin}>
                <Button variant="ghost" size="sm" className="font-semibold text-slate-700">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register" onClick={handleLeaveAdmin}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm">
                  Register Free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          {currentUser && (
            <div className="p-3 bg-blue-50 rounded-lg flex items-center justify-between text-xs font-semibold text-blue-900 mb-2">
              <span>Signed in as <strong>{currentUser.fullName}</strong></span>
              <button onClick={handleSignOut} className="text-rose-600 underline">Sign Out</button>
            </div>
          )}
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => {
                handleLeaveAdmin();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/exams"
              onClick={() => {
                handleLeaveAdmin();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Browse Exams
            </Link>
            <Link
              href="/dashboard"
              onClick={() => {
                handleLeaveAdmin();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Dashboard
            </Link>
            <button
              onClick={handleAdminClick}
              className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 text-left w-full"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-500" />
                <span>Admin Portal</span>
              </span>
              <Badge variant="outline" className="text-[10px] text-blue-600 border-blue-200">
                Password
              </Badge>
            </button>
          </div>
          {!currentUser && (
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-xs">Sign In</Button>
              </Link>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-blue-600 text-xs">Register Free</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
