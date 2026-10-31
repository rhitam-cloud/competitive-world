import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth/session";
import { dbRepository } from "@/lib/db/repository";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  CheckCircle2,
  Award,
  Timer,
  BarChart3,
  ArrowRight,
  TrendingUp,
  BookOpen,
  User,
  History,
  Target,
  LogOut,
} from "lucide-react";
import { formatDurationHuman } from "@/lib/utils";
import { DashboardSignOutButton } from "./signout-button";

export const metadata = {
  title: "Candidate Dashboard - Competitive World",
  description:
    "Track your personal SSC CGL and CHSL mock test attempts, accuracy percentage, and test history.",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  // If candidate is not signed in, redirect to login
  if (!user) {
    redirect("/auth/login?redirect=/dashboard");
  }

  const attempts = await dbRepository.getUserAttempts(user.id);
  const availableTests = await dbRepository.getMockTests();

  const testsCompleted = attempts.length;
  const bestScore =
    attempts.length > 0
      ? Math.max(...attempts.map((a) => a.totalScore))
      : 0;

  const avgScore =
    attempts.length > 0
      ? Number(
          (
            attempts.reduce((acc, a) => acc + a.totalScore, 0) / attempts.length
          ).toFixed(1)
        )
      : 0;

  const avgAccuracy =
    attempts.length > 0
      ? Number(
          (
            attempts.reduce((acc, a) => acc + a.accuracyPercentage, 0) /
            attempts.length
          ).toFixed(1)
        )
      : 0;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Hero Banner */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-extrabold text-2xl shadow-md shadow-blue-500/20">
              {user.fullName ? user.fullName[0].toUpperCase() : "C"}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Welcome back, {user.fullName}!
                </h1>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs font-bold">
                  {user.targetExam || "SSC CGL Aspirant"}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Logged in as <strong>{user.email}</strong> • Practice with full-length mocks to sharpen your speed.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/exams">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm">
                <BookOpen className="w-4 h-4 mr-2" /> Start Mock Test
              </Button>
            </Link>
            <DashboardSignOutButton />
          </div>
        </div>

        {/* 4 Key Performance Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="border border-slate-200/90 shadow-2xs bg-white">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Tests Completed
                </div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">
                  {testsCompleted}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                  Recorded in your profile
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/90 shadow-2xs bg-white">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Highest Score
                </div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">
                  {bestScore} <span className="text-xs text-slate-400">/ 40</span>
                </div>
                <div className="text-[11px] text-amber-600 font-semibold mt-0.5">
                  Personal Best
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/90 shadow-2xs bg-white">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Average Score
                </div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">
                  {avgScore} <span className="text-xs text-slate-400">marks</span>
                </div>
                <div className="text-[11px] text-purple-600 font-semibold mt-0.5">
                  Across your attempts
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/90 shadow-2xs bg-white">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Overall Accuracy
                </div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">
                  {avgAccuracy}%
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                  Accuracy rate
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Attempts History Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" /> Your Test Attempts
            </h2>
            <span className="text-xs text-slate-500">
              Showing {attempts.length} evaluated attempt(s)
            </span>
          </div>

          {attempts.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-sm">No attempts yet under this account</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Attempt your first free mock test to view detailed scorecards and personalized percentile analysis.
              </p>
              <Link href="/exams">
                <Button size="sm" className="bg-blue-600 text-white">
                  Browse Available Tests
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="p-3.5">Mock Test Title</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5 text-center">Score</th>
                      <th className="p-3.5 text-center">Accuracy</th>
                      <th className="p-3.5 text-center">Time Spent</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {attempts.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-semibold text-slate-900 max-w-xs truncate">
                          {att.mockTestTitle || "SSC Mock Test"}
                        </td>
                        <td className="p-3.5 text-slate-500 text-xs">
                          {new Date(att.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-3.5 text-center font-extrabold text-blue-600">
                          {att.totalScore} / {att.maxMarks}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold">
                            {att.accuracyPercentage}%
                          </span>
                        </td>
                        <td className="p-3.5 text-center text-slate-500 text-xs">
                          {formatDurationHuman(att.timeSpentSeconds)}
                        </td>
                        <td className="p-3.5 text-right">
                          <Link
                            href={`/tests/${att.mockTestId}/results/${att.id}`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs h-8 text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              View Solutions <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Recommended Tests */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" /> Recommended Practice Tests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTests.slice(0, 2).map((test) => (
              <Card key={test.id} className="bg-white border border-slate-200/90 shadow-2xs">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="free">FREE</Badge>
                      <span className="text-xs text-slate-500 font-semibold">
                        {test.durationMinutes} Mins
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      {test.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {test.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-semibold">
                      {test.questionCount} Questions • {test.totalMarks} Marks
                    </span>
                    <Link href={`/tests/${test.id}`}>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs font-bold">
                        Start Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
