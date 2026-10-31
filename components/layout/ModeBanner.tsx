"use client";

import React, { useState } from "react";
import { Info, Sparkles, Shield, User, X } from "lucide-react";
import Link from "next/link";

export function ModeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-2 px-4 border-b border-indigo-700/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-300">
            Platform Ready:
          </span>
          <span className="text-slate-200">
            Running with preloaded SSC CGL & CHSL question bank, interactive timer engine, and full scoring.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-amber-300 hover:text-amber-200 underline font-medium flex items-center gap-1"
          >
            <Shield className="w-3 h-3" /> Quick Test Accounts
          </Link>
          <span className="text-slate-500">|</span>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
