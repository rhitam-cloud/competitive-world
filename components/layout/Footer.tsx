import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full shadow border border-amber-400/40 bg-slate-950">
                <Image
                  src="/logo.png"
                  alt="Competitive World Logo"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                Competitive<span className="text-blue-600">World</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              India's premier competitive examination preparation engine designed for SSC CGL, CHSL, and central government exams. Realistic mock tests, accurate percentile rankings, and in-depth bilingual solutions.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-200/60 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Free Mock Tests Active</span>
            </div>
          </div>

          {/* Exams */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Target Examinations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/exams" className="hover:text-blue-600 transition-colors">
                  SSC CGL Tier 1 Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-blue-600 transition-colors">
                  SSC CGL Tier 2 Full Length
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-blue-600 transition-colors">
                  SSC CHSL (10+2) Tier 1
                </Link>
              </li>
              <li>
                <span className="text-slate-400">SSC CPO SI (Coming Soon)</span>
              </li>
              <li>
                <span className="text-slate-400">SSC MTS / Havaldar (Coming Soon)</span>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Sections & Subjects
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/exams" className="hover:text-blue-600 transition-colors">
                  General Intelligence & Reasoning
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-blue-600 transition-colors">
                  Quantitative Aptitude (Arithmetic & Advanced)
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-blue-600 transition-colors">
                  English Language & Comprehension
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-blue-600 transition-colors">
                  General Awareness & Current Affairs
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Support & Legal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Platform & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/auth/login" className="hover:text-blue-600 transition-colors">
                  Candidate Login & Registration
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                  Student Performance Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-600 transition-colors">
                  Instructor & Admin Portal
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Marking Scheme: +2.0 / -0.50</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>
            © {new Date().getFullYear()} Competitive World. Built for Indian Competitive Exam Aspirants.
          </p>
          <p className="text-[11px] text-slate-600 text-center md:text-right max-w-xl">
            Disclaimer: Competitive World is an independent educational training service and is not affiliated with, endorsed by, or connected to the Staff Selection Commission (SSC) or Government of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
