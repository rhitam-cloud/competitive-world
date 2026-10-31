import React from "react";
import Link from "next/link";
import { dbRepository } from "@/lib/db/repository";
import { AdminNav } from "@/components/admin/AdminNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  FileQuestion,
  TrendingUp,
  PlusCircle,
  UploadCloud,
  History,
  FolderTree,
  ArrowRight,
} from "lucide-react";
import { formatDurationHuman } from "@/lib/utils";

export const metadata = {
  title: "Admin Overview - Competitive World",
};

export default async function AdminOverviewPage() {
  const stats = await dbRepository.getAdminStats();
  const recentAttempts = await dbRepository.getAllAttempts();
  const mockTests = await dbRepository.getMockTests();

  return (
    <div className="bg-slate-50 min-h-screen">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header with Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Platform Administration Overview
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage Indian competitive examinations, questions bank, marking schemes, and student submissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/questions">
              <Button size="sm" variant="outline" className="font-semibold text-slate-700">
                <PlusCircle className="w-4 h-4 mr-1.5 text-blue-600" /> Add Question
              </Button>
            </Link>
            <Link href="/admin/import">
              <Button size="sm" variant="outline" className="font-semibold text-slate-700">
                <UploadCloud className="w-4 h-4 mr-1.5 text-purple-600" /> Bulk CSV Import
              </Button>
            </Link>
            <Link href="/admin/tests">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                <PlusCircle className="w-4 h-4 mr-1.5" /> Create Mock Test
              </Button>
            </Link>
          </div>
        </div>

        {/* 5 Top Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border border-slate-200/90 shadow-2xs bg-white">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">
                  Students
                </div>
                <div className="text-xl font-black text-slate-900">
                  {stats.totalStudents}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/90 shadow-2xs bg-white">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FolderTree className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">
                  Exams
                </div>
                <div className="text-xl font-black text-slate-900">
                  {stats.totalExams}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/90 shadow-2xs bg-white">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">
                  Mock Tests
                </div>
                <div className="text-xl font-black text-slate-900">
                  {stats.totalMockTests}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/90 shadow-2xs bg-white">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <FileQuestion className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">
                  Questions
                </div>
                <div className="text-xl font-black text-slate-900">
                  {stats.totalQuestions}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/90 shadow-2xs bg-white">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase">
                  Platform Avg
                </div>
                <div className="text-xl font-black text-slate-900">
                  {stats.averageScorePercentage}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Published Mock Tests Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" /> Active Mock Tests on Platform
            </h2>
            <Link href="/admin/tests" className="text-xs text-blue-600 font-semibold hover:underline">
              Manage All Tests &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTests.map((t) => (
              <Card key={t.id} className="border border-slate-200/90 shadow-2xs bg-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 text-[10px]">
                    PUBLISHED
                  </Badge>
                  <span className="text-xs font-semibold text-slate-500">
                    {t.durationMinutes} Mins • {t.totalMarks} Marks
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{t.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-1 mb-3">
                  {t.description}
                </p>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 text-slate-500">
                  <span>Marking: +{t.positiveMarks} / -{t.negativeMarks}</span>
                  <Link href={`/tests/${t.id}`}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600">
                      Preview Console
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Attempts Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-blue-600" /> Recent Student Attempts
            </h2>
            <Link href="/admin/attempts" className="text-xs text-blue-600 font-semibold hover:underline">
              View All Attempts &rarr;
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-3">Attempt ID</th>
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Mock Test</th>
                  <th className="p-3 text-center">Score</th>
                  <th className="p-3 text-center">Accuracy</th>
                  <th className="p-3 text-center">Time</th>
                  <th className="p-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentAttempts.slice(0, 5).map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono text-[11px] text-slate-500">
                      {att.id.substring(0, 12)}...
                    </td>
                    <td className="p-3 font-semibold text-slate-900">
                      {att.candidateName || "Candidate"}
                    </td>
                    <td className="p-3 max-w-xs truncate">{att.mockTestTitle}</td>
                    <td className="p-3 text-center font-bold text-blue-600">
                      {att.totalScore} / {att.maxMarks}
                    </td>
                    <td className="p-3 text-center font-semibold text-emerald-700">
                      {att.accuracyPercentage}%
                    </td>
                    <td className="p-3 text-center text-slate-500">
                      {formatDurationHuman(att.timeSpentSeconds)}
                    </td>
                    <td className="p-3 text-right text-slate-500">
                      {new Date(att.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
