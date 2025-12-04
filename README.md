# Financial Feud

A gameshow webapp inspired by Family Feud, themed around financial topics. Perfect for team offsites and financial education events!

## Features

- 🎮 Interactive game board with clickable answers
- 👥 Two-team scoring system
- ⚡ Strike system (3 strikes = team switch)
- 💰 Financial-themed questions and answers
- 🎨 Beautiful, modern UI with smooth animations
- 📱 Responsive design for all screen sizes

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Play

1. Two teams compete to guess the top answers to financial questions
2. Click on hidden answer cards to reveal them
3. Points are awarded based on the answer's ranking
4. Teams get 3 strikes before switching turns
5. Use the control panel to manage strikes, switch teams, and navigate questions

## Customization

Edit `src/App.tsx` to add your own questions and answers. Each question should have 5 answers with point values that add up to 100.

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS3 with modern features (backdrop-filter, gradients, animations)



