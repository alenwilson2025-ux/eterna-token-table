import { Token } from "@/types/token";

export const tokens: Token[] = [
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    price: 2350.25,
    change: 1.25,
    volume: 1200000,
    status: "New Pair",
  },
  {
    id: 2,
    name: "Solana",
    symbol: "SOL",
    price: 98.75,
    change: -0.85,
    volume: 850000,
    status: "Final Stretch",
  },
  {
    id: 3,
    name: "Polygon",
    symbol: "MATIC",
    price: 0.92,
    change: 0.45,
    volume: 640000,
    status: "Migrated",
  },
];
