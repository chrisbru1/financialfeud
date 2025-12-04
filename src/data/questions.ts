export interface SurveyAnswer {
  label: string
  points: number
}

export interface MultiAnswer {
  label: string
  isCorrect: boolean
}

// Base question properties
interface BaseQuestion {
  id: number
  roundLabel: string
  title: string
  prompt: string
  hostNotes: string
}

// Discriminated union for different question types
export type Question =
  | (BaseQuestion & {
      type: "survey"
      answers: SurveyAnswer[]
    })
  | (BaseQuestion & {
      type: "multi"
      answers: MultiAnswer[]
    })
  | (BaseQuestion & {
      type: "closest"
      correctAnswer: number | null
      expectedRange?: { min: number; max: number }
    })
  | (BaseQuestion & {
      type: "open"
    })
  | (BaseQuestion & {
      type: "lightning"
    })

export const QUESTIONS: Question[] = [
  // 1–8: Fundamentals of P&L & profitability
  {
    id: 1,
    roundLabel: "Round 1",
    title: "Where does $1 of revenue go?",
    type: "survey",
    prompt:
      "When we make $1 in net revenue, name the main buckets it flows into on our P&L.",
    answers: [
      { label: "Sales & Marketing spend", points: 50 },
      { label: "R&D / product development", points: 30 },
      { label: "Aggregator COGS (Twilio)", points: 25 },
      { label: "G&A and overhead", points: 20 },
      { label: "Infrastructure and Hosting COGS (AWS, Givecard, OpenAI)", points: 10 },
    ] as SurveyAnswer[],
    hostNotes:
      "Feud-style: any bucket they name that matches one of these earns the corresponding points.",
  },
  {
    id: 2,
    roundLabel: "Round 2",
    title: "How much do we keep as gross profit?",
    type: "closest",
    prompt:
      "What is Postscript's gross margin % of net revenue?",
    hostNotes:
      "75 points if exact, 50 points for closest if no one gets it exactly, 25 points if second closest answered inside 65-75.",
    correctAnswer: 70,
    expectedRange: { min: 65, max: 75 },
  },
  {
    id: 3,
    roundLabel: "Round 3",
    title: "What actually moves gross margin?",
    type: "survey",
    prompt:
      "Name the items with the biggest impact on gross margin.",
    answers: [
      {
        label: "Pricing & packaging (net revenue per message, multi-product attach)",
        points: 50,
      },
      {
        label: "Aggregator economics (Twilio)",
        points: 30,
      },
      {
        label: "Infrastructure cost efficiency (hosting, data infra, LLM token usage)",
        points: 20,
      },
      {
        label: "Support & managed services efficiency (per-customer effort)",
        points: 10,
      },
    ] as SurveyAnswer[],
    hostNotes:
      "Top 4 levers; award points when they land them.",
  },
  {
    id: 4,
    roundLabel: "Round 4",
    title: "Revenue growth vs. Cost Efficiency — what matters first?",
    type: "open",
    prompt:
      "If you could only improve ONE lever first to get to profitability faster, would you pick expense efficiency or revenue growth? And why?",
    hostNotes:
      "Good reasoning: Margin fixes 'how much we keep' on every dollar. Growth multiplies whatever structure we already have (good or bad). Sequence usually: fix structural margin problems → then scale growth. Score subjectively based on quality of argument.",
  },
  {
    id: 5,
    roundLabel: "Round 5",
    title: "Gross margin benchmark (Closest to Pin)",
    type: "closest",
    prompt:
      "What's a healthy gross margin for a ~$100M SaaS business, including usage-based components like ours?",
    hostNotes:
      "75 points if exact, 50 points for closest if no one gets it exactly, 25 points if second closest answered inside 70-80.",
    correctAnswer: 75,
    expectedRange: { min: 70, max: 80 },
  },
  {
    id: 6,
    roundLabel: "Round 6",
    title: "How much OpEx do efficient SaaS companies spend?",
    type: "closest",
    prompt:
      "Think of a profitable $100M SaaS company. Based on known benchmarks, roughly what % of revenue do they spend on total operating expenses (S&M + R&D + G&A)?",
    hostNotes:
      "75 points if exact, 50 points for closest if no one gets it exactly, 25 points if second closest answered inside 55-65.",
    correctAnswer: 60,
    expectedRange: { min: 55, max: 65 },
  },
  {
    id: 7,
    roundLabel: "Round 7",
    title: "What is the formula for Rule of 40, and what is this metric used for?",
    type: "open",
    prompt:
      "What is the formula for Rule of 40, and what is this metric used for?",
    hostNotes:
      "Score based on understanding of the formula (growth rate + profit margin) and its use in evaluating SaaS company health.",
  },
  {
    id: 8,
    roundLabel: "Round 8",
    title: "What's a healthy EBITDA margin at scale?",
    type: "closest",
    prompt:
      "For a B2B SaaS business at scale, what's a healthy operating (EBITDA) margin range once you're running efficiently?",
    hostNotes:
      "Expected range: 10–20. So anything in low-to-mid teens = 'good'; under 10 or over 25 is unrealistic for the use case you're teaching.",
    correctAnswer: 15,
    expectedRange: { min: 10, max: 20 },
  },
  // 9–18: Your original question set, renumbered
  {
    id: 9,
    roundLabel: "Round 9",
    title: "Profitability myth busting (Pick the Lie)",
    type: "multi",
    prompt: "Which of these statements about profitability is FALSE?",
    answers: [
      {
        label: "A dollar saved is worth a dollar earned.",
        isCorrect: false,
      },
      {
        label: "You can grow and be profitable at the same time.",
        isCorrect: false,
      },
      {
        label: "We become profitable mainly by cutting our way there.",
        isCorrect: true,
      },
      {
        label: "Profitable companies have higher valuations.",
        isCorrect: false,
      },
    ] as MultiAnswer[],
    hostNotes:
      "Correct 'lie': Statement #3. Emphasize that durable profit comes from better margin structure + quality of revenue, not just slashing costs.",
  },
  {
    id: 10,
    roundLabel: "Round 10",
    title: "What drives long-term revenue growth?",
    type: "survey",
    prompt:
      "Top 5 factors that influence our long-term revenue growth.",
    answers: [
      { label: "Net revenue retention (renewals + expansion)", points: 50 },
      { label: "New logo acquisition volume & ACV", points: 40 },
      { label: "Product differentiation / category advantage", points: 20 },
      { label: "Product expansion", points: 20 },
      { label: "Sales execution (win rates, pipeline generation)", points: 20 },
    ] as SurveyAnswer[],
    hostNotes: "Feud-style scoring.",
  },
  {
    id: 11,
    roundLabel: "Round 11",
    title: "ARR per employee benchmark",
    type: "closest",
    prompt:
      "What's a healthy ARR (or net revenue) per employee benchmark for an efficient ~$100M SaaS company?",
    hostNotes:
      "75 points if exact, 50 points for closest if no one gets it exactly, 25 points if second closest answered inside 300,000–400,000.",
    correctAnswer: 350000,
    expectedRange: { min: 300000, max: 400000 },
  },
  {
    id: 12,
    roundLabel: "Round 12",
    title: "Our ARR per FTE (Reality check)",
    type: "closest",
    prompt:
      "Now guess OUR current ARR (or net revenue) per employee.",
    hostNotes:
      "75 points if exact, 50 points for closest if no one gets it exactly, 25 points if second closest answered inside 260,000–310,000.",
    correctAnswer: 285000,
    expectedRange: { min: 260000, max: 310000 },
  },
  {
    id: 13,
    roundLabel: "Round 13",
    title: "OpEx mix by function",
    type: "survey",
    prompt:
      "Rank these functions by typical % of revenue spend at ~$100M SaaS: Sales & Marketing, R&D, G&A.",
    answers: [
      { label: "Sales & Marketing", points: 30 },
      { label: "R&D", points: 20 },
      { label: "G&A", points: 10 },
    ] as SurveyAnswer[],
    hostNotes: "Ranked list, both teams get a list to organize. That's the 'canonical' ordering (highest % to lowest).",
  },
  {
    id: 15,
    roundLabel: "Round 15",
    title: "Lightning 'Would You Rather?'",
    type: "lightning",
    prompt:
      "Rapid-fire trade-offs — buzz in and justify your pick.",
    hostNotes: "No strict answer key – it's argument-based. You'll probably have a list of 3–4 trade-offs prepared and give ~10 points to the stronger argument each time.",
  },
];


