"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Exam, MockTest } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { BookOpen, Plus, Timer, Eye, Settings, ShieldCheck } from "lucide-react";

interface TestManagerClientProps {
  initialTests: MockTest[];
  exams: Exam[];
}

export function TestManagerClient({
  initialTests,
  exams,
}: TestManagerClientProps) {
  const [tests, setTests] = useState<MockTest[]>(initialTests);
  const [open, setOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [examId, setExamId] = useState(exams[0]?.id || "exam-ssc-cgl");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [positiveMarks, setPositiveMarks] = useState(2.0);
  const [negativeMarks, setNegativeMarks] = useState(0.5);
  const [totalMarks, setTotalMarks] = useState(40);
  const [questionCount, setQuestionCount] = useState(20);
  const [description, setDescription] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTest: MockTest = {
      id: `test-${Date.now()}`,
      examId,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description:
        description.trim() ||
        "Comprehensive full mock test following standard TCS exam pattern.",
      durationMinutes: Number(durationMinutes),
      totalMarks: Number(totalMarks),
      positiveMarks: Number(positiveMarks),
      negativeMarks: Number(negativeMarks),
      isFree: true,
      priceInr: 0,
      isPublished: true,
      instructions: [
        "Read all questions carefully.",
        "Total time will be counted down automatically.",
        `Marking scheme: +${positiveMarks} for correct, -${negativeMarks} for incorrect.`,
      ],
      questionCount: Number(questionCount),
      createdAt: new Date().toISOString(),
    };

    setTests([newTest, ...tests]);
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 font-bold text-xs">
              <Plus className="w-4 h-4 mr-1.5" /> Create New Mock Test
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Mock Test</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3 pt-2 text-xs">
              <div>
                <Label htmlFor="test-title">Mock Test Title</Label>
                <Input
                  id="test-title"
                  required
                  placeholder="e.g. SSC CGL 2026 Tier 1 - Mock 02"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="exam-select">Target Examination</Label>
                <select
                  id="exam-select"
                  value={examId}
                  onChange={(e) => setExamId(e.target.value)}
                  className="mt-1 flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  {exams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.title} ({exam.tier})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="duration">Duration (Minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min={15}
                    max={180}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="qcount">Question Count</Label>
                  <Input
                    id="qcount"
                    type="number"
                    min={5}
                    max={100}
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="pos-marks">Correct (+)</Label>
                  <Input
                    id="pos-marks"
                    type="number"
                    step="0.25"
                    value={positiveMarks}
                    onChange={(e) => setPositiveMarks(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="neg-marks">Wrong (-)</Label>
                  <Input
                    id="neg-marks"
                    type="number"
                    step="0.25"
                    value={negativeMarks}
                    onChange={(e) => setNegativeMarks(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tot-marks">Max Marks</Label>
                  <Input
                    id="tot-marks"
                    type="number"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="test-desc">Description</Label>
                <textarea
                  id="test-desc"
                  rows={2}
                  placeholder="Overview of this mock test..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 flex w-full rounded-md border border-slate-300 bg-white p-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Publish Mock Test
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tests.map((test) => (
          <Card key={test.id} className="border border-slate-200/90 shadow-2xs bg-white p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 text-xs font-bold">
                  ACTIVE
                </Badge>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-blue-600" />
                  {test.durationMinutes} Mins
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">{test.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                {test.description}
              </p>
            </div>

            <div>
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center text-xs mb-3">
                <div>
                  <div className="text-[10px] text-slate-400">Total Qs</div>
                  <div className="font-bold text-slate-800">{test.questionCount}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Marking</div>
                  <div className="font-bold text-slate-800">+{test.positiveMarks} / -{test.negativeMarks}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Max Score</div>
                  <div className="font-bold text-emerald-600">{test.totalMarks}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-400 font-mono">ID: {test.id}</span>
                <Link href={`/tests/${test.id}`}>
                  <Button variant="outline" size="sm" className="h-8 text-xs text-blue-600 border-blue-200 hover:bg-blue-50">
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview Test
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
