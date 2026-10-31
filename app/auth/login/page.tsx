"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Shield, User, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuickLogin = (role: "student" | "admin") => {
    if (role === "student") {
      setEmail("student@competitiveworld.in");
      setPassword("password123");
    } else {
      setEmail("admin@competitiveworld.in");
      setPassword("adminpass123");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to sign in");
      }

      // Route based on role
      if (data.user?.role === "admin" || email.toLowerCase().includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-3">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full shadow-lg border-2 border-amber-400/50 bg-slate-950">
            <Image
              src="/logo.png"
              alt="Competitive World"
              width={64}
              height={64}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
        <h2 className="text-center text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign In to Competitive World
        </h2>
        <p className="mt-2 text-center text-xs text-slate-600">
          Enter any candidate email to sign in or create your own profile.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border border-slate-200/90 shadow-sm bg-white">
          <CardContent className="pt-6">
            {/* Quick Demo Login Personas */}
            <div className="mb-6 bg-blue-50/70 border border-blue-200/60 rounded-xl p-3.5">
              <div className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" /> 1-Click Evaluation Accounts
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("student")}
                  className="bg-white hover:bg-slate-50 border border-blue-200 p-2 rounded-lg text-left text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                >
                  <div className="text-blue-600 font-bold flex items-center gap-1">
                    <User className="w-3 h-3" /> Arjun Sharma Demo
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">student@competitiveworld.in</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin("admin")}
                  className="bg-white hover:bg-slate-50 border border-blue-200 p-2 rounded-lg text-left text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                >
                  <div className="text-purple-600 font-bold flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Admin Staff Demo
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">admin@competitiveworld.in</div>
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Your Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="e.g. rhitam@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold h-10 mt-2"
              >
                {loading ? "Signing in..." : "Sign In to Candidate Console"}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              New candidate?{" "}
              <Link href="/auth/register" className="text-blue-600 font-bold hover:underline">
                Register with your Name &amp; Email
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
