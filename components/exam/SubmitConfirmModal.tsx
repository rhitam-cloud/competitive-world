"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Clock, Send, ShieldAlert } from "lucide-react";
import { PaletteStatus } from "@/types";

interface SubmitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  isSubmitting: boolean;
  isAutoSubmit?: boolean;
  totalQuestions: number;
  questionStatuses: PaletteStatus[];
  timeRemainingSeconds: number;
}

export function SubmitConfirmModal({
  isOpen,
  onClose,
  onConfirmSubmit,
  isSubmitting,
  isAutoSubmit = false,
  totalQuestions,
  questionStatuses,
  timeRemainingSeconds,
}: SubmitConfirmModalProps) {
  const answeredCount = questionStatuses.filter(
    (s) => s === "answered" || s === "answered_and_marked"
  ).length;
  const unansweredCount = questionStatuses.filter(
    (s) => s === "unanswered" || s === "not_visited"
  ).length;
  const reviewCount = questionStatuses.filter(
    (s) => s === "marked_for_review" || s === "answered_and_marked"
  ).length;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSubmitting && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-slate-900 mb-1">
            {isAutoSubmit ? (
              <Clock className="w-5 h-5 text-rose-600 animate-spin" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-blue-600" />
            )}
            <DialogTitle>
              {isAutoSubmit ? "Time Expired - Finalizing Test" : "Submit Examination?"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {isAutoSubmit
              ? "Your exam duration has ended. The system is finalizing your test and calculating your score."
              : "Are you sure you want to finalize your mock test submission? You cannot alter answers once submitted."}
          </DialogDescription>
        </DialogHeader>

        {/* Examination Summary Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Summary of Attempt
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-medium">Answered</div>
              <div className="text-xl font-extrabold text-emerald-600 mt-0.5">
                {answeredCount}
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-medium">Unanswered</div>
              <div className="text-xl font-extrabold text-rose-600 mt-0.5">
                {unansweredCount}
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-medium">Review</div>
              <div className="text-xl font-extrabold text-purple-600 mt-0.5">
                {reviewCount}
              </div>
            </div>
          </div>

          {unansweredCount > 0 && !isAutoSubmit && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                You still have <strong>{unansweredCount} unattempted questions</strong>. You will receive 0 marks for questions left blank.
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {!isAutoSubmit && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Resume Test
            </Button>
          )}
          <Button
            type="button"
            onClick={onConfirmSubmit}
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Calculating Results...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Send className="w-4 h-4" /> Final Submit Test
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
