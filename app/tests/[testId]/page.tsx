import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbRepository } from "@/lib/db/repository";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Timer,
  Award,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Play,
  RotateCcw,
} from "lucide-react";
import { TestStartAction } from "./start-action";

export const dynamic = "force-dynamic";

export default async function TestDetailsPage({
  params,
}: {
  params: { testId: string };
}) {
  const { testId } = params;
  const test = await dbRepository.getMockTestById(testId);

  if (!test) {
    notFound();
  }

  const exam = await dbRepository.getExamBySlug(test.examId);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/exams" className="hover:text-blue-600">Mock Tests</Link>
          <span>/</span>
          <span className="text-slate-800">{test.title}</span>
        </div>

        {/* Test Overview Card */}
        <Card className="border border-slate-200 shadow-sm mb-6 bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <Badge className="bg-blue-600 text-white font-bold text-xs">
                {exam?.title || "Staff Selection Commission"}
              </Badge>
              <Badge variant="free">100% FREE MOCK</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {test.title}
            </h1>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed max-w-2xl">
              {test.description}
            </p>
          </div>

          <CardContent className="p-6">
            {/* 4 Core Examination Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center mb-8">
              <div>
                <div className="text-xs text-slate-500 font-medium">Duration</div>
                <div className="text-xl font-extrabold text-blue-600 mt-1 flex items-center justify-center gap-1">
                  <Timer className="w-4 h-4" />
                  {test.durationMinutes} Mins
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 font-medium">Questions</div>
                <div className="text-xl font-extrabold text-slate-900 mt-1">
                  {test.questionCount} Qs
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 font-medium">Max Marks</div>
                <div className="text-xl font-extrabold text-emerald-600 mt-1">
                  {test.totalMarks}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 font-medium">Negative Mark</div>
                <div className="text-xl font-extrabold text-rose-600 mt-1">
                  -{test.negativeMarks}
                </div>
              </div>
            </div>

            {/* Subject Distribution */}
            <div className="mb-8">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" /> Subject & Section Distribution
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Section</th>
                      <th className="p-3 text-center">Questions</th>
                      <th className="p-3 text-center">Marks/Q</th>
                      <th className="p-3 text-center">Negative</th>
                      <th className="p-3 text-right">Max Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">General Intelligence & Reasoning</td>
                      <td className="p-3 text-center">5</td>
                      <td className="p-3 text-center text-emerald-600 font-semibold">+2.0</td>
                      <td className="p-3 text-center text-rose-600 font-semibold">-0.5</td>
                      <td className="p-3 text-right font-bold text-slate-900">10.0</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Quantitative Aptitude</td>
                      <td className="p-3 text-center">5</td>
                      <td className="p-3 text-center text-emerald-600 font-semibold">+2.0</td>
                      <td className="p-3 text-center text-rose-600 font-semibold">-0.5</td>
                      <td className="p-3 text-right font-bold text-slate-900">10.0</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">English Language</td>
                      <td className="p-3 text-center">5</td>
                      <td className="p-3 text-center text-emerald-600 font-semibold">+2.0</td>
                      <td className="p-3 text-center text-rose-600 font-semibold">-0.5</td>
                      <td className="p-3 text-right font-bold text-slate-900">10.0</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">General Awareness</td>
                      <td className="p-3 text-center">5</td>
                      <td className="p-3 text-center text-emerald-600 font-semibold">+2.0</td>
                      <td className="p-3 text-center text-rose-600 font-semibold">-0.5</td>
                      <td className="p-3 text-right font-bold text-slate-900">10.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* General Examination Instructions */}
            <div className="mb-8 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Official Exam Instructions
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc pl-5">
                {test.instructions.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
                <li>Each multiple-choice question has four alternatives, of which only one is correct.</li>
                <li>Your countdown timer will begin the moment you click &quot;I Am Ready to Begin&quot;.</li>
                <li>Unsaved selections will not be scored. Click &quot;Save &amp; Next&quot; to ensure your response is recorded.</li>
              </ul>
            </div>

            {/* Candidate Declaration & Start CTA */}
            <TestStartAction testId={test.id} durationMinutes={test.durationMinutes} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
