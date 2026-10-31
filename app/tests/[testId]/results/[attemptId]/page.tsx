import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbRepository } from "@/lib/db/repository";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Timer,
  BarChart3,
  RotateCcw,
  LayoutDashboard,
  ArrowRight,
  Bookmark,
  Award,
  Sparkles,
} from "lucide-react";
import { formatDurationHuman } from "@/lib/utils";
import { ResultsReviewClient } from "./results-review-client";

export const dynamic = "force-dynamic";

export default async function TestResultPage({
  params,
}: {
  params: { testId: string; attemptId: string };
}) {
  const { testId, attemptId } = params;

  const test = await dbRepository.getMockTestById(testId);
  if (!test) {
    notFound();
  }

  let { attempt, reviewItems } = await dbRepository.getTestAttempt(attemptId);
  if (!attempt) {
    // Retry once in case of rapid navigation between workers
    await new Promise((resolve) => setTimeout(resolve, 300));
    const retry = await dbRepository.getTestAttempt(attemptId);
    attempt = retry.attempt;
    reviewItems = retry.reviewItems;
  }

  if (!attempt) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Timer className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Attempt Results Updating</h2>
            <p className="text-xs text-slate-500">
              We couldn't retrieve attempt results for ID <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">{attemptId}</code> immediately. You can view your completed attempts in your candidate dashboard or retry.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/dashboard">
                <Button className="w-full bg-blue-600">Go to Dashboard</Button>
              </Link>
              <Link href={`/tests/${testId}`}>
                <Button variant="outline" className="w-full">Return to Test Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const scorePercentage =
    attempt.maxMarks > 0
      ? Number(((attempt.totalScore / attempt.maxMarks) * 100).toFixed(1))
      : 0;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 flex items-center justify-between text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800">Exam Results</span>
          </div>
          <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200">
            Official Score Finalized
          </Badge>
        </div>

        {/* 1. TOP RESULT HERO SCORECARD */}
        <Card className="border border-slate-200 shadow-md bg-white overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Performance Scorecard
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
                  {test.title}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  Completed on {new Date(attempt.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Total Score Circle Banner */}
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black shadow-lg">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Total Marks Scored
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    {attempt.totalScore}{" "}
                    <span className="text-sm font-semibold text-slate-300">
                      / {attempt.maxMarks}
                    </span>
                  </div>
                  <div className="text-xs text-amber-300 font-bold mt-0.5">
                    {scorePercentage}% Aggregate Score
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50 border-t border-slate-200 text-center">
            {/* Correct */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct
              </div>
              <div className="text-2xl font-black text-slate-900">
                {attempt.correctCount}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                +{(attempt.correctCount * test.positiveMarks).toFixed(1)} Marks
              </div>
            </div>

            {/* Incorrect */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-700 font-bold mb-1">
                <XCircle className="w-4 h-4 text-rose-600" /> Incorrect
              </div>
              <div className="text-2xl font-black text-slate-900">
                {attempt.incorrectCount}
              </div>
              <div className="text-[11px] text-rose-700 font-semibold mt-0.5">
                -{(attempt.incorrectCount * test.negativeMarks).toFixed(1)} Penalty
              </div>
            </div>

            {/* Accuracy */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-center gap-1.5 text-xs text-blue-700 font-bold mb-1">
                <Award className="w-4 h-4 text-blue-600" /> Accuracy
              </div>
              <div className="text-2xl font-black text-slate-900">
                {attempt.accuracyPercentage}%
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                {attempt.correctCount + attempt.incorrectCount} Attempted
              </div>
            </div>

            {/* Time Taken */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 font-bold mb-1">
                <Timer className="w-4 h-4 text-slate-500" /> Time Taken
              </div>
              <div className="text-2xl font-black text-slate-900">
                {formatDurationHuman(attempt.timeSpentSeconds)}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Limit: {test.durationMinutes}m
              </div>
            </div>
          </div>
        </Card>

        {/* 2. SUBJECT-WISE BREAKDOWN TABLE */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" /> Section-wise Performance Analysis
          </h2>
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <tr>
                    <th className="p-3.5">Section Name</th>
                    <th className="p-3.5 text-center">Total Qs</th>
                    <th className="p-3.5 text-center">Attempted</th>
                    <th className="p-3.5 text-center text-emerald-600">Correct</th>
                    <th className="p-3.5 text-center text-rose-600">Incorrect</th>
                    <th className="p-3.5 text-center">Accuracy</th>
                    <th className="p-3.5 text-right">Marks Scored</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {Object.values(attempt.subjectBreakdown).map((sub) => (
                    <tr key={sub.subjectCode} className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-semibold text-slate-900">
                        {sub.subjectName}
                      </td>
                      <td className="p-3.5 text-center">{sub.totalQuestions}</td>
                      <td className="p-3.5 text-center">{sub.attempted}</td>
                      <td className="p-3.5 text-center font-bold text-emerald-600">
                        {sub.correct}
                      </td>
                      <td className="p-3.5 text-center font-bold text-rose-600">
                        {sub.incorrect}
                      </td>
                      <td className="p-3.5 text-center font-semibold">
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            sub.accuracyPercentage >= 75
                              ? "bg-emerald-50 text-emerald-700"
                              : sub.accuracyPercentage >= 50
                              ? "bg-amber-50 text-amber-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {sub.accuracyPercentage}%
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-bold text-slate-900">
                        {sub.score} / {sub.maxMarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. QUESTION-BY-QUESTION SOLUTIONS & EXPLANATIONS */}
        <ResultsReviewClient reviewItems={reviewItems} testId={testId} />

        {/* Bottom Actions */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <Link href="/dashboard">
            <Button variant="outline" className="font-semibold text-slate-700">
              <LayoutDashboard className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Link href={`/tests/${testId}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                <RotateCcw className="w-4 h-4 mr-2" /> Retake Mock Test
              </Button>
            </Link>
            <Link href="/exams">
              <Button variant="secondary" className="font-semibold">
                Browse Next Mock <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
