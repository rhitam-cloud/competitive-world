"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Play, ShieldCheck, CheckSquare, Square } from "lucide-react";

interface TestStartActionProps {
  testId: string;
  durationMinutes: number;
}

export function TestStartAction({
  testId,
  durationMinutes,
}: TestStartActionProps) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [starting, setStarting] = useState(false);

  const handleStart = () => {
    if (!agreed) return;
    setStarting(true);
    // Clear any previous cached attempt session for this test
    if (typeof window !== "undefined") {
      localStorage.removeItem(`competitiveworld_attempt_${testId}`);
      localStorage.removeItem(`examprep_attempt_${testId}`);
    }
    router.push(`/tests/${testId}/attempt`);
  };

  return (
    <div className="pt-4 border-t border-slate-200">
      {/* Declaration Checkbox */}
      <div
        onClick={() => setAgreed(!agreed)}
        className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors mb-6"
      >
        <button
          type="button"
          className="mt-0.5 text-blue-600 focus:outline-none"
          aria-label="Agree to terms"
        >
          {agreed ? (
            <CheckSquare className="w-5 h-5 text-blue-600" />
          ) : (
            <Square className="w-5 h-5 text-slate-400" />
          )}
        </button>
        <div className="text-xs text-slate-700 leading-relaxed select-none">
          <strong>Candidate Declaration:</strong> I have read and understood all instructions regarding duration ({durationMinutes} minutes), negative marking (-0.5 marks), and navigation. I declare that I will attempt this test under genuine exam conditions.
        </div>
      </div>

      {/* Start Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Full TCS Exam Simulation Ready</span>
        </div>

        <Button
          onClick={handleStart}
          disabled={!agreed || starting}
          size="lg"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 h-12 shadow-md shadow-blue-500/20"
        >
          {starting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Initializing Exam Console...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Play className="w-4 h-4 fill-white" /> I Am Ready to Begin
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
