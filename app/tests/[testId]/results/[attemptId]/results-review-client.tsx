"use client";

import React, { useState, useMemo } from "react";
import { QuestionReviewItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface ResultsReviewClientProps {
  reviewItems: QuestionReviewItem[];
  testId: string;
}

type FilterType = "all" | "correct" | "incorrect" | "unattempted" | "review";

export function ResultsReviewClient({ reviewItems }: ResultsReviewClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const correctCount = reviewItems.filter((i) => i.isCorrect).length;
  const incorrectCount = reviewItems.filter(
    (i) => i.userSelectedOption !== null && !i.isCorrect
  ).length;
  const unattemptedCount = reviewItems.filter(
    (i) => i.userSelectedOption === null
  ).length;
  const reviewCount = reviewItems.filter((i) => i.isMarkedForReview).length;

  const filteredItems = useMemo(() => {
    switch (activeFilter) {
      case "correct":
        return reviewItems.filter((i) => i.isCorrect);
      case "incorrect":
        return reviewItems.filter(
          (i) => i.userSelectedOption !== null && !i.isCorrect
        );
      case "unattempted":
        return reviewItems.filter((i) => i.userSelectedOption === null);
      case "review":
        return reviewItems.filter((i) => i.isMarkedForReview);
      case "all":
      default:
        return reviewItems;
    }
  }, [reviewItems, activeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" /> Question-by-Question Solution Review
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Analyze every answer option, review verified explanations, and understand mistakes.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFilter === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All ({reviewItems.length})
          </button>

          <button
            onClick={() => setActiveFilter("correct")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              activeFilter === "correct"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-emerald-700 border border-slate-200 hover:bg-emerald-50"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Correct ({correctCount})
          </button>

          <button
            onClick={() => setActiveFilter("incorrect")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              activeFilter === "incorrect"
                ? "bg-rose-600 text-white shadow-sm"
                : "bg-white text-rose-700 border border-slate-200 hover:bg-rose-50"
            }`}
          >
            <XCircle className="w-3.5 h-3.5" /> Incorrect ({incorrectCount})
          </button>

          <button
            onClick={() => setActiveFilter("unattempted")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              activeFilter === "unattempted"
                ? "bg-slate-700 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Skipped ({unattemptedCount})
          </button>

          {reviewCount > 0 && (
            <button
              onClick={() => setActiveFilter("review")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                activeFilter === "review"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-white text-purple-700 border border-slate-200 hover:bg-purple-50"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" /> Review ({reviewCount})
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredItems.map((item, index) => {
          const isSkipped = item.userSelectedOption === null;
          return (
            <div
              key={item.questionId}
              className={`bg-white rounded-xl border p-5 sm:p-6 shadow-2xs transition-all ${
                item.isCorrect
                  ? "border-emerald-200"
                  : isSkipped
                  ? "border-slate-200"
                  : "border-rose-200"
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">
                    Q{index + 1}.
                  </span>
                  <Badge variant="outline" className="font-semibold text-slate-700">
                    {item.subjectName}
                  </Badge>
                  <span className="text-slate-400 font-medium">{item.topic}</span>
                  {item.isMarkedForReview && (
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-[10px]">
                      Marked for Review
                    </Badge>
                  )}
                </div>

                {/* Score Status */}
                <div>
                  {item.isCorrect ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> +{item.marksAwarded} Marks
                    </span>
                  ) : isSkipped ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
                      <HelpCircle className="w-3.5 h-3.5" /> 0 Marks (Unanswered)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-xs">
                      <XCircle className="w-3.5 h-3.5" /> {item.marksAwarded} Penalty
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-slate-900 font-medium text-sm sm:text-base leading-relaxed mb-5 whitespace-pre-line">
                {item.questionText}
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 text-xs sm:text-sm">
                {item.options.map((opt) => {
                  const isUserSelection = item.userSelectedOption === opt.id;
                  const isCorrectAnswer = item.correctOption === opt.id;

                  let cardStyle = "border-slate-200 bg-white text-slate-700";
                  let badge = null;

                  if (isCorrectAnswer) {
                    cardStyle =
                      "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold ring-1 ring-emerald-500/20";
                    badge = (
                      <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded ml-auto">
                        Correct Answer
                      </span>
                    );
                  } else if (isUserSelection && !item.isCorrect) {
                    cardStyle =
                      "border-rose-500 bg-rose-50/70 text-rose-950 font-semibold";
                    badge = (
                      <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded ml-auto">
                        Your Choice (Wrong)
                      </span>
                    );
                  }

                  return (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-lg border-2 flex items-start gap-2.5 ${cardStyle}`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isCorrectAnswer
                            ? "bg-emerald-600 text-white"
                            : isUserSelection
                            ? "bg-rose-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{opt.text}</span>
                      {badge}
                    </div>
                  );
                })}
              </div>

              {/* Step-by-Step Educational Explanation */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Step-by-Step Explanation:</span>
                </div>
                <div className="whitespace-pre-line text-slate-600 pl-5 border-l-2 border-blue-400">
                  {item.explanation}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
