"use client";

import React from "react";
import { PaletteStatus, PublicQuestion } from "@/types";
import { User, Check, Bookmark } from "lucide-react";
import { getPaletteColor } from "@/lib/utils";

interface QuestionPaletteProps {
  questions: PublicQuestion[];
  currentIndex: number;
  questionStatuses: PaletteStatus[];
  onSelectQuestion: (index: number) => void;
  candidateName?: string;
  candidateExam?: string;
}

export function QuestionPalette({
  questions,
  currentIndex,
  questionStatuses,
  onSelectQuestion,
  candidateName = "Arjun Sharma",
  candidateExam = "SSC CGL Aspirant",
}: QuestionPaletteProps) {
  // Aggregate stats
  const answeredCount = questionStatuses.filter(
    (s) => s === "answered" || s === "answered_and_marked"
  ).length;
  const unansweredCount = questionStatuses.filter((s) => s === "unanswered").length;
  const reviewCount = questionStatuses.filter(
    (s) => s === "marked_for_review" || s === "answered_and_marked"
  ).length;
  const notVisitedCount = questionStatuses.filter((s) => s === "not_visited").length;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden text-xs">
      {/* Candidate Profile Box */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-sm">
          <User className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-slate-900 text-sm truncate">
            {candidateName}
          </div>
          <div className="text-[11px] text-slate-500 font-medium truncate">
            {candidateExam}
          </div>
        </div>
      </div>

      {/* Legend & Stats Counter Grid */}
      <div className="p-3.5 bg-slate-50/50 border-b border-slate-200 grid grid-cols-2 gap-2 text-[11px]">
        {/* Answered */}
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600 text-white font-bold">
            {answeredCount}
          </span>
          <span className="text-slate-700 font-medium">Answered</span>
        </div>

        {/* Not Answered */}
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-600 text-white font-bold">
            {unansweredCount}
          </span>
          <span className="text-slate-700 font-medium">Not Answered</span>
        </div>

        {/* Marked for Review */}
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-600 text-white font-bold">
            {reviewCount}
          </span>
          <span className="text-slate-700 font-medium">Marked for Review</span>
        </div>

        {/* Not Visited */}
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-200 text-slate-700 font-bold border border-slate-300">
            {notVisitedCount}
          </span>
          <span className="text-slate-700 font-medium">Not Visited</span>
        </div>
      </div>

      {/* Section Title */}
      <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider text-[10px]">
        Question Palette ({questions.length} Questions)
      </div>

      {/* Question Number Palette Grid */}
      <div className="flex-1 p-3.5 overflow-y-auto">
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, idx) => {
            const status = questionStatuses[idx] || "not_visited";
            const isCurrent = idx === currentIndex;
            const style = getPaletteColor(status);

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion(idx)}
                className={`exam-palette-btn relative flex h-10 w-full items-center justify-center rounded-lg font-bold text-xs border transition-all ${
                  style.bg
                } ${
                  isCurrent
                    ? "ring-2 ring-blue-600 ring-offset-1 font-extrabold shadow-md scale-105"
                    : "border-slate-300/80"
                }`}
                title={`Question ${idx + 1} (${style.label})`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
