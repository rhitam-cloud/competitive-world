-- ==============================================================================
-- Competitive World: Relational Schema & Row Level Security (RLS) Migrations
-- Target: Supabase / PostgreSQL 15+
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    target_exam TEXT DEFAULT 'SSC CGL' CHECK (target_exam IN ('SSC CGL', 'SSC CHSL', 'BOTH')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. EXAMS TABLE
CREATE TABLE IF NOT EXISTS public.exams (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'SSC',
    tier TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. SUBJECTS TABLE
CREATE TABLE IF NOT EXISTS public.subjects (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1
);

-- 4. QUESTIONS TABLE (Complete Question Bank)
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE RESTRICT,
    subject_code TEXT NOT NULL,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of { id: "A"|"B"|"C"|"D", text: string }
    correct_option TEXT NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
    explanation TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    topic TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'English',
    default_positive_marks NUMERIC(4,2) NOT NULL DEFAULT 2.0,
    default_negative_marks NUMERIC(4,2) NOT NULL DEFAULT 0.5,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. MOCK TESTS TABLE
CREATE TABLE IF NOT EXISTS public.mock_tests (
    id TEXT PRIMARY KEY,
    exam_id TEXT NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    total_marks NUMERIC(6,2) NOT NULL DEFAULT 40.0,
    positive_marks NUMERIC(4,2) NOT NULL DEFAULT 2.0,
    negative_marks NUMERIC(4,2) NOT NULL DEFAULT 0.5,
    is_free BOOLEAN NOT NULL DEFAULT true,
    price_inr NUMERIC(10,2) NOT NULL DEFAULT 0.0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. MOCK TEST QUESTIONS JUNCTION
CREATE TABLE IF NOT EXISTS public.mock_test_questions (
    mock_test_id TEXT NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL REFERENCES public.subjects(id),
    question_order INTEGER NOT NULL DEFAULT 1,
    positive_marks NUMERIC(4,2) NOT NULL DEFAULT 2.0,
    negative_marks NUMERIC(4,2) NOT NULL DEFAULT 0.5,
    PRIMARY KEY (mock_test_id, question_id)
);

-- 7. TEST ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS public.test_attempts (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    mock_test_id TEXT NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    submitted_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    total_score NUMERIC(6,2) NOT NULL DEFAULT 0.0,
    max_marks NUMERIC(6,2) NOT NULL DEFAULT 0.0,
    accuracy_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    correct_count INTEGER NOT NULL DEFAULT 0,
    incorrect_count INTEGER NOT NULL DEFAULT 0,
    unanswered_count INTEGER NOT NULL DEFAULT 0,
    subject_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. ATTEMPT ANSWERS TABLE
CREATE TABLE IF NOT EXISTS public.attempt_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id TEXT NOT NULL REFERENCES public.test_attempts(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    selected_option TEXT CHECK (selected_option IN ('A', 'B', 'C', 'D')),
    is_marked_for_review BOOLEAN NOT NULL DEFAULT false,
    is_correct BOOLEAN NOT NULL DEFAULT false,
    marks_awarded NUMERIC(4,2) NOT NULL DEFAULT 0.0,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(attempt_id, question_id)
);

-- 9. USER ENTITLEMENTS TABLE (Monetization Readiness)
CREATE TABLE IF NOT EXISTS public.user_entitlements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    mock_test_id TEXT REFERENCES public.mock_tests(id) ON DELETE CASCADE,
    access_type TEXT NOT NULL DEFAULT 'free' CHECK (access_type IN ('free', 'single_test_purchase', 'subscription_pass', 'admin_grant')),
    granted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_questions_subject ON public.questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic ON public.questions(topic);
CREATE INDEX IF NOT EXISTS idx_mock_tests_exam ON public.mock_tests(exam_id);
CREATE INDEX IF NOT EXISTS idx_test_attempts_user ON public.test_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_test_attempts_mock_test ON public.test_attempts(mock_test_id);
CREATE INDEX IF NOT EXISTS idx_attempt_answers_attempt ON public.attempt_answers(attempt_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can read their own profile; admins can read all
CREATE POLICY "Profiles are viewable by owner or admin"
ON public.profiles FOR SELECT
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Exams & Subjects: Anyone (even unauthenticated) can view published exams & subjects
CREATE POLICY "Public read for published exams"
ON public.exams FOR SELECT
USING (is_published = true OR public.is_admin());

CREATE POLICY "Admin write for exams"
ON public.exams FOR ALL
USING (public.is_admin());

CREATE POLICY "Public read for subjects"
ON public.subjects FOR SELECT
USING (true);

-- Mock Tests: Anyone can view published tests
CREATE POLICY "Public read for published mock tests"
ON public.mock_tests FOR SELECT
USING (is_published = true OR public.is_admin());

CREATE POLICY "Admin write for mock tests"
ON public.mock_tests FOR ALL
USING (public.is_admin());

-- Mock Test Questions:
CREATE POLICY "Public read for mock test questions"
ON public.mock_test_questions FOR SELECT
USING (true);

CREATE POLICY "Admin write for mock test questions"
ON public.mock_test_questions FOR ALL
USING (public.is_admin());

-- Questions: Admin has full access. Active attempts access via server-side action
CREATE POLICY "Admin full access to questions"
ON public.questions FOR ALL
USING (public.is_admin());

-- Test Attempts: Students can read & insert their own attempts
CREATE POLICY "Students can view own attempts"
ON public.test_attempts FOR SELECT
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Students can create own attempts"
ON public.test_attempts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update own attempts"
ON public.test_attempts FOR UPDATE
USING (auth.uid() = user_id OR public.is_admin());

-- Attempt Answers:
CREATE POLICY "Students can view own attempt answers"
ON public.attempt_answers FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.test_attempts
    WHERE id = attempt_answers.attempt_id AND (user_id = auth.uid() OR public.is_admin())
  )
);

CREATE POLICY "Students can insert own attempt answers"
ON public.attempt_answers FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.test_attempts
    WHERE id = attempt_answers.attempt_id AND user_id = auth.uid()
  )
);

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, target_exam)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student Candidate'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'target_exam', 'SSC CGL')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
