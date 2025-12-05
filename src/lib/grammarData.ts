export interface GrammarRule {
  id: string
  title: string
  category: string
  description: string
  examples: string[]
  color: string
}

export interface Question {
  id: string
  ruleId: string
  type: 'fill-blank' | 'multiple-choice' | 'error-correction' | 'sentence-construction'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  blank?: string
}

export interface UserProgress {
  totalQuestions: number
  correctAnswers: number
  questionsPerRule: Record<string, { correct: number; total: number }>
  currentStreak: number
  lastPracticeDate: string
  achievements: string[]
}

export const grammarRules: GrammarRule[] = [
  {
    id: 'sentence-structure',
    title: 'Sentence Structure (S + V + O)',
    category: 'Basics',
    description: 'Most English sentences follow: Subject + Verb + Object',
    examples: ['I eat breakfast.', 'She likes coffee.', 'They play football.'],
    color: 'oklch(0.60 0.15 270)'
  },
  {
    id: 'be-verb',
    title: 'The "Be" Verb (am, is, are)',
    category: 'Basics',
    description: 'Used for descriptions, identity, feelings, and continuous tense.',
    examples: ['I am tired.', 'She is a doctor.', 'They are happy.'],
    color: 'oklch(0.60 0.15 270)'
  },
  {
    id: 'simple-present',
    title: 'Simple Present (Habit / Fact)',
    category: 'Tenses',
    description: 'Used for habits, facts, and daily routines.',
    examples: ['I work every day.', 'He drives to work.', 'Water boils at 100°C.'],
    color: 'oklch(0.65 0.18 160)'
  },
  {
    id: 'present-continuous',
    title: 'Present Continuous (Now)',
    category: 'Tenses',
    description: 'Used for actions happening right now or temporary actions.',
    examples: ['I am eating now.', 'She is studying English.', 'They are working today.'],
    color: 'oklch(0.65 0.18 160)'
  },
  {
    id: 'simple-past',
    title: 'Simple Past (Finished Action)',
    category: 'Tenses',
    description: 'Used for completed actions in the past.',
    examples: ['I watched a movie.', 'She went to school.', 'They ate dinner.'],
    color: 'oklch(0.65 0.18 160)'
  },
  {
    id: 'future',
    title: 'Future (will / going to)',
    category: 'Tenses',
    description: 'Will for promises/decisions, going to for plans.',
    examples: ['I will call you later.', 'She is going to travel next month.', 'They will help us.'],
    color: 'oklch(0.65 0.18 160)'
  },
  {
    id: 'modal-verbs',
    title: 'Modal Verbs',
    category: 'Modals',
    description: 'Can (ability), should (advice), must (obligation), may (permission), could (polite request).',
    examples: ['I can swim.', 'You should rest.', 'You must stop.', 'Could you help me?'],
    color: 'oklch(0.70 0.16 30)'
  },
  {
    id: 'questions',
    title: 'Questions',
    category: 'Questions',
    description: 'Yes/No questions with Be verb or Do/Does. WH questions with What, Where, Why, When, How, Who.',
    examples: ['Are you ready?', 'Do you speak English?', 'What do you want?', 'Where are you going?'],
    color: 'oklch(0.55 0.20 40)'
  },
  {
    id: 'articles',
    title: 'Articles (a, an, the)',
    category: 'Articles',
    description: 'A before consonants, an before vowels, the for specific things.',
    examples: ['a car', 'an apple', 'the restaurant we visited'],
    color: 'oklch(0.65 0.15 200)'
  },
  {
    id: 'prepositions',
    title: 'Prepositions',
    category: 'Prepositions',
    description: 'In (months/years), on (days/surfaces), at (time/location), to (movement), for (purpose/duration).',
    examples: ['in 2025', 'on Monday', 'at 5:00', "I'm going to work", 'This is for you'],
    color: 'oklch(0.60 0.18 320)'
  },
  {
    id: 'countable-uncountable',
    title: 'Countable vs. Uncountable Nouns',
    category: 'Nouns',
    description: 'Countable: many, few, a/an. Uncountable: much, little, some.',
    examples: ['a book', 'many cars', 'water', 'information', 'money'],
    color: 'oklch(0.55 0.14 210)'
  },
  {
    id: 'comparatives',
    title: 'Comparing (Comparatives & Superlatives)',
    category: 'Adjectives',
    description: 'Comparative: adj + -er / more. Superlative: adj + -est / most.',
    examples: ['bigger', 'more beautiful', 'the biggest', 'the most beautiful'],
    color: 'oklch(0.70 0.12 80)'
  },
  {
    id: 'expressions',
    title: 'Common Everyday Expressions',
    category: 'Expressions',
    description: 'Common verb patterns used in daily conversation.',
    examples: ['I want to eat.', 'I have to go.', 'I need to study.', 'I would like to order food.'],
    color: 'oklch(0.65 0.16 250)'
  }
]

export const questions: Question[] = [
  {
    id: 'q1',
    ruleId: 'sentence-structure',
    type: 'multiple-choice',
    question: 'Which sentence has correct S + V + O structure?',
    options: ['Breakfast eat I.', 'I eat breakfast.', 'Eat I breakfast.', 'I breakfast eat.'],
    correctAnswer: 'I eat breakfast.',
    explanation: 'English sentences follow Subject + Verb + Object order: "I" (subject) + "eat" (verb) + "breakfast" (object).'
  },
  {
    id: 'q2',
    ruleId: 'be-verb',
    type: 'fill-blank',
    question: 'I ___ tired after work.',
    correctAnswer: 'am',
    explanation: 'Use "am" with the subject "I". Remember: I am, he/she/it is, you/we/they are.'
  },
  {
    id: 'q3',
    ruleId: 'be-verb',
    type: 'multiple-choice',
    question: 'They ___ happy today.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 'are',
    explanation: 'Use "are" with the subject "They". Remember: I am, he/she/it is, you/we/they are.'
  },
  {
    id: 'q4',
    ruleId: 'simple-present',
    type: 'fill-blank',
    question: 'She ___ to work every day. (drive)',
    correctAnswer: 'drives',
    explanation: 'Add "s" or "es" to verbs with he/she/it in simple present: drive → drives.'
  },
  {
    id: 'q5',
    ruleId: 'simple-present',
    type: 'multiple-choice',
    question: 'Water ___ at 100°C.',
    options: ['boil', 'boils', 'boiling', 'boiled'],
    correctAnswer: 'boils',
    explanation: 'Use simple present for facts. "Water" is singular (it), so add "s": boils.'
  },
  {
    id: 'q6',
    ruleId: 'present-continuous',
    type: 'fill-blank',
    question: 'I ___ English right now. (study)',
    correctAnswer: 'am studying',
    explanation: 'Present continuous = am/is/are + verb-ing. With "I", use "am studying".'
  },
  {
    id: 'q7',
    ruleId: 'present-continuous',
    type: 'multiple-choice',
    question: 'She ___ dinner at the moment.',
    options: ['cook', 'cooks', 'is cooking', 'cooked'],
    correctAnswer: 'is cooking',
    explanation: 'Use present continuous (is/am/are + verb-ing) for actions happening now.'
  },
  {
    id: 'q8',
    ruleId: 'simple-past',
    type: 'fill-blank',
    question: 'I ___ a movie yesterday. (watch)',
    correctAnswer: 'watched',
    explanation: 'Simple past of regular verbs: add -ed to the base form. Watch → watched.'
  },
  {
    id: 'q9',
    ruleId: 'simple-past',
    type: 'multiple-choice',
    question: 'They ___ dinner at 7 PM last night.',
    options: ['eat', 'eats', 'eating', 'ate'],
    correctAnswer: 'ate',
    explanation: '"Eat" is irregular. Simple past form is "ate", not "eated".'
  },
  {
    id: 'q10',
    ruleId: 'future',
    type: 'multiple-choice',
    question: 'I ___ call you later.',
    options: ['will', 'going to', 'am', 'can'],
    correctAnswer: 'will',
    explanation: 'Use "will" for promises and spontaneous decisions: I will call you later.'
  },
  {
    id: 'q11',
    ruleId: 'future',
    type: 'fill-blank',
    question: 'She ___ travel next month. (going to)',
    correctAnswer: 'is going to',
    explanation: 'Use "is/am/are going to" for plans. With "she", use "is going to".'
  },
  {
    id: 'q12',
    ruleId: 'modal-verbs',
    type: 'multiple-choice',
    question: 'I ___ swim very well.',
    options: ['can', 'must', 'should', 'may'],
    correctAnswer: 'can',
    explanation: 'Use "can" to express ability: I can swim = I am able to swim.'
  },
  {
    id: 'q13',
    ruleId: 'modal-verbs',
    type: 'multiple-choice',
    question: 'You ___ rest when you are tired.',
    options: ['can', 'must', 'should', 'could'],
    correctAnswer: 'should',
    explanation: 'Use "should" for advice or recommendations: You should rest.'
  },
  {
    id: 'q14',
    ruleId: 'modal-verbs',
    type: 'fill-blank',
    question: '___ you help me, please? (polite request)',
    correctAnswer: 'Could',
    explanation: 'Use "could" for polite requests: Could you help me?'
  },
  {
    id: 'q15',
    ruleId: 'questions',
    type: 'error-correction',
    question: 'You are ready?',
    correctAnswer: 'Are you ready?',
    explanation: 'For yes/no questions with "be" verb, put the verb before the subject: Are you ready?'
  },
  {
    id: 'q16',
    ruleId: 'questions',
    type: 'multiple-choice',
    question: '___ you speak English?',
    options: ['Are', 'Do', 'Is', 'Does'],
    correctAnswer: 'Do',
    explanation: 'For yes/no questions with regular verbs and "you", use "Do": Do you speak English?'
  },
  {
    id: 'q17',
    ruleId: 'questions',
    type: 'fill-blank',
    question: '___ are you going?',
    correctAnswer: 'Where',
    explanation: 'Use "Where" to ask about location or destination.'
  },
  {
    id: 'q18',
    ruleId: 'articles',
    type: 'multiple-choice',
    question: 'I need ___ pen.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 'a',
    explanation: 'Use "a" before words starting with consonant sounds: a pen, a car, a phone.'
  },
  {
    id: 'q19',
    ruleId: 'articles',
    type: 'multiple-choice',
    question: 'She is ___ engineer.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 'an',
    explanation: 'Use "an" before words starting with vowel sounds: an engineer, an apple.'
  },
  {
    id: 'q20',
    ruleId: 'articles',
    type: 'fill-blank',
    question: 'I saw ___ movie. ___ movie was great! (second blank)',
    correctAnswer: 'The',
    explanation: 'Use "the" for specific things already mentioned: a movie (first mention) → the movie (specific movie we discussed).'
  },
  {
    id: 'q21',
    ruleId: 'prepositions',
    type: 'multiple-choice',
    question: 'My birthday is ___ May.',
    options: ['in', 'on', 'at', 'to'],
    correctAnswer: 'in',
    explanation: 'Use "in" with months and years: in May, in 2025, in summer.'
  },
  {
    id: 'q22',
    ruleId: 'prepositions',
    type: 'multiple-choice',
    question: 'The meeting is ___ Monday.',
    options: ['in', 'on', 'at', 'to'],
    correctAnswer: 'on',
    explanation: 'Use "on" with days and dates: on Monday, on January 5th.'
  },
  {
    id: 'q23',
    ruleId: 'prepositions',
    type: 'fill-blank',
    question: 'I wake up ___ 7:00 AM.',
    correctAnswer: 'at',
    explanation: 'Use "at" with specific times: at 7:00, at noon, at midnight.'
  },
  {
    id: 'q24',
    ruleId: 'prepositions',
    type: 'multiple-choice',
    question: "I'm going ___ work.",
    options: ['in', 'on', 'at', 'to'],
    correctAnswer: 'to',
    explanation: 'Use "to" to show movement or direction: going to work, going to school.'
  },
  {
    id: 'q25',
    ruleId: 'countable-uncountable',
    type: 'multiple-choice',
    question: 'I have ___ books.',
    options: ['many', 'much', 'a', 'little'],
    correctAnswer: 'many',
    explanation: 'Books are countable. Use "many" with countable nouns: many books, many cars.'
  },
  {
    id: 'q26',
    ruleId: 'countable-uncountable',
    type: 'multiple-choice',
    question: 'I need ___ water.',
    options: ['many', 'much', 'few', 'a'],
    correctAnswer: 'much',
    explanation: 'Water is uncountable. Use "much" with uncountable nouns: much water, much time.'
  },
  {
    id: 'q27',
    ruleId: 'countable-uncountable',
    type: 'fill-blank',
    question: 'Can I have ___ apple? (one)',
    correctAnswer: 'an',
    explanation: 'Apples are countable. Use "a/an" with singular countable nouns: an apple.'
  },
  {
    id: 'q28',
    ruleId: 'comparatives',
    type: 'multiple-choice',
    question: 'This book is ___ than that one.',
    options: ['big', 'bigger', 'biggest', 'more big'],
    correctAnswer: 'bigger',
    explanation: 'For short adjectives (1 syllable), add -er for comparatives: big → bigger.'
  },
  {
    id: 'q29',
    ruleId: 'comparatives',
    type: 'multiple-choice',
    question: 'She is ___ beautiful than her sister.',
    options: ['beautifuler', 'more beautiful', 'most beautiful', 'beautifulest'],
    correctAnswer: 'more beautiful',
    explanation: 'For long adjectives (2+ syllables), use "more" for comparatives: more beautiful, more interesting.'
  },
  {
    id: 'q30',
    ruleId: 'comparatives',
    type: 'fill-blank',
    question: 'He is ___ tallest in the class. (superlative)',
    correctAnswer: 'the',
    explanation: 'Superlatives always use "the": the biggest, the tallest, the most beautiful.'
  },
  {
    id: 'q31',
    ruleId: 'expressions',
    type: 'multiple-choice',
    question: 'I ___ to eat pizza tonight.',
    options: ['want', 'wanting', 'wants', 'wanted'],
    correctAnswer: 'want',
    explanation: 'Common expression: "want to + verb". I want to eat, she wants to go.'
  },
  {
    id: 'q32',
    ruleId: 'expressions',
    type: 'fill-blank',
    question: 'I ___ to go now. (necessity)',
    correctAnswer: 'have',
    explanation: 'Use "have to" to express necessity or obligation: I have to go, she has to study.'
  },
  {
    id: 'q33',
    ruleId: 'expressions',
    type: 'multiple-choice',
    question: 'I ___ like a coffee, please.',
    options: ['want', 'would', 'will', 'should'],
    correctAnswer: 'would',
    explanation: 'Use "would like" for polite requests: I would like a coffee = I want a coffee (polite).'
  },
  {
    id: 'q34',
    ruleId: 'sentence-structure',
    type: 'error-correction',
    question: 'Football play they.',
    correctAnswer: 'They play football.',
    explanation: 'Correct order is Subject + Verb + Object: They (S) + play (V) + football (O).'
  },
  {
    id: 'q35',
    ruleId: 'be-verb',
    type: 'fill-blank',
    question: 'He ___ a teacher.',
    correctAnswer: 'is',
    explanation: 'Use "is" with he/she/it: He is a teacher, She is a doctor.'
  },
  {
    id: 'q36',
    ruleId: 'simple-present',
    type: 'error-correction',
    question: 'She go to school every day.',
    correctAnswer: 'She goes to school every day.',
    explanation: 'Add "s" or "es" to verbs with he/she/it in simple present: go → goes.'
  },
  {
    id: 'q37',
    ruleId: 'present-continuous',
    type: 'error-correction',
    question: 'They working now.',
    correctAnswer: 'They are working now.',
    explanation: 'Present continuous needs am/is/are + verb-ing: They are working.'
  },
  {
    id: 'q38',
    ruleId: 'simple-past',
    type: 'fill-blank',
    question: 'She ___ to Paris last year. (go)',
    correctAnswer: 'went',
    explanation: '"Go" is irregular. Past form is "went", not "goed".'
  },
  {
    id: 'q39',
    ruleId: 'future',
    type: 'multiple-choice',
    question: 'Tomorrow, we ___ visit our friends.',
    options: ['will', 'are will', 'will are', 'wills'],
    correctAnswer: 'will',
    explanation: 'Future with "will": subject + will + base verb. We will visit.'
  },
  {
    id: 'q40',
    ruleId: 'modal-verbs',
    type: 'multiple-choice',
    question: 'You ___ stop at red lights. (obligation)',
    options: ['can', 'must', 'should', 'may'],
    correctAnswer: 'must',
    explanation: 'Use "must" for strong obligation or rules: You must stop at red lights.'
  },
  {
    id: 'q41',
    ruleId: 'questions',
    type: 'multiple-choice',
    question: '___ does she live?',
    options: ['What', 'Where', 'Who', 'How'],
    correctAnswer: 'Where',
    explanation: 'Use "Where" to ask about location: Where does she live?'
  },
  {
    id: 'q42',
    ruleId: 'questions',
    type: 'error-correction',
    question: 'She does speak Spanish?',
    correctAnswer: 'Does she speak Spanish?',
    explanation: 'Question word order: Does + subject + base verb? Does she speak Spanish?'
  },
  {
    id: 'q43',
    ruleId: 'articles',
    type: 'multiple-choice',
    question: 'I saw ___ cat. ___ cat was black. (first blank)',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 'a',
    explanation: 'Use "a/an" for first mention (non-specific): I saw a cat. Then use "the" for second mention: The cat was black.'
  },
  {
    id: 'q44',
    ruleId: 'prepositions',
    type: 'multiple-choice',
    question: 'This gift is ___ you.',
    options: ['in', 'on', 'at', 'for'],
    correctAnswer: 'for',
    explanation: 'Use "for" to show purpose or recipient: This gift is for you.'
  },
  {
    id: 'q45',
    ruleId: 'countable-uncountable',
    type: 'error-correction',
    question: 'I need many money.',
    correctAnswer: 'I need much money.',
    explanation: 'Money is uncountable. Use "much" not "many": much money, much information.'
  },
  {
    id: 'q46',
    ruleId: 'comparatives',
    type: 'fill-blank',
    question: 'This is ___ best day ever! (superlative)',
    correctAnswer: 'the',
    explanation: 'Always use "the" with superlatives: the best, the worst, the most expensive.'
  },
  {
    id: 'q47',
    ruleId: 'expressions',
    type: 'multiple-choice',
    question: 'I ___ to learn English.',
    options: ['try', 'trying', 'tries', 'tried'],
    correctAnswer: 'try',
    explanation: 'Pattern: try to + verb. I try to learn, she tries to understand.'
  },
  {
    id: 'q48',
    ruleId: 'sentence-structure',
    type: 'multiple-choice',
    question: 'What is the correct sentence structure?',
    options: ['Subject + Object + Verb', 'Verb + Subject + Object', 'Subject + Verb + Object', 'Object + Verb + Subject'],
    correctAnswer: 'Subject + Verb + Object',
    explanation: 'English uses S + V + O order: I (S) love (V) pizza (O).'
  }
]
