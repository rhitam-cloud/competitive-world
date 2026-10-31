import { Exam, MockTest, Question, Subject, UserProfile } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "sub-gir",
    code: "REASONING",
    name: "General Intelligence & Reasoning",
    orderIndex: 1,
    iconName: "BrainCircuit",
  },
  {
    id: "sub-qa",
    code: "QUANTITATIVE",
    name: "Quantitative Aptitude",
    orderIndex: 2,
    iconName: "Calculator",
  },
  {
    id: "sub-eng",
    code: "ENGLISH",
    name: "English Language & Comprehension",
    orderIndex: 3,
    iconName: "BookOpenCheck",
  },
  {
    id: "sub-ga",
    code: "AWARENESS",
    name: "General Awareness",
    orderIndex: 4,
    iconName: "Globe2",
  },
];

export const MOCK_EXAMS: Exam[] = [
  {
    id: "exam-ssc-cgl",
    slug: "ssc-cgl",
    title: "SSC CGL (Combined Graduate Level)",
    description:
      "Premier examination conducted by SSC for recruitment to Group B and Group C Gazetted and Non-Gazetted posts in various Ministries and Departments.",
    category: "SSC",
    tier: "Tier 1 & Tier 2",
    isPublished: true,
    totalMockTests: 5,
    featured: true,
    createdAt: "2026-01-15T00:00:00Z",
  },
  {
    id: "exam-ssc-chsl",
    slug: "ssc-chsl",
    title: "SSC CHSL (10+2 Higher Secondary Level)",
    description:
      "National examination for recruitment of Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO).",
    category: "SSC",
    tier: "Tier 1",
    isPublished: true,
    totalMockTests: 3,
    featured: true,
    createdAt: "2026-01-20T00:00:00Z",
  },
];

/**
 * 24 Original, high-quality demonstration practice questions.
 * 6 questions per subject. Clearly labeled for demonstration & training.
 */
export const MOCK_QUESTIONS: Question[] = [
  // -------------------------------------------------------------
  // REASONING (6 Questions)
  // -------------------------------------------------------------
  {
    id: "q-gir-01",
    subjectId: "sub-gir",
    subjectCode: "REASONING",
    questionText:
      "Select the option that is related to the third number in the same way as the second number is related to the first number:\n12 : 156 :: 14 : ?",
    options: [
      { id: "A", text: "210" },
      { id: "B", text: "196" },
      { id: "C", text: "224" },
      { id: "D", text: "182" },
    ],
    correctOption: "A",
    explanation:
      "Pattern: The relation is n : n * (n + 1).\nFor the first pair: 12 * (12 + 1) = 12 * 13 = 156.\nApplying the same logic to 14: 14 * (14 + 1) = 14 * 15 = 210. Therefore, 210 is correct.",
    difficulty: "medium",
    topic: "Number Analogy",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "q-gir-02",
    subjectId: "sub-gir",
    subjectCode: "REASONING",
    questionText:
      "In a certain code language, 'ROBUST' is written as 'QNATRS'. How will 'ZODIAC' be written in that code language?",
    options: [
      { id: "A", text: "YNCHZB" },
      { id: "B", text: "YMCJAC" },
      { id: "C", text: "XNCHZB" },
      { id: "D", text: "YNDIBD" },
    ],
    correctOption: "A",
    explanation:
      "Pattern: Each letter is shifted by -1 in alphabetical order.\nR - 1 = Q, O - 1 = N, B - 1 = A, U - 1 = T, S - 1 = R, T - 1 = S.\nApplying -1 shift to ZODIAC:\nZ - 1 = Y\nO - 1 = N\nD - 1 = C\nI - 1 = H\nA - 1 = Z\nC - 1 = B\nHence, the resulting code is YNCHZB.",
    difficulty: "easy",
    topic: "Coding-Decoding",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-02T00:00:00Z",
  },
  {
    id: "q-gir-03",
    subjectId: "sub-gir",
    subjectCode: "REASONING",
    questionText:
      "Pointing to a photograph, Rohit said, 'She is the daughter of my grandfather's only son.' How is Rohit related to the girl in the photograph?",
    options: [
      { id: "A", text: "Cousin" },
      { id: "B", text: "Brother" },
      { id: "C", text: "Uncle" },
      { id: "D", text: "Father" },
    ],
    correctOption: "B",
    explanation:
      "'Grandfather's only son' refers to Rohit's father.\nThe girl is the daughter of Rohit's father, which means she is Rohit's sister.\nTherefore, Rohit is the girl's Brother.",
    difficulty: "easy",
    topic: "Blood Relations",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-03T00:00:00Z",
  },
  {
    id: "q-gir-04",
    subjectId: "sub-gir",
    subjectCode: "REASONING",
    questionText:
      "Statements:\nI. All pens are markers.\nII. Some markers are scales.\nConclusions:\n1. Some pens are scales.\n2. All markers are pens.",
    options: [
      { id: "A", text: "Only conclusion 1 follows" },
      { id: "B", text: "Only conclusion 2 follows" },
      { id: "C", text: "Neither conclusion 1 nor 2 follows" },
      { id: "D", text: "Both conclusions 1 and 2 follow" },
    ],
    correctOption: "C",
    explanation:
      "From 'All pens are markers' (A-type) and 'Some markers are scales' (I-type), the middle term 'markers' is not distributed. Hence no definite conclusion can be drawn between pens and scales (Conclusion 1 is not definite).\nConclusion 2 is invalid because conversion of 'All pens are markers' yields 'Some markers are pens', not 'All'.\nTherefore, neither conclusion 1 nor 2 follows.",
    difficulty: "medium",
    topic: "Syllogism",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-04T00:00:00Z",
  },
  {
    id: "q-gir-05",
    subjectId: "sub-gir",
    subjectCode: "REASONING",
    questionText:
      "Find the missing number in the series:\n7, 11, 19, 31, 47, ?",
    options: [
      { id: "A", text: "63" },
      { id: "B", text: "67" },
      { id: "C", text: "71" },
      { id: "D", text: "59" },
    ],
    correctOption: "B",
    explanation:
      "Check the differences between consecutive terms:\n11 - 7 = 4\n19 - 11 = 8\n31 - 19 = 12\n47 - 31 = 16\nThe difference sequence increases by 4 each step (4, 8, 12, 16, 20).\nNext difference = 20.\nMissing term = 47 + 20 = 67.",
    difficulty: "medium",
    topic: "Number Series",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-05T00:00:00Z",
  },
  {
    id: "q-gir-06",
    subjectId: "sub-gir",
    subjectCode: "REASONING",
    questionText:
      "Four letter-clusters have been given, out of which three are alike in a certain way and one is different. Select the odd letter-cluster:\n(A) BDHF\n(B) CEIK\n(C) DFJL\n(D) EGLN",
    options: [
      { id: "A", text: "BDHF" },
      { id: "B", text: "CEIK" },
      { id: "C", text: "DFJL" },
      { id: "D", text: "EGLN" },
    ],
    correctOption: "A",
    explanation:
      "Let's inspect the forward alphabetical steps in each group:\n(B) C(+2)->E(+4)->I(+2)->K\n(C) D(+2)->F(+4)->J(+2)->L\n(D) E(+2)->G(+4)->L(+2)->N\nNotice groups B, C, and D follow (+2, +4, +2).\nIn (A) B(+2)->D(+4)->H(-2)->F. Since the last step is a backwards step (-2) instead of (+2), (A) BDHF is the odd one out.",
    difficulty: "hard",
    topic: "Classification",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-06T00:00:00Z",
  },

  // -------------------------------------------------------------
  // QUANTITATIVE APTITUDE (6 Questions)
  // -------------------------------------------------------------
  {
    id: "q-qa-01",
    subjectId: "sub-qa",
    subjectCode: "QUANTITATIVE",
    questionText:
      "A shopkeeper marks an article 30% above its cost price and offers a discount of 15% on the marked price. What is his overall gain percentage?",
    options: [
      { id: "A", text: "10.5%" },
      { id: "B", text: "12%" },
      { id: "C", text: "15%" },
      { id: "D", text: "8.5%" },
    ],
    correctOption: "A",
    explanation:
      "Let Cost Price (CP) = 100.\nMarked Price (MP) = 100 + 30% of 100 = 130.\nDiscount = 15% of 130 = 0.15 * 130 = 19.5.\nSelling Price (SP) = 130 - 19.5 = 110.5.\nProfit = SP - CP = 110.5 - 100 = 10.5.\nGain Percentage = (10.5 / 100) * 100 = 10.5%.",
    difficulty: "medium",
    topic: "Profit, Loss & Discount",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-07T00:00:00Z",
  },
  {
    id: "q-qa-02",
    subjectId: "sub-qa",
    subjectCode: "QUANTITATIVE",
    questionText:
      "A can complete a piece of work alone in 12 days, while B can complete the same work alone in 18 days. If they work together for 4 days, what fraction of the work remains unfinished?",
    options: [
      { id: "A", text: "4/9" },
      { id: "B", text: "5/9" },
      { id: "C", text: "1/3" },
      { id: "D", text: "2/5" },
    ],
    correctOption: "A",
    explanation:
      "Total work = LCM(12, 18) = 36 units.\nEfficiency of A = 36 / 12 = 3 units/day.\nEfficiency of B = 36 / 18 = 2 units/day.\nCombined efficiency of (A + B) = 3 + 2 = 5 units/day.\nWork done in 4 days = 4 * 5 = 20 units.\nRemaining work = 36 - 20 = 16 units.\nFraction of work remaining = 16 / 36 = 4/9.",
    difficulty: "medium",
    topic: "Time and Work",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-08T00:00:00Z",
  },
  {
    id: "q-qa-03",
    subjectId: "sub-qa",
    subjectCode: "QUANTITATIVE",
    questionText:
      "If x + 1/x = 4, find the value of x^3 + 1/x^3.",
    options: [
      { id: "A", text: "64" },
      { id: "B", text: "52" },
      { id: "C", text: "48" },
      { id: "D", text: "56" },
    ],
    correctOption: "B",
    explanation:
      "Using the algebraic identity:\n(x + 1/x)^3 = x^3 + 1/x^3 + 3(x + 1/x)\nTherefore, x^3 + 1/x^3 = (x + 1/x)^3 - 3(x + 1/x)\nSubstitute x + 1/x = 4:\nx^3 + 1/x^3 = 4^3 - 3(4) = 64 - 12 = 52.",
    difficulty: "easy",
    topic: "Algebra",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-09T00:00:00Z",
  },
  {
    id: "q-qa-04",
    subjectId: "sub-qa",
    subjectCode: "QUANTITATIVE",
    questionText:
      "A train 180 metres long is running at a uniform speed of 54 km/h. How much time (in seconds) will it take to completely cross a stationary platform of length 270 metres?",
    options: [
      { id: "A", text: "25 seconds" },
      { id: "B", text: "30 seconds" },
      { id: "C", text: "32 seconds" },
      { id: "D", text: "28 seconds" },
    ],
    correctOption: "B",
    explanation:
      "Total distance to cross = Length of train + Length of platform = 180 + 270 = 450 m.\nSpeed of train in m/s = 54 * (5 / 18) = 15 m/s.\nTime taken = Total Distance / Speed = 450 / 15 = 30 seconds.",
    difficulty: "medium",
    topic: "Speed, Time and Distance",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "q-qa-05",
    subjectId: "sub-qa",
    subjectCode: "QUANTITATIVE",
    questionText:
      "The compound interest on ₹8,000 for 2 years at 10% per annum, compounded annually, is:",
    options: [
      { id: "A", text: "₹1,600" },
      { id: "B", text: "₹1,680" },
      { id: "C", text: "₹1,720" },
      { id: "D", text: "₹1,580" },
    ],
    correctOption: "B",
    explanation:
      "Amount A = P * (1 + R/100)^t\nA = 8000 * (1 + 10/100)^2 = 8000 * (1.1)^2 = 8000 * 1.21 = ₹9,680.\nCompound Interest = Amount - Principal = 9680 - 8000 = ₹1,680.",
    difficulty: "easy",
    topic: "Compound Interest",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-11T00:00:00Z",
  },
  {
    id: "q-qa-06",
    subjectId: "sub-qa",
    subjectCode: "QUANTITATIVE",
    questionText:
      "In a circle with centre O and radius 13 cm, a chord PQ of length 24 cm is drawn. What is the perpendicular distance from the centre O to the chord PQ?",
    options: [
      { id: "A", text: "5 cm" },
      { id: "B", text: "7 cm" },
      { id: "C", text: "6 cm" },
      { id: "D", text: "8 cm" },
    ],
    correctOption: "A",
    explanation:
      "A perpendicular drawn from the centre of a circle to a chord bisects the chord.\nLet M be the midpoint of PQ. Then PM = 24 / 2 = 12 cm.\nIn right triangle OMP, OM^2 + PM^2 = OP^2 (where OP is radius = 13 cm).\nOM^2 + 12^2 = 13^2\nOM^2 + 144 = 169\nOM^2 = 25 => OM = 5 cm.\nThe perpendicular distance is 5 cm.",
    difficulty: "medium",
    topic: "Geometry",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-12T00:00:00Z",
  },

  // -------------------------------------------------------------
  // ENGLISH LANGUAGE (6 Questions)
  // -------------------------------------------------------------
  {
    id: "q-eng-01",
    subjectId: "sub-eng",
    subjectCode: "ENGLISH",
    questionText:
      "Identify the segment in the sentence which contains a grammatical error:\n'Neither the manager (A) / nor his assistants (B) / was present at (C) / the annual budget conference (D).'",
    options: [
      { id: "A", text: "Neither the manager" },
      { id: "B", text: "nor his assistants" },
      { id: "C", text: "was present at" },
      { id: "D", text: "the annual budget conference" },
    ],
    correctOption: "C",
    explanation:
      "Rule of Subject-Verb Agreement: When two subjects are connected by 'neither... nor', the verb agrees with the subject closest to it. Here, 'assistants' is plural, so the verb must be plural 'were present at' instead of 'was present at'. Hence, part (C) contains the error.",
    difficulty: "medium",
    topic: "Spotting Errors",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-13T00:00:00Z",
  },
  {
    id: "q-eng-02",
    subjectId: "sub-eng",
    subjectCode: "ENGLISH",
    questionText:
      "Select the most appropriate ANTONYM of the given word:\n'BENEVOLENT'",
    options: [
      { id: "A", text: "Generous" },
      { id: "B", text: "Malevolent" },
      { id: "C", text: "Magnanimous" },
      { id: "D", text: "Sympathetic" },
    ],
    correctOption: "B",
    explanation:
      "'Benevolent' means well-meaning, kind and charitable.\nIts direct opposite is 'Malevolent', which means having or showing a wish to do evil to others.\nGenerous, Magnanimous, and Sympathetic are synonyms/near-synonyms.",
    difficulty: "easy",
    topic: "Antonyms",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-14T00:00:00Z",
  },
  {
    id: "q-eng-03",
    subjectId: "sub-eng",
    subjectCode: "ENGLISH",
    questionText:
      "Select the most appropriate meaning of the given idiom:\n'To burn the candle at both ends'",
    options: [
      { id: "A", text: "To waste resources foolishly" },
      { id: "B", text: "To work extremely hard from early morning until late night" },
      { id: "C", text: "To be indifferent to danger" },
      { id: "D", text: "To cause friction among friends" },
    ],
    correctOption: "B",
    explanation:
      "The idiom 'to burn the candle at both ends' means to exhaust oneself by going to bed late and getting up early, or working very hard without sufficient rest.",
    difficulty: "medium",
    topic: "Idioms & Phrases",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-15T00:00:00Z",
  },
  {
    id: "q-eng-04",
    subjectId: "sub-eng",
    subjectCode: "ENGLISH",
    questionText:
      "Select the option that can be used as a one-word substitution for the given group of words:\n'A person who compiles dictionaries'",
    options: [
      { id: "A", text: "Calligrapher" },
      { id: "B", text: "Lexicographer" },
      { id: "C", text: "Cartographer" },
      { id: "D", text: "Bibliophile" },
    ],
    correctOption: "B",
    explanation:
      "A lexicographer is a person who writes, edits, or compiles dictionaries.\nCalligrapher: someone skilled in decorative handwriting.\nCartographer: someone who draws or produces maps.\nBibliophile: a person who loves or collects books.",
    difficulty: "easy",
    topic: "One Word Substitution",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-16T00:00:00Z",
  },
  {
    id: "q-eng-05",
    subjectId: "sub-eng",
    subjectCode: "ENGLISH",
    questionText:
      "Select the correctly spelt word:",
    options: [
      { id: "A", text: "Accomodation" },
      { id: "B", text: "Accommodation" },
      { id: "C", text: "Acommodation" },
      { id: "D", text: "Acomodation" },
    ],
    correctOption: "B",
    explanation:
      "The correct spelling is 'Accommodation' with double 'c' and double 'm' (A-C-C-O-M-M-O-D-A-T-I-O-N).",
    difficulty: "easy",
    topic: "Spelling Check",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-17T00:00:00Z",
  },
  {
    id: "q-eng-06",
    subjectId: "sub-eng",
    subjectCode: "ENGLISH",
    questionText:
      "Select the option that expresses the given sentence in passive voice:\n'The municipal corporation has repaired all the potholes on the main highway.'",
    options: [
      { id: "A", text: "All the potholes on the main highway had been repaired by the municipal corporation." },
      { id: "B", text: "All the potholes on the main highway have been repaired by the municipal corporation." },
      { id: "C", text: "All the potholes on the main highway were repaired by the municipal corporation." },
      { id: "D", text: "All the potholes on the main highway are being repaired by the municipal corporation." },
    ],
    correctOption: "B",
    explanation:
      "Active voice: Subject + has/have + V3 + Object (Present Perfect).\nPassive voice conversion: Object + has/have + been + V3 + by Subject.\nSince 'all the potholes' is plural, the auxiliary verb must be 'have been repaired'. Hence (B) is the correct passive form.",
    difficulty: "medium",
    topic: "Active & Passive Voice",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-18T00:00:00Z",
  },

  // -------------------------------------------------------------
  // GENERAL AWARENESS (6 Questions)
  // -------------------------------------------------------------
  {
    id: "q-ga-01",
    subjectId: "sub-ga",
    subjectCode: "AWARENESS",
    questionText:
      "Which Article of the Constitution of India provides for the 'Right to Constitutional Remedies' allowing citizens to move the Supreme Court for enforcement of Fundamental Rights?",
    options: [
      { id: "A", text: "Article 21" },
      { id: "B", text: "Article 32" },
      { id: "C", text: "Article 19" },
      { id: "D", text: "Article 44" },
    ],
    correctOption: "B",
    explanation:
      "Article 32 of the Indian Constitution grants the Right to Constitutional Remedies, empowering individuals to approach the Supreme Court directly for the enforcement of Fundamental Rights. Dr. B.R. Ambedkar famously referred to Article 32 as the 'Heart and Soul of the Constitution'.",
    difficulty: "easy",
    topic: "Indian Polity & Constitution",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-19T00:00:00Z",
  },
  {
    id: "q-ga-02",
    subjectId: "sub-ga",
    subjectCode: "AWARENESS",
    questionText:
      "Who was the Viceroy of India when the Indian National Congress was founded in Bombay in December 1885?",
    options: [
      { id: "A", text: "Lord Curzon" },
      { id: "B", text: "Lord Dufferin" },
      { id: "C", text: "Lord Ripon" },
      { id: "D", text: "Lord Lytton" },
    ],
    correctOption: "B",
    explanation:
      "Lord Dufferin served as Viceroy and Governor-General of India from 1884 to 1888. The Indian National Congress was founded at Bombay during his tenure in December 1885 by retired civil servant Allan Octavian Hume.",
    difficulty: "medium",
    topic: "Modern Indian History",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-20T00:00:00Z",
  },
  {
    id: "q-ga-03",
    subjectId: "sub-ga",
    subjectCode: "AWARENESS",
    questionText:
      "Which layer of the atmosphere contains the ozone layer responsible for absorbing harmful ultraviolet (UV) solar radiation?",
    options: [
      { id: "A", text: "Troposphere" },
      { id: "B", text: "Mesosphere" },
      { id: "C", text: "Stratosphere" },
      { id: "D", text: "Thermosphere" },
    ],
    correctOption: "C",
    explanation:
      "The stratosphere extends from roughly 12 km to 50 km above Earth's surface and contains the ozone layer (ozonosphere), which absorbs and scatters solar ultraviolet radiation.",
    difficulty: "easy",
    topic: "Physical Geography",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-21T00:00:00Z",
  },
  {
    id: "q-ga-04",
    subjectId: "sub-ga",
    subjectCode: "AWARENESS",
    questionText:
      "Which vitamin is water-soluble and acts as a powerful antioxidant essential for collagen synthesis and tissue repair in the human body?",
    options: [
      { id: "A", text: "Vitamin A" },
      { id: "B", text: "Vitamin D" },
      { id: "C", text: "Vitamin C (Ascorbic acid)" },
      { id: "D", text: "Vitamin K" },
    ],
    correctOption: "C",
    explanation:
      "Vitamins B and C are water-soluble vitamins, whereas Vitamins A, D, E, and K are fat-soluble. Vitamin C (Ascorbic acid) is vital for the synthesis of collagen, wound healing, and immunity.",
    difficulty: "easy",
    topic: "General Science (Biology)",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-22T00:00:00Z",
  },
  {
    id: "q-ga-05",
    subjectId: "sub-ga",
    subjectCode: "AWARENESS",
    questionText:
      "In the context of the Indian economy, which term defines the interest rate at which the Reserve Bank of India (RBI) lends money to commercial banks against government securities for short-term liquidity needs?",
    options: [
      { id: "A", text: "Reverse Repo Rate" },
      { id: "B", text: "Repo Rate" },
      { id: "C", text: "Bank Rate" },
      { id: "D", text: "Cash Reserve Ratio" },
    ],
    correctOption: "B",
    explanation:
      "Repo Rate (Repurchasing Option rate) is the key benchmark interest rate at which the RBI lends money to commercial banks against pledged government securities. When commercial banks park surplus funds with the RBI, the rate is called the Reverse Repo Rate.",
    difficulty: "medium",
    topic: "Indian Economy",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-23T00:00:00Z",
  },
  {
    id: "q-ga-06",
    subjectId: "sub-ga",
    subjectCode: "AWARENESS",
    questionText:
      "Which classical dance form originates from the state of Kerala and is distinguished by elaborate facial makeup, billowing skirts, and dramatic dance-drama storytelling?",
    options: [
      { id: "A", text: "Kathakali" },
      { id: "B", text: "Kuchipudi" },
      { id: "C", text: "Bharatanatyam" },
      { id: "D", text: "Kathak" },
    ],
    correctOption: "A",
    explanation:
      "Kathakali is one of the major classical dances of India originating in Kerala, known for its intricate face painting (Vesham), ornate headgear, and enactments of scenes from Hindu epics.\nKuchipudi is from Andhra Pradesh, Bharatanatyam is from Tamil Nadu, and Kathak is from Northern India.",
    difficulty: "easy",
    topic: "Art & Culture",
    language: "English",
    defaultPositiveMarks: 2,
    defaultNegativeMarks: 0.5,
    isPublished: true,
    createdAt: "2026-01-24T00:00:00Z",
  },
];

export const MOCK_TESTS: MockTest[] = [
  {
    id: "test-cgl-01",
    examId: "exam-ssc-cgl",
    title: "SSC CGL 2026 Tier 1 - All India Full Mock Test 01",
    slug: "ssc-cgl-tier-1-full-mock-01",
    description:
      "Full-length exam simulation covering all 4 sections based on the latest TCS/SSC pattern. Includes detailed step-by-step explanations and national percentile comparison.",
    durationMinutes: 60,
    totalMarks: 40, // 20 questions * 2 marks
    positiveMarks: 2.0,
    negativeMarks: 0.5,
    isFree: true,
    priceInr: 0,
    isPublished: true,
    questionCount: 20,
    examTitle: "SSC CGL",
    instructions: [
      "The test consists of 4 sections: Reasoning, Quantitative Aptitude, English, and General Awareness.",
      "Each question carries 2 marks for a correct answer.",
      "A negative mark of 0.5 marks will be deducted for every incorrect response.",
      "No marks will be deducted for unattempted questions.",
      "The timer in the top-right corner displays the remaining time. The test will automatically submit when the timer reaches zero.",
      "You can mark questions for review and revisit them at any point before final submission.",
      "Once you click 'Submit Test', your attempt will be finalized and detailed solutions will be shown.",
    ],
    createdAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "test-chsl-01",
    examId: "exam-ssc-chsl",
    title: "SSC CHSL (10+2) Tier 1 - Speed & Accuracy Mock 01",
    slug: "ssc-chsl-tier-1-speed-mock-01",
    description:
      "Targeted speed-building mock test for SSC CHSL candidates. Focuses on high-yield questions, quick calculations, and grammatical precision.",
    durationMinutes: 45,
    totalMarks: 40,
    positiveMarks: 2.0,
    negativeMarks: 0.5,
    isFree: true,
    priceInr: 0,
    isPublished: true,
    questionCount: 20,
    examTitle: "SSC CHSL",
    instructions: [
      "Total test duration is 45 minutes.",
      "Marking scheme: +2 for correct answer, -0.5 for wrong answer, 0 for unattempted.",
      "You can switch between questions and sections freely using the Question Palette.",
      "Save your response by clicking 'Save & Next'.",
      "Do not switch tabs or minimize the browser window during the exam.",
    ],
    createdAt: "2026-01-12T00:00:00Z",
  },
];

export const DEMO_USERS: UserProfile[] = [
  {
    id: "user-student-demo",
    email: "student@competitiveworld.in",
    fullName: "Arjun Sharma",
    role: "student",
    targetExam: "SSC CGL",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "user-admin-demo",
    email: "admin@competitiveworld.in",
    fullName: "Exam Administrator",
    role: "admin",
    targetExam: "BOTH",
    createdAt: "2026-01-01T00:00:00Z",
  },
];
