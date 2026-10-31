"use client";

import React from "react";
import Image from "next/image";
import { Clock, AlertTriangle, Send } from "lucide-react";
import { formatTimeRemaining } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SubjectCode } from "@/types";

interface ExamHeaderProps {
  testTitle: string;
  timeRemainingSeconds: number;
  totalDurationSeconds: number;
  currentSection: SubjectCode;
  sectionCounts: Record<SubjectCode, { total: number; answered: number }>;
  onSelectSection: (section: SubjectCode) => void;
  onSubmitClick: () => void;
}

export function ExamHeader({
  testTitle,
  timeRemainingSeconds,
  totalDurationSeconds,
  currentSection,
  sectionCounts,
  onSelectSection,
  onSubmitClick,
}: ExamHeaderProps) {
  const isCriticalTime = timeRemainingSeconds <= 300; // 5 minutes remaining
  const isWarningTime = timeRemainingSeconds <= 600 && !isCriticalTime; // 10 minutes

  const sections: { code: SubjectCode; label: string }[] = [
    { code: "REASONING", label: "Reasoning" },
    { code: "QUANTITATIVE", label: "Quantitative" },
    { code: "ENGLISH", label: "English" },
    { code: "AWARENESS", label: "GK / GS" },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top bar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-amber-400/40 bg-slate-950">
            <Image
              src="/logo.png"
              alt="Competitive World"
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold text-slate-100 truncate max-w-md md:max-w-xl">
              {testTitle}
            </h1>
            <span className="text-[11px] text-slate-400">
              Competitive World • TCS Exam Console
            </span>
          </div>
        </div>

        {/* Timer & Submit */}
        <div className="flex items-center gap-3">
          {/* Live Countdown Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-sm md:text-base font-bold shadow-inner ${
              isCriticalTime
                ? "bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse"
                : isWarningTime
                ? "bg-amber-950/80 border-amber-600 text-amber-300"
                : "bg-slate-800 border-slate-700 text-emerald-400"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Time Left: {formatTimeRemaining(timeRemainingSeconds)}</span>
          </div>

          {/* Submit Test Button */}
          <Button
            onClick={onSubmitClick}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Submit Test</span>
            <span className="sm:hidden">Submit</span>
          </Button>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="px-4 py-1.5 bg-slate-950/60 overflow-x-auto flex items-center gap-2 text-xs">
        <span className="text-slate-400 font-semibold mr-1 hidden sm:inline">
          Sections:
        </span>
        {sections.map((sec) => {
          const isSelected = currentSection === sec.code;
          const counts = sectionCounts[sec.code] || { total: 0, answered: 0 };
          return (
            <button
              key={sec.code}
              onClick={() => onSelectSection(sec.code)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{sec.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected
                    ? "bg-blue-800 text-blue-100"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {counts.answered}/{counts.total}
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
