"use client";

import React, { useState, useMemo } from "react";
import { Question, QuestionDifficulty, QuestionOptionId, Subject, SubjectCode } from "@/types";
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
import { Search, Plus, Trash2, Eye, Sparkles, CheckCircle2 } from "lucide-react";
import { getSubjectDisplayName } from "@/lib/utils";

interface QuestionManagerClientProps {
  initialQuestions: Question[];
  subjects: Subject[];
}

export function QuestionManagerClient({
  initialQuestions,
  subjects,
}: QuestionManagerClientProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  // New Question Form state
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newSubjectCode, setNewSubjectCode] = useState<SubjectCode>("REASONING");
  const [newTopic, setNewTopic] = useState("");
  const [newDifficulty, setNewDifficulty] = useState<QuestionDifficulty>("medium");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [correctOpt, setCorrectOpt] = useState<QuestionOptionId>("A");
  const [explanation, setExplanation] = useState("");

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedSubject !== "all" && q.subjectCode !== selectedSubject) {
        return false;
      }
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) {
        return false;
      }
      if (search.trim()) {
        const query = search.toLowerCase();
        return (
          q.questionText.toLowerCase().includes(query) ||
          q.topic.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [questions, selectedSubject, selectedDifficulty, search]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !optA || !optB || !optC || !optD) return;

    const newQ: Question = {
      id: `q-${Date.now()}`,
      subjectId: `sub-${newSubjectCode.toLowerCase()}`,
      subjectCode: newSubjectCode,
      questionText: newQuestionText.trim(),
      options: [
        { id: "A", text: optA.trim() },
        { id: "B", text: optB.trim() },
        { id: "C", text: optC.trim() },
        { id: "D", text: optD.trim() },
      ],
      correctOption: correctOpt,
      explanation: explanation.trim() || "Explanation verified by instructor.",
      difficulty: newDifficulty,
      topic: newTopic.trim() || "Practice",
      language: "English",
      defaultPositiveMarks: 2.0,
      defaultNegativeMarks: 0.5,
      isPublished: true,
      createdAt: new Date().toISOString(),
    };

    setQuestions([newQ, ...questions]);
    setNewQuestionText("");
    setOptA("");
    setOptB("");
    setOptC("");
    setOptD("");
    setExplanation("");
    setNewTopic("");
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar: Search, Filters, and Add Button */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search questions by topic or text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="h-9 rounded-md border border-slate-300 bg-white px-2.5 text-xs text-slate-800"
          >
            <option value="all">All Subjects</option>
            <option value="REASONING">Reasoning</option>
            <option value="QUANTITATIVE">Quantitative</option>
            <option value="ENGLISH">English</option>
            <option value="AWARENESS">General Awareness</option>
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="h-9 rounded-md border border-slate-300 bg-white px-2.5 text-xs text-slate-800"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {/* Add Question Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs font-bold ml-auto">
                <Plus className="w-4 h-4 mr-1" /> Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Question to Bank</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 pt-2 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="q-subject">Subject</Label>
                    <select
                      id="q-subject"
                      value={newSubjectCode}
                      onChange={(e) => setNewSubjectCode(e.target.value as any)}
                      className="mt-1 flex h-9 w-full rounded-md border border-slate-300 bg-white px-2.5 text-xs text-slate-900"
                    >
                      <option value="REASONING">Reasoning</option>
                      <option value="QUANTITATIVE">Quantitative</option>
                      <option value="ENGLISH">English</option>
                      <option value="AWARENESS">General Awareness</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="q-diff">Difficulty</Label>
                    <select
                      id="q-diff"
                      value={newDifficulty}
                      onChange={(e) => setNewDifficulty(e.target.value as any)}
                      className="mt-1 flex h-9 w-full rounded-md border border-slate-300 bg-white px-2.5 text-xs text-slate-900"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="q-topic">Topic / Sub-topic</Label>
                    <Input
                      id="q-topic"
                      placeholder="e.g. Syllogism"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      className="mt-1 h-9"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="q-text">Question Statement</Label>
                  <textarea
                    id="q-text"
                    required
                    rows={3}
                    placeholder="Enter the complete question text..."
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="mt-1 flex w-full rounded-md border border-slate-300 bg-white p-2 text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="opt-a">Option A</Label>
                    <Input
                      id="opt-a"
                      required
                      value={optA}
                      onChange={(e) => setOptA(e.target.value)}
                      className="mt-1 h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="opt-b">Option B</Label>
                    <Input
                      id="opt-b"
                      required
                      value={optB}
                      onChange={(e) => setOptB(e.target.value)}
                      className="mt-1 h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="opt-c">Option C</Label>
                    <Input
                      id="opt-c"
                      required
                      value={optC}
                      onChange={(e) => setOptC(e.target.value)}
                      className="mt-1 h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="opt-d">Option D</Label>
                    <Input
                      id="opt-d"
                      required
                      value={optD}
                      onChange={(e) => setOptD(e.target.value)}
                      className="mt-1 h-8"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="correct-opt">Correct Option</Label>
                    <select
                      id="correct-opt"
                      value={correctOpt}
                      onChange={(e) => setCorrectOpt(e.target.value as any)}
                      className="mt-1 flex h-9 w-full rounded-md border border-slate-300 bg-white px-2.5 text-xs text-slate-900 font-bold"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="q-exp">Step-by-Step Explanation</Label>
                  <textarea
                    id="q-exp"
                    rows={3}
                    placeholder="Enter mathematical steps or grammar rules..."
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    className="mt-1 flex w-full rounded-md border border-slate-300 bg-white p-2 text-xs leading-relaxed"
                  />
                </div>

                <DialogFooter className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 font-bold">
                    Save to Bank
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-slate-500">
          Showing {filteredQuestions.length} question(s) in bank
        </div>

        {filteredQuestions.map((q, idx) => (
          <Card key={q.id} className="border border-slate-200/90 shadow-2xs bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900">#{idx + 1}</span>
                <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200 font-semibold">
                  {getSubjectDisplayName(q.subjectCode)}
                </Badge>
                <Badge variant="secondary" className="capitalize text-slate-600">
                  {q.topic}
                </Badge>
                <Badge
                  className={`text-[10px] capitalize ${
                    q.difficulty === "easy"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : q.difficulty === "hard"
                      ? "bg-rose-100 text-rose-800 border-rose-200"
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  }`}
                >
                  {q.difficulty}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">ID: {q.id}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(q.id)}
                  className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600"
                  title="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-slate-900 text-sm font-medium mb-3 whitespace-pre-line leading-relaxed">
              {q.questionText}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
              {q.options.map((opt) => {
                const isCorrect = q.correctOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={`p-2 rounded-lg border flex items-center gap-2 ${
                      isCorrect
                        ? "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold"
                        : "border-slate-200 bg-slate-50/50 text-slate-700"
                    }`}
                  >
                    <span
                      className={`h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        isCorrect ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                    {isCorrect && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation snippet */}
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-600">
              <span className="font-bold text-slate-700">Explanation: </span>
              {q.explanation}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
