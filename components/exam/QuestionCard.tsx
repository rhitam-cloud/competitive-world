"use client";

import React, { useEffect } from "react";
import { PublicQuestion, QuestionOptionId } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { getSubjectDisplayName } from "@/lib/utils";

interface QuestionCardProps {
  question: PublicQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedOption: QuestionOptionId | null;
  isMarkedForReview: boolean;
  onSelectOption: (optionId: QuestionOptionId) => void;
  onClearResponse: () => void;
  onToggleMarkForReview: () => void;
  onPrevious: () => void;
  onSaveAndNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedOption,
  isMarkedForReview,
  onSelectOption,
  onClearResponse,
  onToggleMarkForReview,
  onPrevious,
  onSaveAndNext,
  hasPrevious,
  hasNext,
}: QuestionCardProps) {
  // Keyboard shortcut listener (A, B, C, D or 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing when typing in an input field
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key === "A" || key === "1") onSelectOption("A");
      if (key === "B" || key === "2") onSelectOption("B");
      if (key === "C" || key === "3") onSelectOption("C");
      if (key === "D" || key === "4") onSelectOption("D");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelectOption]);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-3.5 bg-slate-50/80 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 text-base">
            Question {questionIndex + 1}
          </span>
          <span className="text-slate-400 font-medium">of {totalQuestions}</span>
          <span className="text-slate-300">|</span>
          <Badge variant="outline" className="text-xs bg-white text-blue-700 border-blue-200 font-semibold">
            {getSubjectDisplayName(question.subjectCode)}
          </Badge>
          <Badge variant="secondary" className="text-xs capitalize text-slate-600">
            {question.topic}
          </Badge>
        </div>

        {/* Marking Scheme Tags */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            +{question.positiveMarks} Correct
          </span>
          <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            -{question.negativeMarks} Wrong
          </span>
        </div>
      </div>

      {/* Question Body */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        <div className="text-slate-900 text-base md:text-lg font-medium leading-relaxed whitespace-pre-line select-text">
          {question.questionText}
        </div>

        {/* 4 Options Grid */}
        <div className="space-y-3 pt-2">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectOption(opt.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600/30"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white"
                }`}
              >
                {/* Option Identifier circle */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 border border-slate-300"
                  }`}
                >
                  {opt.id}
                </div>

                {/* Option Text */}
                <div className="flex-1 text-slate-800 text-sm md:text-base pt-0.5 leading-relaxed">
                  {opt.text}
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Examination Action Bar */}
      <div className="px-6 py-4 bg-slate-50/90 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Left actions: Mark for review & Clear response */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onToggleMarkForReview}
            className={`font-semibold border-purple-300 text-purple-700 hover:bg-purple-50 ${
              isMarkedForReview ? "bg-purple-100 text-purple-900 border-purple-400" : ""
            }`}
          >
            <Bookmark className="w-4 h-4 mr-1.5" />
            {isMarkedForReview ? "Marked for Review" : "Mark for Review"}
          </Button>

          {selectedOption && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClearResponse}
              className="text-slate-500 hover:text-rose-600 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Clear Response
            </Button>
          )}
        </div>

        {/* Right navigation actions: Previous, Save & Next */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="font-medium text-slate-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={onSaveAndNext}
            className="bg-blue-600 hover:bg-blue-700 font-semibold px-5"
          >
            {hasNext ? (
              <>
                Save & Next <ChevronRight className="w-4 h-4 ml-1" />
              </>
            ) : (
              "Save Response"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
