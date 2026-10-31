"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          Reset Password
        </h2>
        <p className="mt-2 text-center text-xs text-slate-600">
          Enter your candidate email to receive secure password recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border border-slate-200/90 shadow-sm bg-white">
          <CardContent className="pt-6">
            {submitted ? (
              <div className="text-center py-4 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Check your email</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  If an account exists for <strong>{email}</strong>, a password reset link has been dispatched.
                </p>
                <Link href="/auth/login" className="inline-block mt-4">
                  <Button variant="outline" size="sm">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Registered Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="aspirant@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 font-bold h-10 mt-2"
                >
                  Send Password Reset Instructions
                </Button>

                <div className="pt-2 text-center">
                  <Link
                    href="/auth/login"
                    className="text-xs text-slate-500 hover:text-slate-800 font-semibold inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
