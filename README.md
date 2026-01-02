# Token Discovery Table

A frontend token discovery table inspired by trading platforms like Axiom Trade.
Built using Next.js, TypeScript, and Tailwind CSS.

## Features

- Token discovery tabs (New Pair, Final Stretch, Migrated)
- Sort tokens by price (ascending / descending)
- Skeleton loader while data loads
- Tooltips for price and change information
- Modal with detailed token information
- Simulated real-time price updates
- Price flash animation (green/red) on updates
- Responsive and centered table layout

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Real-Time Price Simulation

Prices are updated every few seconds using a timer-based system.
When the state updates, React automatically re-renders the UI,
creating a real-time market-like experience.

## How to Run Locally

```bash
npm install
npm run dev
