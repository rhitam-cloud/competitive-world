import React from "react";
import Link from "next/link";
import { dbRepository } from "@/lib/db/repository";
import { AdminNav } from "@/components/admin/AdminNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, History, Eye, ArrowRight } from "lucide-react";
import { formatDurationHuman } from "@/lib/utils";

export const metadata = {
  title: "Candidate Attempts & Logs - Admin Portal",
};

export default async function AdminAttemptsPage() {
  const attempts = await dbRepository.getAllAttempts();

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Student Test Attempts &amp; Submissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit individual candidate attempts, authoritative score outcomes, and negative marks penalty data.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-3">Attempt ID</th>
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Mock Test Name</th>
                  <th className="p-3 text-center">Score</th>
                  <th className="p-3 text-center">Correct</th>
                  <th className="p-3 text-center">Incorrect</th>
                  <th className="p-3 text-center">Accuracy</th>
                  <th className="p-3 text-center">Time Spent</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {attempts.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono text-[11px] text-slate-500">
                      {att.id.substring(0, 14)}...
                    </td>
                    <td className="p-3 font-semibold text-slate-900">
                      <div>{att.candidateName || "Candidate"}</div>
                      {att.candidateEmail && (
                        <div className="text-[10px] text-slate-400 font-normal">
                          {att.candidateEmail}
                        </div>
                      )}
                    </td>
                    <td className="p-3 max-w-xs truncate font-medium">
                      {att.mockTestTitle || "SSC Mock Test"}
                    </td>
                    <td className="p-3 text-center font-bold text-blue-600">
                      {att.totalScore} / {att.maxMarks}
                    </td>
                    <td className="p-3 text-center font-bold text-emerald-600">
                      {att.correctCount}
                    </td>
                    <td className="p-3 text-center font-bold text-rose-600">
                      {att.incorrectCount}
                    </td>
                    <td className="p-3 text-center font-semibold text-slate-800">
                      {att.accuracyPercentage}%
                    </td>
                    <td className="p-3 text-center text-slate-500">
                      {formatDurationHuman(att.timeSpentSeconds)}
                    </td>
                    <td className="p-3 text-right">
                      <Link href={`/tests/${att.mockTestId}/results/${att.id}`}>
                        <Button variant="outline" size="sm" className="h-7 text-xs text-blue-600">
                          <Eye className="w-3.5 h-3.5 mr-1" /> View Solution Review
                        </Button>
                      </Link>
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
