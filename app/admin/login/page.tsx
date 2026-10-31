"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldAlert,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuickFill = () => {
    setPassword("admin123");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Incorrect administrator password.");
        setLoading(false);
        return;
      }

      // Success - redirect to admin portal
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Failed to verify password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20 border border-blue-400/30">
            <ShieldAlert className="h-8 w-8 text-amber-300" />
          </div>
        </div>
        <h2 className="text-center text-2xl font-black text-white tracking-tight">
          Admin Security Checkpoint
        </h2>
        <p className="mt-2 text-center text-xs text-slate-400">
          Restricted zone. Authorized instructors and administrators only.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card className="border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-2xl text-slate-100">
          <CardContent className="pt-6 space-y-5">
            {/* Quick Demo Fill Helper */}
            <div className="p-3 bg-blue-950/60 border border-blue-800/60 rounded-xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-blue-200">
                <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Default Master Key: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-300 font-bold">admin123</code>
                </span>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-xs text-blue-400 hover:text-white font-bold underline"
              >
                Auto-fill
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-rose-200 text-xs font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="admin-pass" className="text-slate-300">
                  Master Administrator Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="admin-pass"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter admin password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 h-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-10 shadow-lg shadow-blue-600/30"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Verifying Credentials...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Unlock Admin Console <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <Link
                href="/"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Student Home
              </Link>
              <span className="text-[11px] text-slate-500 font-mono">
                ENV: ADMIN_PASSWORD
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
