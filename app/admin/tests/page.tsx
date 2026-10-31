import React from "react";
import { dbRepository } from "@/lib/db/repository";
import { AdminNav } from "@/components/admin/AdminNav";
import { TestManagerClient } from "./test-manager-client";

export const metadata = {
  title: "Manage Mock Tests - Admin Portal",
};

export default async function AdminTestsPage() {
  const exams = await dbRepository.getExams();
  const mockTests = await dbRepository.getMockTests();

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Mock Tests Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure test duration, marking schemes (+2 / -0.5), instructions, and questions linkage.
          </p>
        </div>

        <TestManagerClient initialTests={mockTests} exams={exams} />
      </div>
    </div>
  );
}
