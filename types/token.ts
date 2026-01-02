export type TokenStatus = "New Pair" | "Final Stretch" | "Migrated";
export interface Token {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: number;
  status: TokenStatus;
}
