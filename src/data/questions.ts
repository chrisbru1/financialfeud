export interface SurveyAnswer {
  label: string
  points: number
}

export interface MultiAnswer {
  label: string
  isCorrect: boolean
}

export interface Question {
  id: number
  roundLabel: string
  title: string
  type: "survey" | "closest" | "multi" | "open" | "lightning"
  prompt: string
  answers?: SurveyAnswer[] | MultiAnswer[]
  hostNotes: string
  correctAnswer?: number | string // For closest and open questions
  expectedRange?: { min: number; max: number } // For closest questions
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    roundLabel: "Round 1",
    title: "What drives long-term revenue growth?",
    type: "survey",
    prompt: "Top 5 factors that influence our long-term revenue growth, ranked by impact.",
    answers: [
      { label: "Net revenue retention (renewals + expansion)", points: 30 },
      { label: "New logo acquisition volume & ACV", points: 25 },
      { label: "Product differentiation / category advantage", points: 20 },
      { label: "TAM expansion via new surfaces & pricing layers", points: 15 },
      { label: "Sales execution (conversion rates, velocity)", points: 10 },
    ] as SurveyAnswer[],
    hostNotes: "Let teams propose their own top-5, then reveal.",
  },
  {
    id: 2,
    roundLabel: "Round 2",
    title: "Gross margin benchmark (Closest to Pin)",
    type: "closest",
    prompt: "What's a healthy gross margin for a ~$100M SaaS business, including usage-based components like ours?",
    hostNotes: "Expected answer: 70–80%. Award based on closeness.",
    correctAnswer: 75,
    expectedRange: { min: 70, max: 80 },
  },
  {
    id: 3,
    roundLabel: "Round 3",
    title: "What moves our gross margin fastest?",
    type: "survey",
    prompt: "Name the biggest levers that improve *our* gross margin the fastest.",
    answers: [
      { label: "Pricing & packaging power / rate discipline", points: 30 },
      { label: "Aggregator cost optimization + channel mix (e.g., RCS)", points: 25 },
      { label: "Implementation & support efficiency (employees per message)", points: 20 },
      { label: "Infrastructure cost per message (hosting / data infra)", points: 15 },
      { label: "Product mix shift toward higher-margin AI & automation", points: 10 },
    ] as SurveyAnswer[],
    hostNotes: "Reveal top-5 one by one.",
  },
  {
    id: 4,
    roundLabel: "Round 4",
    title: "Pick the Lie (Myth busting)",
    type: "multi",
    prompt: "Which of these statements is FALSE?",
    answers: [
      { label: "Pricing influences gross margin more than infra costs.", isCorrect: false },
      { label: "High growth always requires high burn.", isCorrect: true },
      { label: "G&A as a % of revenue should decline with scale.", isCorrect: false },
      { label: "Revenue per employee is a useful health metric.", isCorrect: false },
    ] as MultiAnswer[],
    hostNotes: "Correct answer = 'High growth always requires high burn.'",
  },
  {
    id: 5,
    roundLabel: "Round 5",
    title: "ARR per employee benchmark",
    type: "closest",
    prompt: "What's a healthy ARR (or net revenue) per employee benchmark for an efficient ~$100M SaaS company?",
    hostNotes: "Expected range: $200–300K per FTE.",
    correctAnswer: 250,
    expectedRange: { min: 200, max: 300 },
  },
  {
    id: 6,
    roundLabel: "Round 6",
    title: "Our ARR per FTE (Reality check)",
    type: "closest",
    prompt: "Now guess OUR current ARR (or net revenue) per employee.",
    hostNotes: "Insert our real number internally. Same scoring rules.",
    correctAnswer: 0, // To be filled in with actual value
  },
  {
    id: 7,
    roundLabel: "Round 7",
    title: "OpEx mix by function",
    type: "survey",
    prompt: "Rank these functions by typical % of revenue spend at ~$100M SaaS: Sales & Marketing, R&D, G&A.",
    answers: [
      { label: "Sales & Marketing (~35–45% of revenue)", points: 30 },
      { label: "R&D (~20–30% of revenue)", points: 20 },
      { label: "G&A (~10–18% of revenue)", points: 10 },
    ] as SurveyAnswer[],
    hostNotes: "Reveal ordering and compare to our mix.",
  },
  {
    id: 8,
    roundLabel: "Round 8",
    title: "Trade-off challenge",
    type: "open",
    prompt: "You must reduce OpEx by 3 points of revenue. Which functions give up what, and why?",
    hostNotes: "Award up to 40 pts based on depth & realism.",
  },
  {
    id: 9,
    roundLabel: "Round 9",
    title: "Lightning 'Would You Rather?'",
    type: "lightning",
    prompt: "Rapid-fire trade-offs — buzz in and justify your pick.",
    hostNotes: "Award points for reasoning, not correctness.",
  },
  {
    id: 10,
    roundLabel: "Final",
    title: "Misconceptions showdown",
    type: "open",
    prompt: "What's the biggest financial misconception GTM has about R&D — and vice versa?",
    hostNotes: "Award up to 40 pts for honesty and depth.",
  },
];


