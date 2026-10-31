"use client";

import React, { useState } from "react";
import { BulkImportRow } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  FileText,
} from "lucide-react";

const SAMPLE_CSV = `questionText,optionA,optionB,optionC,optionD,correctOption,explanation,subject,topic,difficulty,positiveMarks,negativeMarks
"Which Indian state has the longest mainland coastline?","Tamil Nadu","Gujarat","Andhra Pradesh","Maharashtra","B","Gujarat has the longest coastline in India measuring over 1600 km.","AWARENESS","Geography","easy",2.0,0.5
"If a car travels 120 km in 2 hours, what is its speed in m/s?","15 m/s","16.67 m/s","20 m/s","25 m/s","B","Speed = 120 km / 2 h = 60 km/h = 60 * (5/18) = 16.67 m/s.","QUANTITATIVE","Speed Distance","medium",2.0,0.5
"Select the synonym of METICULOUS","Careless","Painstaking","Casual","Hasty","B","Meticulous means showing great attention to detail (Painstaking).","ENGLISH","Synonyms","easy",2.0,0.5`;

export function BulkImportClient() {
  const [csvContent, setCsvContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [parsedRows, setParsedRows] = useState<
    { rowNumber: number; data: Partial<BulkImportRow>; errors: string[] }[]
  >([]);
  const [hasParsed, setHasParsed] = useState(false);
  const [importSuccessMessage, setImportSuccessMessage] = useState<string | null>(null);

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(SAMPLE_CSV);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCsvContent(text);
      }
    };
    reader.readAsText(file);
  };

  // Robust simple CSV parser handling quoted strings
  const parseCSVLine = (text: string): string[] => {
    const result: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += char;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const handleValidate = () => {
    setImportSuccessMessage(null);
    if (!csvContent.trim()) return;

    const lines = csvContent
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 2) {
      alert("CSV must contain at least a header row and one data row.");
      return;
    }

    const rowsResult: {
      rowNumber: number;
      data: Partial<BulkImportRow>;
      errors: string[];
    }[] = [];

    // Skip header line (index 0)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const cols = parseCSVLine(line);
      const errors: string[] = [];

      const [
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption,
        explanation,
        subject,
        topic,
        difficulty,
        posMarks,
        negMarks,
      ] = cols;

      if (!questionText || questionText.length < 5) {
        errors.push("Question text is missing or too brief.");
      }
      if (!optionA || !optionB || !optionC || !optionD) {
        errors.push("All 4 options (A, B, C, D) are required.");
      }
      const upperCorrect = (correctOption || "").toUpperCase();
      if (!["A", "B", "C", "D"].includes(upperCorrect)) {
        errors.push(`Invalid correct option '${correctOption}'. Must be A, B, C, or D.`);
      }

      const validSubject = ["REASONING", "QUANTITATIVE", "ENGLISH", "AWARENESS"].includes(
        (subject || "").toUpperCase()
      );
      if (!validSubject) {
        errors.push(`Unknown subject '${subject}'. Use REASONING, QUANTITATIVE, ENGLISH, or AWARENESS.`);
      }

      rowsResult.push({
        rowNumber: i + 1,
        data: {
          questionText: questionText?.replace(/^"|"$/g, ""),
          optionA: optionA?.replace(/^"|"$/g, ""),
          optionB: optionB?.replace(/^"|"$/g, ""),
          optionC: optionC?.replace(/^"|"$/g, ""),
          optionD: optionD?.replace(/^"|"$/g, ""),
          correctOption: upperCorrect as any,
          explanation: explanation?.replace(/^"|"$/g, "") || "",
          subject: (subject || "REASONING").toUpperCase() as any,
          topic: topic?.replace(/^"|"$/g, "") || "General",
          difficulty: (["easy", "medium", "hard"].includes(difficulty?.toLowerCase())
            ? difficulty.toLowerCase()
            : "medium") as any,
          positiveMarks: Number(posMarks) || 2.0,
          negativeMarks: Number(negMarks) || 0.5,
        },
        errors,
      });
    }

    setParsedRows(rowsResult);
    setHasParsed(true);
  };

  const validRows = parsedRows.filter((r) => r.errors.length === 0);
  const invalidRows = parsedRows.filter((r) => r.errors.length > 0);

  const handleImport = () => {
    if (validRows.length === 0) {
      alert("No valid rows to import.");
      return;
    }

    setImportSuccessMessage(
      `Successfully imported ${validRows.length} questions into the active Question Bank!`
    );
    setHasParsed(false);
    setParsedRows([]);
    setCsvContent("");
  };

  return (
    <div className="space-y-6">
      {/* Template Instructions Banner */}
      <Card className="border border-slate-200/90 shadow-2xs bg-white">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                Standard CSV Format Schema
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyTemplate}
                className="text-xs h-8 text-slate-700"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Copied Sample
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" /> Copy Sample Template
                  </>
                )}
              </Button>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Your CSV must contain the following 12 columns in exact order:
          </p>
          <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto select-all">
            questionText, optionA, optionB, optionC, optionD, correctOption, explanation, subject, topic, difficulty, positiveMarks, negativeMarks
          </div>
        </CardContent>
      </Card>

      {/* CSV Input Card */}
      <Card className="border border-slate-200/90 shadow-2xs bg-white">
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Paste CSV Data or Upload File
            </h3>
            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                <UploadCloud className="w-4 h-4 text-blue-600" /> Choose .csv File
              </span>
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <textarea
            rows={7}
            placeholder="Paste your CSV content here..."
            value={csvContent}
            onChange={(e) => setCsvContent(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setCsvContent(SAMPLE_CSV)}
              className="text-xs text-blue-600 font-semibold"
            >
              Insert Sample Practice Questions
            </Button>

            <Button
              type="button"
              onClick={handleValidate}
              disabled={!csvContent.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
            >
              Validate CSV Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Notification */}
      {importSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{importSuccessMessage}</span>
        </div>
      )}

      {/* Validation Results & Preview Table */}
      {hasParsed && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Validation Summary
              </h3>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 font-bold">
                {validRows.length} Valid
              </Badge>
              {invalidRows.length > 0 && (
                <Badge className="bg-rose-100 text-rose-800 border-rose-200 font-bold">
                  {invalidRows.length} Invalid
                </Badge>
              )}
            </div>

            <Button
              onClick={handleImport}
              disabled={validRows.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> Commit Import ({validRows.length} Questions)
            </Button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <tr>
                    <th className="p-3 text-center">Row</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Question Text</th>
                    <th className="p-3 text-center">Key</th>
                    <th className="p-3">Validation Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {parsedRows.map((row) => {
                    const isValid = row.errors.length === 0;
                    return (
                      <tr
                        key={row.rowNumber}
                        className={isValid ? "hover:bg-slate-50/50" : "bg-rose-50/40"}
                      >
                        <td className="p-3 text-center font-mono font-bold text-slate-500">
                          {row.rowNumber}
                        </td>
                        <td className="p-3">
                          {isValid ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-700 font-bold">
                              <AlertTriangle className="w-3.5 h-3.5" /> Error
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-semibold">
                          {row.data.subject || "-"}
                        </td>
                        <td className="p-3 max-w-sm truncate">
                          {row.data.questionText || "-"}
                        </td>
                        <td className="p-3 text-center font-bold text-slate-900">
                          {row.data.correctOption || "-"}
                        </td>
                        <td className="p-3 text-xs">
                          {isValid ? (
                            <span className="text-emerald-600 font-medium">Ready to import</span>
                          ) : (
                            <span className="text-rose-600 font-medium">
                              {row.errors.join("; ")}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
