import { NextRequest, NextResponse } from "next/server";
import { dbRepository } from "@/lib/db/repository";
import { calculateExamScore } from "@/lib/services/scoring";
import { getCurrentUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { testId: string } }
) {
  try {
    const { testId } = params;
    const body = await request.json();

    const currentUser = await getCurrentUser();

    const {
      userId = currentUser?.id || `user-${Date.now()}`,
      candidateName = currentUser?.fullName || "Candidate",
      candidateEmail = currentUser?.email || "",
      startedAt = new Date().toISOString(),
      submittedAnswers = {},
      reviewFlags = {},
      timeSpentSeconds = 0,
    } = body;

    const test = await dbRepository.getMockTestById(testId);
    if (!test) {
      return NextResponse.json(
        { error: "Invalid mock test submission target" },
        { status: 400 }
      );
    }

    // Authoritative Server-side Question Key Retrieval
    const authoritativeQuestions =
      await dbRepository.getAuthoritativeQuestionsForTest(testId);

    if (!authoritativeQuestions || authoritativeQuestions.length === 0) {
      return NextResponse.json(
        { error: "No authoritative questions found for scoring this test." },
        { status: 500 }
      );
    }

    // Authoritative calculation
    const result = calculateExamScore({
      mockTestId: test.id,
      mockTestTitle: test.title,
      userId,
      startedAt,
      durationMinutes: test.durationMinutes,
      positiveMarks: test.positiveMarks,
      negativeMarks: test.negativeMarks,
      submittedAnswers,
      reviewFlags,
      timeSpentSeconds,
      allQuestions: authoritativeQuestions,
    });

    // Save attempt and answers with actual candidate credentials
    await dbRepository.saveTestAttempt(
      result.attempt,
      result.reviewItems,
      { name: candidateName, email: candidateEmail }
    );

    return NextResponse.json({
      success: true,
      attemptId: result.attempt.id,
      totalScore: result.attempt.totalScore,
      maxMarks: result.attempt.maxMarks,
      accuracy: result.attempt.accuracyPercentage,
      redirectUrl: `/tests/${testId}/results/${result.attempt.id}`,
    });
  } catch (error: any) {
    console.error("Test submission evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate exam submission" },
      { status: 500 }
    );
  }
}
