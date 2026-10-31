import React from "react";
import { dbRepository } from "@/lib/db/repository";
import { AdminNav } from "@/components/admin/AdminNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderTree, Plus, CheckCircle2, BookOpen } from "lucide-react";
import { ExamManagerClient } from "./exam-manager-client";

export const metadata = {
  title: "Manage Examinations - Admin Portal",
};

export default async function AdminExamsPage() {
  const exams = await dbRepository.getExams();

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Examination Categories Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, publish, or archive competitive examination categories (SSC CGL, SSC CHSL).
          </p>
        </div>

        <ExamManagerClient initialExams={exams} />
      </div>
    </div>
  );
}
