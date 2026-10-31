import React from "react";
import Link from "next/link";
import { dbRepository } from "@/lib/db/repository";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Timer,
  Search,
  BookOpen,
  Award,
  ChevronRight,
  Filter,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { ExamsClientFilter } from "./client-filter";

export const metadata = {
  title: "Available Competitive Exams & Mock Tests - Competitive World",
  description:
    "Explore full-length online mock tests for SSC CGL and SSC CHSL. Filter by exam type, question count, and duration.",
};

export default async function ExamsPage() {
  const exams = await dbRepository.getExams();
  const mockTests = await dbRepository.getMockTests();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200 mb-2 font-semibold">
            SSC Exam Catalog
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Competitive Exam Mock Tests
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            Practice with timed mock tests designed strictly according to the latest syllabus and marking schemes for Staff Selection Commission examinations.
          </p>
        </div>

        {/* Client-side search and filters */}
        <ExamsClientFilter exams={exams} initialTests={mockTests} />
      </div>
    </div>
  );
}
