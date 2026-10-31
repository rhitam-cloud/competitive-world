import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Sparkles,
  Timer,
  CheckCircle2,
  BarChart3,
  Award,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  Calculator,
  Globe2,
  BookOpenCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { dbRepository } from "@/lib/db/repository";

export default async function HomePage() {
  const exams = await dbRepository.getExams();
  const featuredTests = await dbRepository.getMockTests({ isFree: true });

  const faqs = [
    {
      q: "Are the mock tests on Competitive World completely free?",
      a: "Yes! Currently all mock tests for SSC CGL and SSC CHSL Tier 1 are 100% free with unlimited retakes, instant scorecards, and in-depth step-by-step solutions.",
    },
    {
      q: "Does the test interface match the actual SSC TCS pattern?",
      a: "Yes. Our exam console closely simulates the official TCS iON examination interface, including the Question Palette (Answered, Not Answered, Marked for Review), live countdown timer, and sectional navigation.",
    },
    {
      q: "How is the negative marking calculated?",
      a: "For SSC CGL and CHSL Tier 1 tests, each correct response awards +2.0 marks, while every incorrect response incurs a deduction of -0.5 marks. Unanswered questions receive 0 marks with no penalty.",
    },
    {
      q: "Can I review solutions and explanations after submitting the test?",
      a: "Immediately upon submission, you receive an exhaustive scorecard with section-wise accuracy, question-by-question review, correct answer keys, and bilingual step-by-step explanations.",
    },
    {
      q: "Can I resume a mock test if I accidentally refresh the page?",
      a: "Yes! Your selected answers and remaining time are continuously preserved in your session. Refreshing or accidentally closing the tab will restore your in-progress attempt seamlessly.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-16 pb-24 lg:pt-20 lg:pb-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Brand Emblem */}
          <div className="flex justify-center mb-6">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden shadow-2xl border-2 border-amber-400/60 bg-slate-950 ring-8 ring-blue-500/20">
              <Image
                src="/logo.png"
                alt="Competitive World"
                width={112}
                height={112}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-200 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Updated with Latest 2026 TCS Examination Pattern</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Ace <span className="text-blue-400">SSC CGL & CHSL</span> With India&apos;s Most Realistic Mock Tests
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Practice in the exact TCS exam console, conquer negative marking (+2 / -0.5), and analyze your weak spots with authoritative step-by-step solutions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/exams">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-base px-8 h-12 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                Start Free Mock Test <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold text-base h-12 backdrop-blur-sm"
              >
                Create Free Candidate Account
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Timer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">60 Mins</div>
                <div className="text-xs text-slate-400">Real Exam Timer</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">100% Free</div>
                <div className="text-xs text-slate-400">Zero Cost Mocks</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">+2.0 / -0.5</div>
                <div className="text-xs text-slate-400">Exact Negative Marking</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">Instant</div>
                <div className="text-xs text-slate-400">In-depth Scorecard</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXAM TARGET CARDS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200 mb-2 font-semibold">
              National Competitive Exams
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Choose Your Examination Target
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Specialized full-length and sectional test series tailored to the official SSC syllabus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {exams.map((exam) => (
              <Card
                key={exam.id}
                className="overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all group hover:border-blue-300 bg-white"
              >
                <div className="p-6 sm:p-8 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-1 px-3">
                        {exam.tier}
                      </Badge>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Free Access
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {exam.title}
                    </h3>
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                      {exam.description}
                    </p>

                    {/* Section pills */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 text-xs text-slate-600 font-medium">
                      <span className="bg-slate-100 px-2 py-1 rounded">Reasoning (25 Qs)</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">Quant (25 Qs)</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">English (25 Qs)</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">General Awareness (25 Qs)</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      Standard Marking: +2 / -0.5
                    </span>
                    <Link href={`/exams`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                        View Mock Tests <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED FREE MOCK TESTS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 mb-2 font-semibold">
                Instant Practice
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Featured Live Mock Tests
              </h2>
              <p className="mt-1 text-slate-600 text-sm">
                Timed mock tests ready for immediate attempt without delay.
              </p>
            </div>
            <Link href="/exams">
              <Button variant="outline" className="font-semibold text-blue-600 border-blue-200 hover:bg-blue-50">
                Browse All Tests ({featuredTests.length}) <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredTests.map((test) => (
              <Card
                key={test.id}
                className="border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-blue-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="free">FREE TEST</Badge>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5 text-blue-600" />
                      {test.durationMinutes} Minutes
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {test.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100 text-center text-xs mb-5">
                    <div>
                      <div className="text-slate-400 text-[11px]">Questions</div>
                      <div className="font-extrabold text-slate-900 mt-0.5">
                        {test.questionCount} Qs
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Max Marks</div>
                      <div className="font-extrabold text-slate-900 mt-0.5">
                        {test.totalMarks}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Negative</div>
                      <div className="font-extrabold text-rose-600 mt-0.5">
                        -{test.negativeMarks}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">
                      All 4 Sections Covered
                    </span>
                    <Link href={`/tests/${test.id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-9">
                        Attempt Test Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200 mb-2 font-semibold">
              Seamless Workflow
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How Competitive World Works
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Follow our proven 4-step preparation cycle to build speed, accuracy, and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Choose Examination",
                desc: "Select SSC CGL or CHSL and choose between full-length mock tests or section-wise drills.",
                icon: BookOpen,
              },
              {
                step: "02",
                title: "Attempt Timed Mock",
                desc: "Solve questions under the real TCS interface with countdown timer and interactive Question Palette.",
                icon: Timer,
              },
              {
                step: "03",
                title: "Instant Scorecard",
                desc: "Receive server-side validated marks with accurate positive and negative marks breakdown.",
                icon: BarChart3,
              },
              {
                step: "04",
                title: "Review Solutions",
                desc: "Learn from step-by-step bilingual explanations and eliminate mistakes before exam day.",
                icon: CheckCircle2,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm relative group hover:border-blue-400 transition-all"
              >
                <div className="text-4xl font-black text-slate-100 group-hover:text-blue-100 transition-colors absolute top-4 right-4 select-none">
                  {item.step}
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BENEFITS OF MOCK TESTS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200 mb-2 font-semibold">
                Why Practice Here?
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Master Speed, Accuracy, and Negative Marking Discipline
              </h2>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                In competitive examinations like SSC CGL and CHSL, syllabus knowledge accounts for only 50% of success. The remaining 50% comes from exam-hall psychological readiness, timing, and knowing which questions to skip.
              </p>

              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Realistic TCS Interface Simulation",
                    desc: "Color-coded question states (Green for answered, Red for unanswered, Purple for review) replicate the real hall experience.",
                  },
                  {
                    title: "Automated Negative Marking Protection",
                    desc: "Immediate analytics on how many marks were lost to negative scoring, helping you curb blind guesswork.",
                  },
                  {
                    title: "Sectional Strengths and Weakness Diagnosis",
                    desc: "Pinpoint whether your score is hindered by Quantitative geometry, English idioms, or Reasoning series.",
                  },
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/exams">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                    Start Your First Free Mock Test
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Graphic Card */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <div className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                    Scorecard Preview
                  </div>
                  <div className="text-lg font-bold text-white">
                    SSC CGL Tier 1 All India Mock
                  </div>
                </div>
                <Badge className="bg-emerald-500 text-slate-950 font-extrabold text-xs">
                  82.5% Accuracy
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-medium">Total Score</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    32.5 <span className="text-xs text-slate-400">/ 40.0</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-medium">Time Taken</div>
                  <div className="text-2xl font-black text-blue-300 mt-1">
                    48m 30s
                  </div>
                </div>
              </div>

              {/* Subject Breakdown preview */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>General Intelligence & Reasoning</span>
                  <span className="text-emerald-400 font-bold">8.0 / 10 (100% Acc)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[80%]" />
                </div>

                <div className="flex justify-between text-slate-300 font-medium pt-1">
                  <span>Quantitative Aptitude</span>
                  <span className="text-emerald-400 font-bold">7.5 / 10 (80% Acc)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[75%]" />
                </div>

                <div className="flex justify-between text-slate-300 font-medium pt-1">
                  <span>English Language</span>
                  <span className="text-emerald-400 font-bold">7.5 / 10 (80% Acc)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[75%]" />
                </div>

                <div className="flex justify-between text-slate-300 font-medium pt-1">
                  <span>General Awareness</span>
                  <span className="text-emerald-400 font-bold">9.5 / 10 (95% Acc)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full w-[95%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200 mb-2 font-semibold">
              Got Questions?
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Everything you need to know about taking online mock tests on Competitive World.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {faq.q}
                    </h3>
                    <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
