"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Exam, MockTest } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Timer,
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";

interface ExamsClientFilterProps {
  exams: Exam[];
  initialTests: MockTest[];
}

export function ExamsClientFilter({
  exams,
  initialTests,
}: ExamsClientFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedExamId, setSelectedExamId] = useState<string>("all");
  const [freeOnly, setFreeOnly] = useState<boolean>(false);

  const filteredTests = useMemo(() => {
    return initialTests.filter((test) => {
      // Exam category filter
      if (selectedExamId !== "all" && test.examId !== selectedExamId) {
        return false;
      }
      // Free only filter
      if (freeOnly && !test.isFree) {
        return false;
      }
      // Keyword search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = test.title.toLowerCase().includes(query);
        const matchesDesc = test.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }
      return true;
    });
  }, [initialTests, selectedExamId, freeOnly, search]);

  return (
    <div className="space-y-6">
      {/* Search and Filters Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search mock tests by topic, year..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white text-sm"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedExamId("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedExamId === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Examinations
          </button>
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => setSelectedExamId(exam.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedExamId === exam.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {exam.category} {exam.tier.includes("Tier") ? exam.title.split(" ")[1] : exam.title}
            </button>
          ))}

          <button
            onClick={() => setFreeOnly(!freeOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ml-auto md:ml-2 border ${
              freeOnly
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            Free Mocks Only
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
        <span>Showing {filteredTests.length} mock tests available</span>
        <span>Marking Scheme: +2.0 / -0.5</span>
      </div>

      {/* Mock Tests Grid */}
      {filteredTests.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            No mock tests match your filter
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try clearing your search query or selecting &quot;All Examinations&quot; to see available tests.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch("");
              setSelectedExamId("all");
              setFreeOnly(false);
            }}
            className="mt-4"
          >
            Reset All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card
              key={test.id}
              className="border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:border-blue-300 group bg-white"
            >
              <CardContent className="p-6 flex flex-col h-full justify-between">
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={test.isFree ? "free" : "pro"}>
                      {test.isFree ? "FREE TEST" : `PRO (₹${test.priceInr})`}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5 text-blue-600" />
                      {test.durationMinutes} Mins
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {test.description}
                  </p>
                </div>

                <div>
                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center text-xs mb-4">
                    <div>
                      <div className="text-[10px] text-slate-400">Questions</div>
                      <div className="font-extrabold text-slate-800 mt-0.5">
                        {test.questionCount}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Total Marks</div>
                      <div className="font-extrabold text-slate-800 mt-0.5">
                        {test.totalMarks}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Negative</div>
                      <div className="font-extrabold text-rose-600 mt-0.5">
                        -{test.negativeMarks}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/tests/${test.id}`} className="block">
                    <Button
                      className={`w-full font-bold text-xs h-9 ${
                        test.isFree
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {test.isFree ? (
                        <>
                          Start Test <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 mr-1" /> Unlock Pro Test
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
