"use client";

import React, { useState } from "react";
import { Exam } from "@/types";
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
import { FolderTree, Plus, CheckCircle2, BookOpen } from "lucide-react";

export function ExamManagerClient({ initialExams }: { initialExams: Exam[] }) {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [open, setOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [tier, setTier] = useState("Tier 1 & Tier 2");
  const [description, setDescription] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newExam: Exam = {
      id: `exam-${Date.now()}`,
      slug,
      title: title.trim(),
      description: description.trim() || "National examination series.",
      category: "SSC",
      tier,
      isPublished: true,
      totalMockTests: 0,
      createdAt: new Date().toISOString(),
    };

    setExams([newExam, ...exams]);
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
              <Plus className="w-4 h-4 mr-1.5" /> Add New Examination
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Examination</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="exam-title">Examination Name</Label>
                <Input
                  id="exam-title"
                  required
                  placeholder="e.g. SSC CPO SI"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="exam-tier">Applicable Tiers / Stages</Label>
                <Input
                  id="exam-tier"
                  required
                  placeholder="e.g. Tier 1 & Tier 2 or Paper 1"
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="exam-desc">Description</Label>
                <textarea
                  id="exam-desc"
                  rows={3}
                  placeholder="Summary of syllabus, posts, and eligibility..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 flex w-full rounded-md border border-slate-300 bg-white p-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Save Examination
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((exam) => (
          <Card key={exam.id} className="border border-slate-200/90 shadow-2xs bg-white p-5">
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-blue-600 text-white font-bold text-xs">
                {exam.tier}
              </Badge>
              <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 text-xs">
                Published
              </Badge>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">{exam.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              {exam.description}
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Category: {exam.category}
              </span>
              <span className="font-semibold text-slate-700">
                Slug: <code className="text-[11px] bg-slate-100 px-1 py-0.5 rounded">{exam.slug}</code>
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
