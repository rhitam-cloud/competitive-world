import fs from "fs";
import path from "path";
import {
  AdminStats,
  BulkImportResult,
  BulkImportRow,
  Exam,
  MockTest,
  PublicQuestion,
  Question,
  QuestionReviewItem,
  Subject,
  TestAttempt,
  UserProfile,
} from "@/types";
import {
  DEMO_USERS,
  MOCK_EXAMS,
  MOCK_QUESTIONS,
  MOCK_SUBJECTS,
  MOCK_TESTS,
} from "./mock-data";
import { isSupabaseConfigured } from "../supabase/client";
import { getSupabaseServerClient } from "../supabase/server";

interface RuntimeDataStore {
  users: UserProfile[];
  questions: Question[];
  mockTests: MockTest[];
  exams: Exam[];
  attempts: (TestAttempt & { candidateName?: string; candidateEmail?: string })[];
  reviewItems: Record<string, QuestionReviewItem[]>;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

declare global {
  // eslint-disable-next-line no-var
  var __CW_DATA_STORE__: RuntimeDataStore | undefined;
}

function getInitialStore(): RuntimeDataStore {
  return {
    users: [...DEMO_USERS],
    questions: [...MOCK_QUESTIONS],
    mockTests: [...MOCK_TESTS],
    exams: [...MOCK_EXAMS],
    attempts: [
      {
        id: "att-demo-previous",
        userId: "user-student-demo",
        candidateName: "Arjun Sharma",
        candidateEmail: "student@competitiveworld.in",
        mockTestId: "test-cgl-01",
        mockTestTitle: "SSC CGL 2026 Tier 1 - All India Full Mock Test 01",
        startedAt: "2026-01-20T10:00:00Z",
        submittedAt: "2026-01-20T10:48:30Z",
        status: "completed",
        timeSpentSeconds: 2910,
        totalScore: 28.5,
        maxMarks: 40.0,
        accuracyPercentage: 78.9,
        correctCount: 15,
        incorrectCount: 3,
        unansweredCount: 2,
        subjectBreakdown: {
          REASONING: {
            subjectCode: "REASONING",
            subjectName: "General Intelligence & Reasoning",
            totalQuestions: 5,
            attempted: 5,
            correct: 4,
            incorrect: 1,
            unanswered: 0,
            score: 7.5,
            maxMarks: 10,
            accuracyPercentage: 80,
          },
          QUANTITATIVE: {
            subjectCode: "QUANTITATIVE",
            subjectName: "Quantitative Aptitude",
            totalQuestions: 5,
            attempted: 4,
            correct: 3,
            incorrect: 1,
            unanswered: 1,
            score: 5.5,
            maxMarks: 10,
            accuracyPercentage: 75,
          },
          ENGLISH: {
            subjectCode: "ENGLISH",
            subjectName: "English Language & Comprehension",
            totalQuestions: 5,
            attempted: 5,
            correct: 4,
            incorrect: 1,
            unanswered: 0,
            score: 7.5,
            maxMarks: 10,
            accuracyPercentage: 80,
          },
          AWARENESS: {
            subjectCode: "AWARENESS",
            subjectName: "General Awareness",
            totalQuestions: 5,
            attempted: 4,
            correct: 4,
            incorrect: 0,
            unanswered: 1,
            score: 8.0,
            maxMarks: 10,
            accuracyPercentage: 100,
          },
        },
        createdAt: "2026-01-20T10:48:30Z",
      },
    ],
    reviewItems: {},
  };
}

function saveStoreToFile(store: RuntimeDataStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving store to file:", err);
  }
}

function loadStoreFromFile(): RuntimeDataStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.attempts)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error loading store from file:", err);
  }
  const initial = getInitialStore();
  saveStoreToFile(initial);
  return initial;
}

function getStore(): RuntimeDataStore {
  if (!globalThis.__CW_DATA_STORE__) {
    globalThis.__CW_DATA_STORE__ = loadStoreFromFile();
  }
  return globalThis.__CW_DATA_STORE__;
}

function mutateStore<T>(fn: (store: RuntimeDataStore) => T): T {
  const store = getStore();
  const result = fn(store);
  saveStoreToFile(store);
  return result;
}

/**
 * Unified Repository Layer
 */
export const dbRepository = {
  // -------------------------------------------------------------
  // USERS & CANDIDATE PROFILES
  // -------------------------------------------------------------
  async registerUser(userData: {
    fullName: string;
    email: string;
    targetExam?: any;
    role?: any;
  }): Promise<UserProfile> {
    return mutateStore((store) => {
      const existing = store.users.find(
        (u) => u.email.toLowerCase() === userData.email.toLowerCase()
      );
      if (existing) {
        existing.fullName = userData.fullName || existing.fullName;
        existing.targetExam = userData.targetExam || existing.targetExam;
        return existing;
      }

      const newUser: UserProfile = {
        id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        email: userData.email.trim().toLowerCase(),
        fullName: userData.fullName.trim(),
        role: userData.role || "student",
        targetExam: userData.targetExam || "SSC CGL",
        createdAt: new Date().toISOString(),
      };

      store.users.push(newUser);
      return newUser;
    });
  },

  async getUserByEmail(email: string): Promise<UserProfile | null> {
    const store = getStore();
    const user = store.users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    return user || null;
  },

  async getUserById(id: string): Promise<UserProfile | null> {
    const store = getStore();
    const user = store.users.find((u) => u.id === id);
    return user || null;
  },

  // -------------------------------------------------------------
  // SUBJECTS & EXAMS
  // -------------------------------------------------------------
  async getSubjects(): Promise<Subject[]> {
    return MOCK_SUBJECTS;
  },

  async getExams(): Promise<Exam[]> {
    if (isSupabaseConfigured()) {
      try {
        const supabase = await getSupabaseServerClient();
        if (supabase) {
          const { data, error } = await supabase
            .from("exams")
            .select("*")
            .order("created_at", { ascending: true });
          if (!error && data && data.length > 0) return data as Exam[];
        }
      } catch (err) {
        console.warn("Supabase query failed, using runtime fallback:", err);
      }
    }
    return getStore().exams;
  },

  async getExamBySlug(slug: string): Promise<Exam | null> {
    const exams = await this.getExams();
    return exams.find((e) => e.slug === slug || e.id === slug) || null;
  },

  async createExam(exam: Omit<Exam, "createdAt">): Promise<Exam> {
    return mutateStore((store) => {
      const newExam: Exam = {
        ...exam,
        createdAt: new Date().toISOString(),
      };
      store.exams.unshift(newExam);
      return newExam;
    });
  },

  // -------------------------------------------------------------
  // MOCK TESTS
  // -------------------------------------------------------------
  async getMockTests(filters?: {
    examId?: string;
    isFree?: boolean;
    search?: string;
  }): Promise<MockTest[]> {
    let tests = [...getStore().mockTests];

    if (filters?.examId && filters.examId !== "all") {
      tests = tests.filter((t) => t.examId === filters.examId);
    }
    if (filters?.isFree !== undefined) {
      tests = tests.filter((t) => t.isFree === filters.isFree);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      tests = tests.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return tests;
  },

  async getMockTestById(id: string): Promise<MockTest | null> {
    let store = getStore();
    let test = store.mockTests.find((t) => t.id === id || t.slug === id);
    if (!test) {
      store = loadStoreFromFile();
      globalThis.__CW_DATA_STORE__ = store;
      test = store.mockTests.find((t) => t.id === id || t.slug === id);
    }
    return test || null;
  },

  async createMockTest(testData: Partial<MockTest>): Promise<MockTest> {
    return mutateStore((store) => {
      const id = `test-${Date.now()}`;
      const newTest: MockTest = {
        id,
        examId: testData.examId || "exam-ssc-cgl",
        title: testData.title || "New Mock Test",
        slug: (testData.title || "new-mock-test")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-"),
        description: testData.description || "",
        durationMinutes: testData.durationMinutes || 60,
        totalMarks: testData.totalMarks || 40,
        positiveMarks: testData.positiveMarks || 2.0,
        negativeMarks: testData.negativeMarks || 0.5,
        isFree: testData.isFree ?? true,
        priceInr: testData.priceInr || 0,
        isPublished: testData.isPublished ?? true,
        instructions: testData.instructions || [
          "Read all questions carefully.",
          "Total time will be counted down automatically.",
        ],
        questionCount: testData.questionCount || 20,
        createdAt: new Date().toISOString(),
      };
      store.mockTests.unshift(newTest);
      return newTest;
    });
  },

  async updateMockTest(
    id: string,
    updates: Partial<MockTest>
  ): Promise<MockTest | null> {
    return mutateStore((store) => {
      const idx = store.mockTests.findIndex((t) => t.id === id);
      if (idx === -1) return null;
      store.mockTests[idx] = { ...store.mockTests[idx], ...updates };
      return store.mockTests[idx];
    });
  },

  // -------------------------------------------------------------
  // SECURE TEST QUESTIONS
  // -------------------------------------------------------------
  async getPublicQuestionsForTest(
    mockTestId: string
  ): Promise<PublicQuestion[]> {
    const test = await this.getMockTestById(mockTestId);
    const posMarks = test?.positiveMarks || 2.0;
    const negMarks = test?.negativeMarks || 0.5;

    const available = getStore().questions.filter((q) => q.isPublished).slice(0, 20);

    return available.map((q, index) => ({
      id: q.id,
      subjectId: q.subjectId,
      subjectCode: q.subjectCode,
      questionText: q.questionText,
      options: q.options,
      difficulty: q.difficulty,
      topic: q.topic,
      positiveMarks: q.defaultPositiveMarks || posMarks,
      negativeMarks: q.defaultNegativeMarks || negMarks,
      orderIndex: index + 1,
    }));
  },

  async getAuthoritativeQuestionsForTest(
    mockTestId: string
  ): Promise<Question[]> {
    return getStore().questions.filter((q) => q.isPublished).slice(0, 20);
  },

  // -------------------------------------------------------------
  // QUESTION BANK (ADMIN)
  // -------------------------------------------------------------
  async getAllQuestions(filters?: {
    subjectCode?: string;
    difficulty?: string;
    search?: string;
  }): Promise<Question[]> {
    let list = [...getStore().questions];
    if (filters?.subjectCode && filters.subjectCode !== "all") {
      list = list.filter((q) => q.subjectCode === filters.subjectCode);
    }
    if (filters?.difficulty && filters.difficulty !== "all") {
      list = list.filter((q) => q.difficulty === filters.difficulty);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (item) =>
          item.questionText.toLowerCase().includes(q) ||
          item.topic.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async createQuestion(questionData: Partial<Question>): Promise<Question> {
    return mutateStore((store) => {
      const id = `q-${Date.now()}`;
      const newQ: Question = {
        id,
        subjectId: questionData.subjectId || "sub-gir",
        subjectCode: questionData.subjectCode || "REASONING",
        questionText: questionData.questionText || "Sample question",
        options: questionData.options || [
          { id: "A", text: "Option A" },
          { id: "B", text: "Option B" },
          { id: "C", text: "Option C" },
          { id: "D", text: "Option D" },
        ],
        correctOption: questionData.correctOption || "A",
        explanation: questionData.explanation || "Sample explanation.",
        difficulty: questionData.difficulty || "medium",
        topic: questionData.topic || "General",
        language: questionData.language || "English",
        defaultPositiveMarks: questionData.defaultPositiveMarks || 2.0,
        defaultNegativeMarks: questionData.defaultNegativeMarks || 0.5,
        isPublished: questionData.isPublished ?? true,
        createdAt: new Date().toISOString(),
      };
      store.questions.unshift(newQ);
      return newQ;
    });
  },

  async updateQuestion(
    id: string,
    updates: Partial<Question>
  ): Promise<Question | null> {
    return mutateStore((store) => {
      const idx = store.questions.findIndex((q) => q.id === id);
      if (idx === -1) return null;
      store.questions[idx] = { ...store.questions[idx], ...updates };
      return store.questions[idx];
    });
  },

  async deleteQuestion(id: string): Promise<boolean> {
    return mutateStore((store) => {
      const idx = store.questions.findIndex((q) => q.id === id);
      if (idx === -1) return false;
      store.questions.splice(idx, 1);
      return true;
    });
  },

  // -------------------------------------------------------------
  // BULK CSV IMPORT
  // -------------------------------------------------------------
  async bulkImportQuestions(rows: BulkImportRow[]): Promise<BulkImportResult> {
    const errors: { row: number; message: string }[] = [];
    const importedQuestions: Question[] = [];

    const subjectMap: Record<string, { id: string; code: any }> = {
      REASONING: { id: "sub-gir", code: "REASONING" },
      QUANTITATIVE: { id: "sub-qa", code: "QUANTITATIVE" },
      ENGLISH: { id: "sub-eng", code: "ENGLISH" },
      AWARENESS: { id: "sub-ga", code: "AWARENESS" },
    };

    mutateStore((store) => {
      rows.forEach((row, idx) => {
        const rowNum = idx + 2;
        if (!row.questionText || row.questionText.trim().length < 5) {
          errors.push({ row: rowNum, message: "Question text is required and too short." });
          return;
        }
        if (!row.optionA || !row.optionB || !row.optionC || !row.optionD) {
          errors.push({ row: rowNum, message: "All 4 options (A, B, C, D) are required." });
          return;
        }
        if (!["A", "B", "C", "D"].includes(row.correctOption)) {
          errors.push({ row: rowNum, message: `Invalid correct option '${row.correctOption}'. Must be A, B, C, or D.` });
          return;
        }

        const subKey = (row.subject || "REASONING").toUpperCase();
        const mappedSubject = subjectMap[subKey] || subjectMap.REASONING;

        const newQ: Question = {
          id: `q-import-${Date.now()}-${idx}`,
          subjectId: mappedSubject.id,
          subjectCode: mappedSubject.code,
          questionText: row.questionText.trim(),
          options: [
            { id: "A", text: row.optionA.trim() },
            { id: "B", text: row.optionB.trim() },
            { id: "C", text: row.optionC.trim() },
            { id: "D", text: row.optionD.trim() },
          ],
          correctOption: row.correctOption,
          explanation: row.explanation?.trim() || "No detailed explanation provided.",
          difficulty: (["easy", "medium", "hard"].includes(row.difficulty) ? row.difficulty : "medium") as any,
          topic: row.topic?.trim() || "General Practice",
          language: "English",
          defaultPositiveMarks: Number(row.positiveMarks) || 2.0,
          defaultNegativeMarks: Number(row.negativeMarks) || 0.5,
          isPublished: true,
          createdAt: new Date().toISOString(),
        };

        store.questions.unshift(newQ);
        importedQuestions.push(newQ);
      });
    });

    return {
      totalRows: rows.length,
      validRows: importedQuestions.length,
      invalidRows: errors.length,
      errors,
      importedQuestions,
    };
  },

  // -------------------------------------------------------------
  // TEST ATTEMPTS & RESULTS
  // -------------------------------------------------------------
  async saveTestAttempt(
    attempt: TestAttempt,
    reviewItems: QuestionReviewItem[],
    candidateInfo?: { name: string; email: string }
  ): Promise<TestAttempt> {
    return mutateStore((store) => {
      const enhancedAttempt = {
        ...attempt,
        candidateName: candidateInfo?.name || "Candidate",
        candidateEmail: candidateInfo?.email || "",
      };
      store.attempts.unshift(enhancedAttempt);
      store.reviewItems[attempt.id] = reviewItems;
      return attempt;
    });
  },

  async getTestAttempt(
    attemptId: string,
    userId?: string
  ): Promise<{ attempt: (TestAttempt & { candidateName?: string }) | null; reviewItems: QuestionReviewItem[] }> {
    let store = getStore();
    let attempt = store.attempts.find((a) => a.id === attemptId);
    if (!attempt) {
      // Re-read from disk in case updated by another worker/process
      store = loadStoreFromFile();
      globalThis.__CW_DATA_STORE__ = store;
      attempt = store.attempts.find((a) => a.id === attemptId);
    }
    if (!attempt) {
      return { attempt: null, reviewItems: [] };
    }
    const reviewItems = store.reviewItems[attemptId] || [];
    return { attempt, reviewItems };
  },

  async getUserAttempts(userId: string): Promise<TestAttempt[]> {
    return getStore().attempts.filter((a) => a.userId === userId);
  },

  async getAllAttempts(): Promise<(TestAttempt & { candidateName?: string; candidateEmail?: string })[]> {
    return getStore().attempts;
  },

  // -------------------------------------------------------------
  // ADMIN STATS
  // -------------------------------------------------------------
  async getAdminStats(): Promise<AdminStats> {
    const store = getStore();
    const totalAttempts = store.attempts.length;
    const avgScore =
      totalAttempts > 0
        ? Number(
            (
              store.attempts.reduce(
                (acc, a) => acc + (a.totalScore / (a.maxMarks || 1)) * 100,
                0
              ) / totalAttempts
            ).toFixed(1)
          )
        : 0;

    return {
      totalStudents: store.users.filter((u) => u.role === "student").length,
      totalExams: store.exams.length,
      totalMockTests: store.mockTests.length,
      totalQuestions: store.questions.length,
      totalAttempts,
      averageScorePercentage: avgScore,
    };
  },
};
