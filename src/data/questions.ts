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
      "Name the 5 expense categories that build our Operating Expenses (OpEx) in the P&L.",
    answers: [
      { label: "Sales & Marketing", points: 40 },
      { label: "R&D / Product Development", points: 30 },
      { label: "G&A / Overhead", points: 20 },
      { label: "Customer Support / Success", points: 15 },
      { label: "Other OpEx (tools, contractors, travel)", points: 10 },
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
      "What percentage of our net revenue do we keep after paying all messaging fees (Twilio, carrier fees, etc.)?",
    hostNotes:
      "We are looking for a percentage answer like 70%. 75 points if exact, 50 points for closest if no one gets it exactly, 25 points if second closest answered inside 65-75.",
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
        label: "Shopper & Fondue pricing / attach",
        points: 30,
      },
      {
        label: "Core SMS pricing / net revenue per message",
        points: 25,
      },
      {
        label: "Twilio aggregator fees",
        points: 20,
      },
      {
        label: "Carrier route mix and SMS fees",
        points: 15,
      },
      {
        label: "Hosting and data infrastructure",
        points: 10,
      },
      {
        label: "AI / token efficiency",
        points: 10,
      },
      {
        label: "Support effort per customer",
        points: 5,
      },
    ] as SurveyAnswer[],
    hostNotes:
      "Top levers; award points when they land them.",
  },
  {
    id: 4,
    roundLabel: "Round 4",
    title: "Revenue growth vs. Cost Efficiency — what matters first?",
    type: "open",
    prompt:
      "If you could only improve ONE lever first to get to profitability faster, would you pick expense efficiency or revenue growth? And why?",
    hostNotes:
      "Facilitated debate, score manually based on reasoning.",
  },
  {
    id: 5,
    roundLabel: "Round 5",
    title: "What's a healthy gross margin% at scale?",
    type: "closest",
    prompt:
      "For a ~$100M SaaS business, what is a healthy gross margin percentage?",
    hostNotes:
      "Expected range is 70–80%. 75 points if exact, 50 points for closest if no one gets it exactly, 25 points if second closest answered inside 70-80.",
    correctAnswer: 75,
    expectedRange: { min: 70, max: 80 },
  },
  {
    id: 6,
    roundLabel: "Round 6",
    title: "How much OpEx do efficient SaaS companies spend?",
    type: "closest",
    prompt:
      "If a profitable SaaS company makes $100M, what % should be spent on Operating Expenses (Sales & Marketing + R&D + G&A)?",
    hostNotes:
      "Expected range is ~55–65%. 75 points if exact, 50 points for closest if no one gets it exactly, 25 points if second closest answered inside 55-65.",
    correctAnswer: 60,
    expectedRange: { min: 55, max: 65 },
  },
  {
    id: 7,
    roundLabel: "Round 7",
    title: "What is the Rule of 40?",
    type: "open",
    prompt:
      "What is the formula for Rule of 40, and what is this metric used for in SaaS?",
    hostNotes:
      "The formula is revenue growth % + operating margin %. Score based on understanding of the formula and its use in evaluating SaaS company health.",
  },
  {
    id: 8,
    roundLabel: "Round 8",
    title: "What's a healthy EBITDA margin at scale?",
    type: "closest",
    prompt:
      "After paying all expenses, what EBITDA margin % is considered healthy for a scaled B2B SaaS business?",
    hostNotes:
      "EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is profit after all operating expenses. Expected range: 10–20%. So anything in low-to-mid teens = 'good'; under 10 or over 25 is unrealistic for the use case you're teaching.",
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
      { label: "Decrease churn and improve retention", points: 40 },
      { label: "Expand existing customers via upsell/attach", points: 35 },
      { label: "Acquire new customers in ICP", points: 30 },
      { label: "Increase pipeline opportunities", points: 20 },
      { label: "Improve product differentiation", points: 20 },
      { label: "Improve sales execution including win rates and velocity", points: 15 },
    ] as SurveyAnswer[],
    hostNotes: "Feud-style scoring.",
  },
  {
    id: 11,
    roundLabel: "Round 11",
    title: "ARR per employee benchmark",
    type: "closest",
    prompt:
      "ARR = Annual Recurring Revenue. For an efficient ~$100M SaaS company, what is a healthy ARR (or net revenue) per employee?",
    hostNotes:
      "ARR is Annual Recurring Revenue. Scaled benchmarks land around $300–350k per FTE. 75 points if exact, 50 points for closest if no one gets it exactly, 25 points if second closest answered inside 300,000–400,000.",
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


