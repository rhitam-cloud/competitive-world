-- ==============================================================================
-- Competitive World: Seed Data Script
-- Populates Subjects, Exams, 24 Verified Questions, and Mock Tests
-- ==============================================================================

-- 1. Insert Subjects
INSERT INTO public.subjects (id, code, name, order_index) VALUES
('sub-gir', 'REASONING', 'General Intelligence & Reasoning', 1),
('sub-qa', 'QUANTITATIVE', 'Quantitative Aptitude', 2),
('sub-eng', 'ENGLISH', 'English Language & Comprehension', 3),
('sub-ga', 'AWARENESS', 'General Awareness', 4)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Exams
INSERT INTO public.exams (id, slug, title, description, category, tier, is_published) VALUES
('exam-ssc-cgl', 'ssc-cgl', 'SSC CGL (Combined Graduate Level)', 'Premier examination conducted by SSC for recruitment to Group B and Group C Gazetted and Non-Gazetted posts in various Ministries and Departments.', 'SSC', 'Tier 1 & Tier 2', true),
('exam-ssc-chsl', 'ssc-chsl', 'SSC CHSL (10+2 Higher Secondary Level)', 'National examination for recruitment of Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO).', 'SSC', 'Tier 1', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Questions (24 Original Verified Questions)
INSERT INTO public.questions (id, subject_id, subject_code, question_text, options, correct_option, explanation, difficulty, topic, language, default_positive_marks, default_negative_marks, is_published) VALUES
-- Reasoning
('q-gir-01', 'sub-gir', 'REASONING', 'Select the option that is related to the third number in the same way as the second number is related to the first number: 12 : 156 :: 14 : ?',
 '[{"id":"A","text":"210"},{"id":"B","text":"196"},{"id":"C","text":"224"},{"id":"D","text":"182"}]'::jsonb,
 'A', 'Pattern: n : n * (n + 1). For 12: 12 * 13 = 156. For 14: 14 * 15 = 210.', 'medium', 'Number Analogy', 'English', 2.0, 0.5, true),

('q-gir-02', 'sub-gir', 'REASONING', 'In a certain code language, ''ROBUST'' is written as ''QNATRS''. How will ''ZODIAC'' be written in that code language?',
 '[{"id":"A","text":"YNCHZB"},{"id":"B","text":"YMCJAC"},{"id":"C","text":"XNCHZB"},{"id":"D","text":"YNDIBD"}]'::jsonb,
 'A', 'Pattern: Each letter is shifted by -1. Z-1=Y, O-1=N, D-1=C, I-1=H, A-1=Z, C-1=B. Result: YNCHZB.', 'easy', 'Coding-Decoding', 'English', 2.0, 0.5, true),

('q-gir-03', 'sub-gir', 'REASONING', 'Pointing to a photograph, Rohit said, ''She is the daughter of my grandfather''s only son.'' How is Rohit related to the girl in the photograph?',
 '[{"id":"A","text":"Cousin"},{"id":"B","text":"Brother"},{"id":"C","text":"Uncle"},{"id":"D","text":"Father"}]'::jsonb,
 'B', '''Grandfather''s only son'' is Rohit''s father. The girl is his father''s daughter, so she is Rohit''s sister. Rohit is her brother.', 'easy', 'Blood Relations', 'English', 2.0, 0.5, true),

('q-gir-04', 'sub-gir', 'REASONING', 'Statements: I. All pens are markers. II. Some markers are scales. Conclusions: 1. Some pens are scales. 2. All markers are pens.',
 '[{"id":"A","text":"Only conclusion 1 follows"},{"id":"B","text":"Only conclusion 2 follows"},{"id":"C","text":"Neither conclusion 1 nor 2 follows"},{"id":"D","text":"Both conclusions 1 and 2 follow"}]'::jsonb,
 'C', 'Middle term marker is not distributed, so no universal relation exists between pens and scales. Conversion of All pens are markers is Some markers are pens.', 'medium', 'Syllogism', 'English', 2.0, 0.5, true),

('q-gir-05', 'sub-gir', 'REASONING', 'Find the missing number in the series: 7, 11, 19, 31, 47, ?',
 '[{"id":"A","text":"63"},{"id":"B","text":"67"},{"id":"C","text":"71"},{"id":"D","text":"59"}]'::jsonb,
 'B', 'Differences between consecutive terms: +4, +8, +12, +16. Next difference is +20. 47 + 20 = 67.', 'medium', 'Number Series', 'English', 2.0, 0.5, true),

('q-gir-06', 'sub-gir', 'REASONING', 'Select the odd letter-cluster: (A) BDHF (B) CEIK (C) DFJL (D) EGLN',
 '[{"id":"A","text":"BDHF"},{"id":"B","text":"CEIK"},{"id":"C","text":"DFJL"},{"id":"D","text":"EGLN"}]'::jsonb,
 'A', 'Patterns: CEIK (+2, +4, +2), DFJL (+2, +4, +2), EGLN (+2, +4, +2). BDHF follows (+2, +4, -2) which deviates.', 'hard', 'Classification', 'English', 2.0, 0.5, true),

-- Quantitative Aptitude
('q-qa-01', 'sub-qa', 'QUANTITATIVE', 'A shopkeeper marks an article 30% above its cost price and offers a discount of 15% on the marked price. What is his overall gain percentage?',
 '[{"id":"A","text":"10.5%"},{"id":"B","text":"12%"},{"id":"C","text":"15%"},{"id":"D","text":"8.5%"}]'::jsonb,
 'A', 'CP = 100, MP = 130. Discount = 15% of 130 = 19.5. SP = 130 - 19.5 = 110.5. Gain% = 10.5%.', 'medium', 'Profit, Loss & Discount', 'English', 2.0, 0.5, true),

('q-qa-02', 'sub-qa', 'QUANTITATIVE', 'A can complete a piece of work alone in 12 days, while B can complete the same work alone in 18 days. If they work together for 4 days, what fraction of the work remains unfinished?',
 '[{"id":"A","text":"4/9"},{"id":"B","text":"5/9"},{"id":"C","text":"1/3"},{"id":"D","text":"2/5"}]'::jsonb,
 'A', 'LCM(12, 18) = 36 units. Rate A = 3, Rate B = 2. Together = 5 units/day. In 4 days = 20 units. Remaining = 16 units. Fraction = 16/36 = 4/9.', 'medium', 'Time and Work', 'English', 2.0, 0.5, true),

('q-qa-03', 'sub-qa', 'QUANTITATIVE', 'If x + 1/x = 4, find the value of x^3 + 1/x^3.',
 '[{"id":"A","text":"64"},{"id":"B","text":"52"},{"id":"C","text":"48"},{"id":"D","text":"56"}]'::jsonb,
 'B', 'x^3 + 1/x^3 = (x + 1/x)^3 - 3(x + 1/x) = 4^3 - 3(4) = 64 - 12 = 52.', 'easy', 'Algebra', 'English', 2.0, 0.5, true),

('q-qa-04', 'sub-qa', 'QUANTITATIVE', 'A train 180 metres long is running at a uniform speed of 54 km/h. How much time (in seconds) will it take to completely cross a stationary platform of length 270 metres?',
 '[{"id":"A","text":"25 seconds"},{"id":"B","text":"30 seconds"},{"id":"C","text":"32 seconds"},{"id":"D","text":"28 seconds"}]'::jsonb,
 'B', 'Total distance = 180 + 270 = 450 m. Speed = 54 * (5/18) = 15 m/s. Time = 450 / 15 = 30 seconds.', 'medium', 'Speed, Time and Distance', 'English', 2.0, 0.5, true),

('q-qa-05', 'sub-qa', 'QUANTITATIVE', 'The compound interest on ₹8,000 for 2 years at 10% per annum, compounded annually, is:',
 '[{"id":"A","text":"₹1,600"},{"id":"B","text":"₹1,680"},{"id":"C","text":"₹1,720"},{"id":"D","text":"₹1,580"}]'::jsonb,
 'B', 'Amount = 8000 * (1.1)^2 = ₹9,680. CI = 9680 - 8000 = ₹1,680.', 'easy', 'Compound Interest', 'English', 2.0, 0.5, true),

('q-qa-06', 'sub-qa', 'QUANTITATIVE', 'In a circle with centre O and radius 13 cm, a chord PQ of length 24 cm is drawn. What is the perpendicular distance from the centre O to the chord PQ?',
 '[{"id":"A","text":"5 cm"},{"id":"B","text":"7 cm"},{"id":"C","text":"6 cm"},{"id":"D","text":"8 cm"}]'::jsonb,
 'A', 'Half chord = 12 cm. In right triangle OMP: OM = sqrt(13^2 - 12^2) = sqrt(25) = 5 cm.', 'medium', 'Geometry', 'English', 2.0, 0.5, true),

-- English Language
('q-eng-01', 'sub-eng', 'ENGLISH', 'Identify the segment containing grammatical error: ''Neither the manager (A) / nor his assistants (B) / was present at (C) / the annual budget conference (D).''',
 '[{"id":"A","text":"Neither the manager"},{"id":"B","text":"nor his assistants"},{"id":"C","text":"was present at"},{"id":"D","text":"the annual budget conference"}]'::jsonb,
 'C', 'With ''neither... nor'', verb agrees with closest subject. ''Assistants'' is plural, so correct verb is ''were present at''.', 'medium', 'Spotting Errors', 'English', 2.0, 0.5, true),

('q-eng-02', 'sub-eng', 'ENGLISH', 'Select the most appropriate ANTONYM of the given word: ''BENEVOLENT''',
 '[{"id":"A","text":"Generous"},{"id":"B","text":"Malevolent"},{"id":"C","text":"Magnanimous"},{"id":"D","text":"Sympathetic"}]'::jsonb,
 'B', '''Benevolent'' means kind and charitable. Its direct antonym is ''Malevolent'' (wishing evil upon others).', 'easy', 'Antonyms', 'English', 2.0, 0.5, true),

('q-eng-03', 'sub-eng', 'ENGLISH', 'Select the most appropriate meaning of the given idiom: ''To burn the candle at both ends''',
 '[{"id":"A","text":"To waste resources foolishly"},{"id":"B","text":"To work extremely hard from early morning until late night"},{"id":"C","text":"To be indifferent to danger"},{"id":"D","text":"To cause friction among friends"}]'::jsonb,
 'B', 'Means exhausting oneself by working tirelessly without adequate rest.', 'medium', 'Idioms & Phrases', 'English', 2.0, 0.5, true),

('q-eng-04', 'sub-eng', 'ENGLISH', 'Select the one-word substitution: ''A person who compiles dictionaries''',
 '[{"id":"A","text":"Calligrapher"},{"id":"B","text":"Lexicographer"},{"id":"C","text":"Cartographer"},{"id":"D","text":"Bibliophile"}]'::jsonb,
 'B', 'A lexicographer compiles dictionaries.', 'easy', 'One Word Substitution', 'English', 2.0, 0.5, true),

('q-eng-05', 'sub-eng', 'ENGLISH', 'Select the correctly spelt word:',
 '[{"id":"A","text":"Accomodation"},{"id":"B","text":"Accommodation"},{"id":"C","text":"Acommodation"},{"id":"D","text":"Acomodation"}]'::jsonb,
 'B', 'Correct spelling has double c and double m: Accommodation.', 'easy', 'Spelling Check', 'English', 2.0, 0.5, true),

('q-eng-06', 'sub-eng', 'ENGLISH', 'Select the passive voice: ''The municipal corporation has repaired all the potholes on the main highway.''',
 '[{"id":"A","text":"All the potholes on the main highway had been repaired by the municipal corporation."},{"id":"B","text":"All the potholes on the main highway have been repaired by the municipal corporation."},{"id":"C","text":"All the potholes on the main highway were repaired by the municipal corporation."},{"id":"D","text":"All the potholes on the main highway are being repaired by the municipal corporation."}]'::jsonb,
 'B', 'Present perfect passive: has/have been + V3. Potholes is plural, so ''have been repaired''.', 'medium', 'Active & Passive Voice', 'English', 2.0, 0.5, true),

-- General Awareness
('q-ga-01', 'sub-ga', 'AWARENESS', 'Which Article of the Constitution of India provides for the ''Right to Constitutional Remedies'' allowing citizens to move the Supreme Court for enforcement of Fundamental Rights?',
 '[{"id":"A","text":"Article 21"},{"id":"B","text":"Article 32"},{"id":"C","text":"Article 19"},{"id":"D","text":"Article 44"}]'::jsonb,
 'B', 'Article 32 was hailed by Dr. B.R. Ambedkar as the Heart and Soul of the Indian Constitution.', 'easy', 'Indian Polity & Constitution', 'English', 2.0, 0.5, true),

('q-ga-02', 'sub-ga', 'AWARENESS', 'Who was the Viceroy of India when the Indian National Congress was founded in Bombay in December 1885?',
 '[{"id":"A","text":"Lord Curzon"},{"id":"B","text":"Lord Dufferin"},{"id":"C","text":"Lord Ripon"},{"id":"D","text":"Lord Lytton"}]'::jsonb,
 'B', 'Lord Dufferin was Viceroy (1884-1888) when INC was established under A.O. Hume.', 'medium', 'Modern Indian History', 'English', 2.0, 0.5, true),

('q-ga-03', 'sub-ga', 'AWARENESS', 'Which layer of the atmosphere contains the ozone layer responsible for absorbing harmful ultraviolet (UV) solar radiation?',
 '[{"id":"A","text":"Troposphere"},{"id":"B","text":"Mesosphere"},{"id":"C","text":"Stratosphere"},{"id":"D","text":"Thermosphere"}]'::jsonb,
 'C', 'The stratosphere extends 12-50 km above Earth and harbors the protective ozone layer.', 'easy', 'Physical Geography', 'English', 2.0, 0.5, true),

('q-ga-04', 'sub-ga', 'AWARENESS', 'Which vitamin is water-soluble and acts as a powerful antioxidant essential for collagen synthesis and tissue repair in the human body?',
 '[{"id":"A","text":"Vitamin A"},{"id":"B","text":"Vitamin D"},{"id":"C","text":"Vitamin C (Ascorbic acid)"},{"id":"D","text":"Vitamin K"}]'::jsonb,
 'C', 'Vitamin C (Ascorbic acid) is water-soluble and essential for collagen formation and immune function.', 'easy', 'General Science (Biology)', 'English', 2.0, 0.5, true),

('q-ga-05', 'sub-ga', 'AWARENESS', 'In the context of the Indian economy, which term defines the interest rate at which the Reserve Bank of India (RBI) lends money to commercial banks against government securities for short-term liquidity needs?',
 '[{"id":"A","text":"Reverse Repo Rate"},{"id":"B","text":"Repo Rate"},{"id":"C","text":"Bank Rate"},{"id":"D","text":"Cash Reserve Ratio"}]'::jsonb,
 'B', 'Repo Rate is the benchmark policy rate at which RBI lends short-term liquidity to banks.', 'medium', 'Indian Economy', 'English', 2.0, 0.5, true),

('q-ga-06', 'sub-ga', 'AWARENESS', 'Which classical dance form originates from the state of Kerala and is distinguished by elaborate facial makeup, billowing skirts, and dramatic dance-drama storytelling?',
 '[{"id":"A","text":"Kathakali"},{"id":"B","text":"Kuchipudi"},{"id":"C","text":"Bharatanatyam"},{"id":"D","text":"Kathak"}]'::jsonb,
 'A', 'Kathakali originates in Kerala and is famed for Vesham makeup and epic storytelling.', 'easy', 'Art & Culture', 'English', 2.0, 0.5, true)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Mock Tests
INSERT INTO public.mock_tests (id, exam_id, title, slug, description, duration_minutes, total_marks, positive_marks, negative_marks, is_free, price_inr, is_published, instructions) VALUES
('test-cgl-01', 'exam-ssc-cgl', 'SSC CGL 2026 Tier 1 - All India Full Mock Test 01', 'ssc-cgl-tier-1-full-mock-01',
 'Full-length exam simulation covering all 4 sections based on latest TCS/SSC pattern. Includes detailed step-by-step explanations and national percentile comparison.',
 60, 40.0, 2.0, 0.5, true, 0.0, true,
 '["The test consists of 4 sections: Reasoning, Quantitative Aptitude, English, and General Awareness.","Each question carries 2 marks for a correct answer.","A negative mark of 0.5 marks will be deducted for every incorrect response.","No marks will be deducted for unattempted questions.","The timer in the top-right corner displays remaining time.","You can mark questions for review and revisit them before final submission."]'::jsonb),

('test-chsl-01', 'exam-ssc-chsl', 'SSC CHSL (10+2) Tier 1 - Speed & Accuracy Mock 01', 'ssc-chsl-tier-1-speed-mock-01',
 'Targeted speed-building mock test for SSC CHSL candidates. Focuses on high-yield questions, quick calculations, and grammatical precision.',
 45, 40.0, 2.0, 0.5, true, 0.0, true,
 '["Total test duration is 45 minutes.","Marking scheme: +2 for correct answer, -0.5 for wrong answer, 0 for unattempted.","You can switch between questions and sections freely using the Question Palette.","Save your response by clicking Save & Next."]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 5. Link Questions to Mock Tests
INSERT INTO public.mock_test_questions (mock_test_id, question_id, subject_id, question_order, positive_marks, negative_marks) VALUES
('test-cgl-01', 'q-gir-01', 'sub-gir', 1, 2.0, 0.5),
('test-cgl-01', 'q-gir-02', 'sub-gir', 2, 2.0, 0.5),
('test-cgl-01', 'q-gir-03', 'sub-gir', 3, 2.0, 0.5),
('test-cgl-01', 'q-gir-04', 'sub-gir', 4, 2.0, 0.5),
('test-cgl-01', 'q-gir-05', 'sub-gir', 5, 2.0, 0.5),
('test-cgl-01', 'q-qa-01', 'sub-qa', 6, 2.0, 0.5),
('test-cgl-01', 'q-qa-02', 'sub-qa', 7, 2.0, 0.5),
('test-cgl-01', 'q-qa-03', 'sub-qa', 8, 2.0, 0.5),
('test-cgl-01', 'q-qa-04', 'sub-qa', 9, 2.0, 0.5),
('test-cgl-01', 'q-qa-05', 'sub-qa', 10, 2.0, 0.5),
('test-cgl-01', 'q-eng-01', 'sub-eng', 11, 2.0, 0.5),
('test-cgl-01', 'q-eng-02', 'sub-eng', 12, 2.0, 0.5),
('test-cgl-01', 'q-eng-03', 'sub-eng', 13, 2.0, 0.5),
('test-cgl-01', 'q-eng-04', 'sub-eng', 14, 2.0, 0.5),
('test-cgl-01', 'q-eng-05', 'sub-eng', 15, 2.0, 0.5),
('test-cgl-01', 'q-ga-01', 'sub-ga', 16, 2.0, 0.5),
('test-cgl-01', 'q-ga-02', 'sub-ga', 17, 2.0, 0.5),
('test-cgl-01', 'q-ga-03', 'sub-ga', 18, 2.0, 0.5),
('test-cgl-01', 'q-ga-04', 'sub-ga', 19, 2.0, 0.5),
('test-cgl-01', 'q-ga-05', 'sub-ga', 20, 2.0, 0.5)
ON CONFLICT (mock_test_id, question_id) DO NOTHING;
