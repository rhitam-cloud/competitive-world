import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PaletteStatus, SubjectCode } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeRemaining(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(safeSeconds / 3600);
  const mins = Math.floor((safeSeconds % 3600) / 60);
  const secs = safeSeconds % 60;

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export function formatDurationHuman(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return dateString;
  }
}

export function getPaletteColor(status: PaletteStatus): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  switch (status) {
    case "answered":
      return {
        bg: "bg-emerald-600 text-white",
        text: "text-emerald-700",
        border: "border-emerald-600",
        label: "Answered",
      };
    case "unanswered":
      return {
        bg: "bg-rose-600 text-white",
        text: "text-rose-700",
        border: "border-rose-600",
        label: "Not Answered",
      };
    case "marked_for_review":
      return {
        bg: "bg-purple-600 text-white",
        text: "text-purple-700",
        border: "border-purple-600",
        label: "Marked for Review",
      };
    case "answered_and_marked":
      return {
        bg: "bg-purple-700 text-white relative after:content-[''] after:absolute after:bottom-1 after:right-1 after:w-2 after:h-2 after:bg-emerald-400 after:rounded-full",
        text: "text-purple-800",
        border: "border-purple-700",
        label: "Ans & Marked for Review",
      };
    case "not_visited":
    default:
      return {
        bg: "bg-slate-100 text-slate-700 hover:bg-slate-200",
        text: "text-slate-600",
        border: "border-slate-300",
        label: "Not Visited",
      };
  }
}

export function getSubjectDisplayName(code: SubjectCode): string {
  switch (code) {
    case "REASONING":
      return "General Intelligence & Reasoning";
    case "QUANTITATIVE":
      return "Quantitative Aptitude";
    case "ENGLISH":
      return "English Language";
    case "AWARENESS":
      return "General Awareness";
    default:
      return code;
  }
}

export function getSubjectShortName(code: SubjectCode): string {
  switch (code) {
    case "REASONING":
      return "Reasoning";
    case "QUANTITATIVE":
      return "Quant";
    case "ENGLISH":
      return "English";
    case "AWARENESS":
      return "GK / GS";
    default:
      return code;
  }
}
