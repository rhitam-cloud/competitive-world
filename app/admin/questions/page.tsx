import React from "react";
import { dbRepository } from "@/lib/db/repository";
import { AdminNav } from "@/components/admin/AdminNav";
import { QuestionManagerClient } from "./question-manager-client";

export const metadata = {
  title: "Question Bank Manager - Admin Portal",
};

export default async function AdminQuestionsPage() {
  const questions = await dbRepository.getAllQuestions();
  const subjects = await dbRepository.getSubjects();

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Question Bank Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Search, filter, edit, and create competitive examination questions across all 4 subjects.
          </p>
        </div>

        <QuestionManagerClient initialQuestions={questions} subjects={subjects} />
      </div>
    </div>
  );
}
