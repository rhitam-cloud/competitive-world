"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, CheckCircle2, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [targetExam, setTargetExam] = useState("SSC CGL");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, targetExam, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Registration failed");
      }

      // Immediately navigate to personalized student dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
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
          Create Your Candidate Account
        </h2>
        <p className="mt-2 text-center text-xs text-slate-600">
          Enter your details to track your own mock test attempts, scores, and percentile.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border border-slate-200/90 shadow-sm bg-white">
          <CardContent className="pt-6">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Rhitam Roy"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1"
                />
              </div>

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
                <Label htmlFor="exam">Target Examination</Label>
                <select
                  id="exam"
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="mt-1 flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <option value="SSC CGL">SSC CGL (Combined Graduate Level)</option>
                  <option value="SSC CHSL">SSC CHSL (10+2 Higher Secondary)</option>
                  <option value="BOTH">Both SSC CGL &amp; CHSL</option>
                </select>
              </div>

              <div>
                <Label htmlFor="password">Password (Minimum 6 characters)</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Free instant access. Your attempts will be saved under your name.</span>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold h-10 mt-2"
              >
                {loading ? "Creating Profile..." : "Create Account & Go to Dashboard"}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
