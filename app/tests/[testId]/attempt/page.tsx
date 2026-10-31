"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  PaletteStatus,
  PublicQuestion,
  QuestionOptionId,
  SubjectCode,
  UserProfile,
} from "@/types";
import { ExamHeader } from "@/components/exam/ExamHeader";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { QuestionPalette } from "@/components/exam/QuestionPalette";
import { SubmitConfirmModal } from "@/components/exam/SubmitConfirmModal";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TestAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;

  // Loading & Error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active candidate state
  const [candidate, setCandidate] = useState<UserProfile | null>(null);

  // Exam metadata & questions
  const [testTitle, setTestTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [questions, setQuestions] = useState<PublicQuestion[]>([]);

  // Active question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Student answer states: questionId -> Option (A | B | C | D)
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, QuestionOptionId | null>
  >({});

  // Review flags: questionId -> boolean
  const [reviewFlags, setReviewFlags] = useState<Record<string, boolean>>({});

  // Visited questions tracker: questionId -> boolean
  const [visitedMap, setVisitedMap] = useState<Record<string, boolean>>({});

  // Timer states
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(3600);
  const startedAtRef = useRef<string>(new Date().toISOString());

  // Modals & submission
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoSubmit, setIsAutoSubmit] = useState(false);
  const hasSubmittedRef = useRef(false);

  // Storage key for resilient reload restoration
  const storageKey = `competitiveworld_attempt_${testId}`;

  // 1. Fetch sanitized questions & current user
  useEffect(() => {
    async function loadTest() {
      try {
        setLoading(true);

        // Fetch active candidate
        try {
          const userRes = await fetch("/api/auth/me");
          if (userRes.ok) {
            const userData = await userRes.json();
            if (userData.user) {
              setCandidate(userData.user);
            }
          }
        } catch {}

        // Fetch questions
        const res = await fetch(`/api/tests/${testId}/questions`);
        if (!res.ok) {
          throw new Error("Unable to load mock test questions from server.");
        }
        const data = await res.json();
        setTestTitle(data.test.title);
        setDurationMinutes(data.test.durationMinutes);
        setQuestions(data.questions);

        const initialTotalSecs = data.test.durationMinutes * 60;

        // Check if there is an in-progress session stored in localStorage
        try {
          const cached = localStorage.getItem(storageKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed.testId === testId && parsed.answers) {
              setSelectedAnswers(parsed.answers);
              setReviewFlags(parsed.reviewFlags || {});
              setVisitedMap(parsed.visitedMap || {});
              if (parsed.currentIndex !== undefined) {
                setCurrentIndex(parsed.currentIndex);
              }
              if (parsed.startedAt) {
                startedAtRef.current = parsed.startedAt;
                const elapsedSecs = Math.floor(
                  (Date.now() - new Date(parsed.startedAt).getTime()) / 1000
                );
                const remaining = Math.max(0, initialTotalSecs - elapsedSecs);
                setTimeRemainingSeconds(remaining);
              } else {
                setTimeRemainingSeconds(initialTotalSecs);
              }
            } else {
              setTimeRemainingSeconds(initialTotalSecs);
            }
          } else {
            setTimeRemainingSeconds(initialTotalSecs);
          }
        } catch {
          setTimeRemainingSeconds(initialTotalSecs);
        }

        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to initialize test console.");
        setLoading(false);
      }
    }

    loadTest();
  }, [testId, storageKey]);

  // Mark current question as visited
  useEffect(() => {
    if (questions.length > 0 && questions[currentIndex]) {
      const qId = questions[currentIndex].id;
      setVisitedMap((prev) => ({ ...prev, [qId]: true }));
    }
  }, [currentIndex, questions]);

  // 2. Persist answer state to localStorage on changes
  useEffect(() => {
    if (!loading && questions.length > 0 && !hasSubmittedRef.current) {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            testId,
            startedAt: startedAtRef.current,
            currentIndex,
            answers: selectedAnswers,
            reviewFlags,
            visitedMap,
          })
        );
      } catch {}
    }
  }, [selectedAnswers, reviewFlags, visitedMap, currentIndex, loading, questions, testId, storageKey]);

  // 3. Final Submission Handler
  const handleFinalSubmit = useCallback(
    async (auto = false) => {
      if (hasSubmittedRef.current) return;
      hasSubmittedRef.current = true;
      setIsSubmitting(true);
      if (auto) setIsAutoSubmit(true);

      const totalTestSecs = durationMinutes * 60;
      const timeSpent = Math.max(1, totalTestSecs - timeRemainingSeconds);

      try {
        const response = await fetch(`/api/tests/${testId}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            testId,
            userId: candidate?.id,
            candidateName: candidate?.fullName,
            candidateEmail: candidate?.email,
            startedAt: startedAtRef.current,
            submittedAnswers: selectedAnswers,
            reviewFlags,
            timeSpentSeconds: timeSpent,
          }),
        });

        if (!response.ok) {
          throw new Error("Server submission error");
        }

        const data = await response.json();
        try {
          localStorage.removeItem(storageKey);
        } catch {}

        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          router.push(`/tests/${testId}`);
        }
      } catch (err) {
        console.error("Submission failed:", err);
        hasSubmittedRef.current = false;
        setIsSubmitting(false);
        alert("Failed to submit exam results. Please check your connection and retry.");
      }
    },
    [
      testId,
      candidate,
      durationMinutes,
      timeRemainingSeconds,
      selectedAnswers,
      reviewFlags,
      router,
      storageKey,
    ]
  );

  // 4. Countdown Timer Engine
  useEffect(() => {
    if (loading || error || questions.length === 0) return;

    const timerInterval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleFinalSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [loading, error, questions.length, handleFinalSubmit]);

  // Helper: compute palette status for each question
  const questionStatuses: PaletteStatus[] = questions.map((q) => {
    const hasAnswer = selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== null;
    const isMarked = Boolean(reviewFlags[q.id]);
    const isVisited = Boolean(visitedMap[q.id]);

    if (hasAnswer && isMarked) return "answered_and_marked";
    if (hasAnswer) return "answered";
    if (isMarked) return "marked_for_review";
    if (isVisited) return "unanswered";
    return "not_visited";
  });

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optId: QuestionOptionId) => {
    if (!currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optId,
    }));
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  const handleToggleMarkForReview = () => {
    if (!currentQuestion) return;
    setReviewFlags((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSaveAndNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  };

  const handleSelectSection = (code: SubjectCode) => {
    const targetIdx = questions.findIndex((q) => q.subjectCode === code);
    if (targetIdx !== -1) {
      setCurrentIndex(targetIdx);
    }
  };

  const sectionCounts: Record<SubjectCode, { total: number; answered: number }> = {
    REASONING: { total: 0, answered: 0 },
    QUANTITATIVE: { total: 0, answered: 0 },
    ENGLISH: { total: 0, answered: 0 },
    AWARENESS: { total: 0, answered: 0 },
  };

  questions.forEach((q) => {
    if (sectionCounts[q.subjectCode]) {
      sectionCounts[q.subjectCode].total++;
      if (selectedAnswers[q.id]) {
        sectionCounts[q.subjectCode].answered++;
      }
    }
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-800">
          Loading Examination Console...
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Preparing secure questions, initializing timer, and restoring candidate session.
        </p>
      </div>
    );
  }

  if (error || !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <AlertCircle className="w-12 h-12 text-rose-600 mb-3" />
        <h2 className="text-xl font-bold text-slate-800">Failed to Load Mock Test</h2>
        <p className="text-sm text-slate-600 mt-1 mb-4">{error}</p>
        <Button onClick={() => router.push("/exams")}>Return to Exams Catalog</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 select-none">
      <ExamHeader
        testTitle={testTitle}
        timeRemainingSeconds={timeRemainingSeconds}
        totalDurationSeconds={durationMinutes * 60}
        currentSection={currentQuestion.subjectCode}
        sectionCounts={sectionCounts}
        onSelectSection={handleSelectSection}
        onSubmitClick={() => setConfirmModalOpen(true)}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 flex flex-col h-full min-h-[600px]">
          <QuestionCard
            question={currentQuestion}
            questionIndex={currentIndex}
            totalQuestions={questions.length}
            selectedOption={selectedAnswers[currentQuestion.id] || null}
            isMarkedForReview={Boolean(reviewFlags[currentQuestion.id])}
            onSelectOption={handleSelectOption}
            onClearResponse={handleClearResponse}
            onToggleMarkForReview={handleToggleMarkForReview}
            onPrevious={handlePrevious}
            onSaveAndNext={handleSaveAndNext}
            hasPrevious={currentIndex > 0}
            hasNext={currentIndex < questions.length - 1}
          />
        </div>

        <div className="lg:col-span-1 flex flex-col h-full min-h-[500px]">
          <QuestionPalette
            questions={questions}
            currentIndex={currentIndex}
            questionStatuses={questionStatuses}
            onSelectQuestion={handleJumpToQuestion}
            candidateName={candidate?.fullName || "Candidate"}
            candidateExam={candidate?.targetExam ? `${candidate.targetExam} Aspirant` : "SSC Aspirant"}
          />
        </div>
      </div>

      <SubmitConfirmModal
        isOpen={confirmModalOpen || isAutoSubmit}
        onClose={() => setConfirmModalOpen(false)}
        onConfirmSubmit={() => handleFinalSubmit(false)}
        isSubmitting={isSubmitting}
        isAutoSubmit={isAutoSubmit}
        totalQuestions={questions.length}
        questionStatuses={questionStatuses}
        timeRemainingSeconds={timeRemainingSeconds}
      />
    </div>
  );
}
