import {
  AttemptAnswerState,
  Question,
  QuestionOptionId,
  QuestionReviewItem,
  SubjectBreakdown,
  SubjectCode,
  TestAttempt,
} from "@/types";

export interface ScoreCalculationInput {
  mockTestId: string;
  mockTestTitle: string;
  userId: string;
  startedAt: string;
  durationMinutes: number;
  positiveMarks: number;
  negativeMarks: number;
  submittedAnswers: Record<string, QuestionOptionId | null>;
  reviewFlags: Record<string, boolean>;
  timeSpentSeconds: number;
  allQuestions: Question[];
}

export interface ScoreCalculationResult {
  attempt: TestAttempt;
  reviewItems: QuestionReviewItem[];
}

/**
 * Server-Side Authoritative Exam Scoring Engine
 * 
 * Never trusts scores or answers from the browser.
 * Verifies submitted answers against the authoritative question bank, applies configurable
 * positive and negative marking, computes subject-wise breakdown, and formats review explanations.
 */
export function calculateExamScore(
  input: ScoreCalculationInput
): ScoreCalculationResult {
  const {
    mockTestId,
    mockTestTitle,
    userId,
    startedAt,
    positiveMarks,
    negativeMarks,
    submittedAnswers,
    reviewFlags,
    timeSpentSeconds,
    allQuestions,
  } = input;

  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  const maxMarks = allQuestions.reduce((acc, q) => acc + (q.defaultPositiveMarks || positiveMarks), 0);

  // Group subject breakdown
  const subjectsMap: Record<
    SubjectCode,
    {
      subjectCode: SubjectCode;
      subjectName: string;
      totalQuestions: number;
      attempted: number;
      correct: number;
      incorrect: number;
      unanswered: number;
      score: number;
      maxMarks: number;
    }
  > = {
    REASONING: {
      subjectCode: "REASONING",
      subjectName: "General Intelligence & Reasoning",
      totalQuestions: 0,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0,
      score: 0,
      maxMarks: 0,
    },
    QUANTITATIVE: {
      subjectCode: "QUANTITATIVE",
      subjectName: "Quantitative Aptitude",
      totalQuestions: 0,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0,
      score: 0,
      maxMarks: 0,
    },
    ENGLISH: {
      subjectCode: "ENGLISH",
      subjectName: "English Language & Comprehension",
      totalQuestions: 0,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0,
      score: 0,
      maxMarks: 0,
    },
    AWARENESS: {
      subjectCode: "AWARENESS",
      subjectName: "General Awareness",
      totalQuestions: 0,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0,
      score: 0,
      maxMarks: 0,
    },
  };

  const reviewItems: QuestionReviewItem[] = [];

  for (const question of allQuestions) {
    const qPosMarks = question.defaultPositiveMarks || positiveMarks;
    const qNegMarks = question.defaultNegativeMarks || negativeMarks;
    const subCode = question.subjectCode;

    // Initialize subject if missing
    if (!subjectsMap[subCode]) {
      subjectsMap[subCode] = {
        subjectCode: subCode,
        subjectName: question.subjectCode,
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        score: 0,
        maxMarks: 0,
      };
    }

    const sub = subjectsMap[subCode];
    sub.totalQuestions += 1;
    sub.maxMarks += qPosMarks;

    const chosenOption = submittedAnswers[question.id] || null;
    const isMarked = Boolean(reviewFlags[question.id]);

    let marksAwarded = 0;
    let isCorrect = false;

    if (!chosenOption) {
      // Unanswered
      unansweredCount += 1;
      sub.unanswered += 1;
      marksAwarded = 0;
    } else {
      sub.attempted += 1;
      if (chosenOption === question.correctOption) {
        // Correct
        isCorrect = true;
        correctCount += 1;
        sub.correct += 1;
        marksAwarded = qPosMarks;
        totalScore += qPosMarks;
        sub.score += qPosMarks;
      } else {
        // Incorrect
        isCorrect = false;
        incorrectCount += 1;
        sub.incorrect += 1;
        marksAwarded = -qNegMarks;
        totalScore -= qNegMarks;
        sub.score -= qNegMarks;
      }
    }

    reviewItems.push({
      questionId: question.id,
      subjectCode: question.subjectCode,
      subjectName: sub.subjectName,
      questionText: question.questionText,
      options: question.options,
      userSelectedOption: chosenOption,
      correctOption: question.correctOption,
      isCorrect,
      isMarkedForReview: isMarked,
      marksAwarded: Number(marksAwarded.toFixed(2)),
      explanation: question.explanation,
      topic: question.topic,
      difficulty: question.difficulty,
    });
  }

  // Calculate subject accuracies
  const subjectBreakdown: Record<SubjectCode, SubjectBreakdown> = {} as any;
  for (const key of Object.keys(subjectsMap) as SubjectCode[]) {
    const s = subjectsMap[key];
    const accuracy =
      s.attempted > 0 ? Number(((s.correct / s.attempted) * 100).toFixed(1)) : 0;
    subjectBreakdown[key] = {
      ...s,
      score: Number(s.score.toFixed(2)),
      maxMarks: Number(s.maxMarks.toFixed(2)),
      accuracyPercentage: accuracy,
    };
  }

  const attemptedCount = correctCount + incorrectCount;
  const overallAccuracy =
    attemptedCount > 0
      ? Number(((correctCount / attemptedCount) * 100).toFixed(1))
      : 0;

  const attemptId = `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const submittedAt = new Date().toISOString();

  const attempt: TestAttempt = {
    id: attemptId,
    userId,
    mockTestId,
    mockTestTitle,
    startedAt,
    submittedAt,
    status: "completed",
    timeSpentSeconds,
    totalScore: Number(totalScore.toFixed(2)),
    maxMarks: Number(maxMarks.toFixed(2)),
    accuracyPercentage: overallAccuracy,
    correctCount,
    incorrectCount,
    unansweredCount,
    subjectBreakdown,
    createdAt: submittedAt,
  };

  return {
    attempt,
    reviewItems,
  };
}
