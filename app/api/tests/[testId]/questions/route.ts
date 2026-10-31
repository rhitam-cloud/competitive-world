import { NextRequest, NextResponse } from "next/server";
import { dbRepository } from "@/lib/db/repository";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { testId: string } }
) {
  try {
    const { testId } = params;
    const test = await dbRepository.getMockTestById(testId);

    if (!test) {
      return NextResponse.json(
        { error: "Mock test not found" },
        { status: 404 }
      );
    }

    // Fetches sanitized questions with NO answer keys or explanations!
    const questions = await dbRepository.getPublicQuestionsForTest(testId);

    return NextResponse.json({
      test,
      questions,
    });
  } catch (error: any) {
    console.error("Failed to load test questions:", error);
    return NextResponse.json(
      { error: "Internal server error loading test" },
      { status: 500 }
    );
  }
}
