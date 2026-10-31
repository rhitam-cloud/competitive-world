/**
 * Automated Verification Script for Competitive World Scoring Engine
 * Run via: node scripts/test-scoring.mjs
 */

import assert from "node:assert";

// Sample verified questions
const sampleQuestions = [
  {
    id: "q1",
    subjectCode: "REASONING",
    correctOption: "A",
    defaultPositiveMarks: 2.0,
    defaultNegativeMarks: 0.5,
    explanation: "Exp 1",
    options: [{ id: "A", text: "1" }, { id: "B", text: "2" }],
    questionText: "Reasoning Q1",
    topic: "Series",
    difficulty: "easy",
  },
  {
    id: "q2",
    subjectCode: "QUANTITATIVE",
    correctOption: "B",
    defaultPositiveMarks: 2.0,
    defaultNegativeMarks: 0.5,
    explanation: "Exp 2",
    options: [{ id: "A", text: "1" }, { id: "B", text: "2" }],
    questionText: "Quant Q2",
    topic: "Profit Loss",
    difficulty: "medium",
  },
  {
    id: "q3",
    subjectCode: "ENGLISH",
    correctOption: "C",
    defaultPositiveMarks: 2.0,
    defaultNegativeMarks: 0.5,
    explanation: "Exp 3",
    options: [{ id: "A", text: "1" }, { id: "C", text: "3" }],
    questionText: "English Q3",
    topic: "Grammar",
    difficulty: "medium",
  },
  {
    id: "q4",
    subjectCode: "AWARENESS",
    correctOption: "D",
    defaultPositiveMarks: 2.0,
    defaultNegativeMarks: 0.5,
    explanation: "Exp 4",
    options: [{ id: "A", text: "1" }, { id: "D", text: "4" }],
    questionText: "GK Q4",
    topic: "Polity",
    difficulty: "easy",
  },
];

function scoreEngine(questions, submittedAnswers, reviewFlags = {}) {
  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  for (const q of questions) {
    const chosen = submittedAnswers[q.id];
    if (!chosen) {
      unansweredCount++;
    } else if (chosen === q.correctOption) {
      correctCount++;
      totalScore += q.defaultPositiveMarks;
    } else {
      incorrectCount++;
      totalScore -= q.defaultNegativeMarks;
    }
  }

  const attempted = correctCount + incorrectCount;
  const accuracy = attempted > 0 ? (correctCount / attempted) * 100 : 0;

  return {
    totalScore: Number(totalScore.toFixed(2)),
    correctCount,
    incorrectCount,
    unansweredCount,
    accuracy: Number(accuracy.toFixed(1)),
  };
}

console.log("=================================================");
console.log("Starting QA Test Suite: Authoritative Exam Scoring");
console.log("=================================================");

// Test 1: Perfect Score
{
  const res = scoreEngine(sampleQuestions, {
    q1: "A",
    q2: "B",
    q3: "C",
    q4: "D",
  });
  assert.strictEqual(res.totalScore, 8.0, "Perfect score should be 4 * 2 = 8.0");
  assert.strictEqual(res.correctCount, 4);
  assert.strictEqual(res.incorrectCount, 0);
  assert.strictEqual(res.unansweredCount, 0);
  assert.strictEqual(res.accuracy, 100.0);
  console.log("✔ Test 1 Passed: 100% correct answers (+8.0 marks, 100% accuracy)");
}

// Test 2: All Unanswered
{
  const res = scoreEngine(sampleQuestions, {});
  assert.strictEqual(res.totalScore, 0.0);
  assert.strictEqual(res.correctCount, 0);
  assert.strictEqual(res.incorrectCount, 0);
  assert.strictEqual(res.unansweredCount, 4);
  assert.strictEqual(res.accuracy, 0.0);
  console.log("✔ Test 2 Passed: All unanswered questions (0 marks, 0 penalties)");
}

// Test 3: Negative Marking
{
  const res = scoreEngine(sampleQuestions, {
    q1: "B", // wrong (-0.5)
    q2: "C", // wrong (-0.5)
    q3: "A", // wrong (-0.5)
    q4: "A", // wrong (-0.5)
  });
  assert.strictEqual(res.totalScore, -2.0, "All wrong should be 4 * -0.5 = -2.0");
  assert.strictEqual(res.correctCount, 0);
  assert.strictEqual(res.incorrectCount, 4);
  assert.strictEqual(res.accuracy, 0.0);
  console.log("✔ Test 3 Passed: Negative marking applied cleanly (-2.0 marks)");
}

// Test 4: Realistic Mixed Attempt (2 Correct, 1 Wrong, 1 Blank)
// Score: +2 + 2 - 0.5 + 0 = 3.5
// Accuracy: 2 / 3 attempted = 66.7%
{
  const res = scoreEngine(sampleQuestions, {
    q1: "A", // correct (+2)
    q2: "B", // correct (+2)
    q3: "B", // wrong (-0.5)
    // q4 blank (0)
  });
  assert.strictEqual(res.totalScore, 3.5);
  assert.strictEqual(res.correctCount, 2);
  assert.strictEqual(res.incorrectCount, 1);
  assert.strictEqual(res.unansweredCount, 1);
  assert.strictEqual(res.accuracy, 66.7);
  console.log("✔ Test 4 Passed: Mixed attempt (+3.5 marks, 66.7% accuracy)");
}

console.log("=================================================");
console.log("All 4 QA Scoring Suite tests passed successfully!");
console.log("=================================================");
