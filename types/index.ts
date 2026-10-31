export type UserRole = 'student' | 'admin';

export type TargetExam = 'SSC CGL' | 'SSC CHSL' | 'BOTH';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  targetExam?: TargetExam;
  avatarUrl?: string;
  createdAt: string;
}

export type SubjectCode = 'REASONING' | 'QUANTITATIVE' | 'ENGLISH' | 'AWARENESS';

export interface Subject {
  id: string;
  code: SubjectCode;
  name: string;
  orderIndex: number;
  iconName?: string;
}

export interface Exam {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'SSC';
  tier: string;
  isPublished: boolean;
  totalMockTests?: number;
  featured?: boolean;
  createdAt: string;
}

export type QuestionOptionId = 'A' | 'B' | 'C' | 'D';

export interface QuestionOption {
  id: QuestionOptionId;
  text: string;
}

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  subjectId: string;
  subjectCode: SubjectCode;
  questionText: string;
  options: QuestionOption[];
  correctOption: QuestionOptionId;
  explanation: string;
  difficulty: QuestionDifficulty;
  topic: string;
  language: 'English' | 'Hindi';
  defaultPositiveMarks: number;
  defaultNegativeMarks: number;
  isPublished: boolean;
  createdAt: string;
}

/**
 * Public Question representation delivered to student during active test attempt.
 * Notice: correctOption and explanation are STRIPPED to guarantee exam security!
 */
export interface PublicQuestion {
  id: string;
  subjectId: string;
  subjectCode: SubjectCode;
  questionText: string;
  options: QuestionOption[];
  difficulty: QuestionDifficulty;
  topic: string;
  positiveMarks: number;
  negativeMarks: number;
  orderIndex: number;
}

export interface MockTest {
  id: string;
  examId: string;
  title: string;
  slug: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  positiveMarks: number;
  negativeMarks: number;
  isFree: boolean;
  priceInr: number;
  isPublished: boolean;
  instructions: string[];
  questionCount: number;
  examTitle?: string;
  createdAt: string;
}

export interface MockTestWithSections extends MockTest {
  sections: {
    subject: Subject;
    questionCount: number;
    positiveMarks: number;
    negativeMarks: number;
  }[];
}

export type PaletteStatus =
  | 'answered'
  | 'unanswered'
  | 'marked_for_review'
  | 'answered_and_marked'
  | 'not_visited';

export interface AttemptAnswerState {
  selectedOption: QuestionOptionId | null;
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
  visited: boolean;
}

export type AttemptStatus = 'in_progress' | 'completed' | 'abandoned';

export interface SubjectBreakdown {
  subjectCode: SubjectCode;
  subjectName: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  score: number;
  maxMarks: number;
  accuracyPercentage: number;
}

export interface TestAttempt {
  id: string;
  userId: string;
  mockTestId: string;
  mockTestTitle?: string;
  startedAt: string;
  submittedAt?: string;
  status: AttemptStatus;
  timeSpentSeconds: number;
  totalScore: number;
  maxMarks: number;
  accuracyPercentage: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  subjectBreakdown: Record<SubjectCode, SubjectBreakdown>;
  createdAt: string;
}

export interface QuestionReviewItem {
  questionId: string;
  subjectCode: SubjectCode;
  subjectName: string;
  questionText: string;
  options: QuestionOption[];
  userSelectedOption: QuestionOptionId | null;
  correctOption: QuestionOptionId;
  isCorrect: boolean;
  isMarkedForReview: boolean;
  marksAwarded: number;
  explanation: string;
  topic: string;
  difficulty: QuestionDifficulty;
}

export interface AdminStats {
  totalStudents: number;
  totalExams: number;
  totalMockTests: number;
  totalQuestions: number;
  totalAttempts: number;
  averageScorePercentage: number;
}

export interface BulkImportRow {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: QuestionOptionId;
  explanation: string;
  subject: SubjectCode;
  topic: string;
  difficulty: QuestionDifficulty;
  positiveMarks?: number;
  negativeMarks?: number;
}

export interface BulkImportResult {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  errors: { row: number; message: string }[];
  importedQuestions: Question[];
}
