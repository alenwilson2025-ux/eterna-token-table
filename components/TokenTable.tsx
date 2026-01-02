"use client";

import { useEffect, useState } from "react";
import { tokens as initialTokens } from "@/data/tokens";
import { TokenStatus, Token } from "@/types/token";

const tabs: TokenStatus[] = [
  "New Pair",
  "Final Stretch",
  "Migrated",
];

export default function TokenTable() {
  const [activeTab, setActiveTab] =
    useState<TokenStatus>("New Pair");
  const [sortAsc, setSortAsc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedToken, setSelectedToken] =
    useState<Token | null>(null);

  const [liveTokens, setLiveTokens] =
    useState<Token[]>(initialTokens);

  const [priceFlash, setPriceFlash] =
    useState<Record<number, "up" | "down">>({});
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTokens((prev) => {
        const flash: Record<number, "up" | "down"> = {};

        const updated = prev.map((token) => {
          const delta = (Math.random() - 0.5) * 2;
          flash[token.id] = delta >= 0 ? "up" : "down";

          return {
            ...token,
            price: Number((token.price + delta).toFixed(2)),
            change: Number(delta.toFixed(2)),
          };
        });

        setPriceFlash(flash);
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!Object.keys(priceFlash).length) return;
    const timer = setTimeout(() => setPriceFlash({}), 600);
    return () => clearTimeout(timer);
  }, [priceFlash]);

  const tokens = liveTokens
    .filter((t) => t.status === activeTab)
    .sort((a, b) =>
      sortAsc ? a.price - b.price : b.price - a.price
    );

  const SkeletonRow = () => (
    <tr className="border-b border-gray-900 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} className="py-4">
          <div className="h-4 w-24 bg-gray-800 rounded" />
        </td>
      ))}
    </tr>
  );

  const Tooltip = ({ text }: { text: string }) => (
    <span className="relative group ml-2 inline-flex">
      <span className="cursor-pointer text-gray-400 hover:text-white text-sm">
        ⓘ
      </span>
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
        hidden group-hover:block whitespace-nowrap
        rounded bg-black px-2 py-1 text-xs text-white
        border border-gray-700 z-50"
      >
        {text}
      </span>
    </span>
  );

  return (
    <div className="mt-6">
      <div className="flex justify-center gap-6 border-b border-gray-800 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm transition ${
              activeTab === tab
                ? "text-white border-b-2 border-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                <th className="py-3">Token</th>
                <th
                  className="py-3 cursor-pointer"
                  onClick={() => setSortAsc(!sortAsc)}
                >
                  Price {sortAsc ? "↑" : "↓"}
                </th>
                <th className="py-3">Change</th>
                <th className="py-3">Volume</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))
                : tokens.map((token) => (
                    <tr
                      key={token.id}
                      onClick={() => setSelectedToken(token)}
                      className="border-b border-gray-900 hover:bg-gray-900 hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      <td className="py-4 font-medium">
                        {token.name}{" "}
                        <span className="text-gray-500 text-sm">
                          ({token.symbol})
                        </span>
                      </td>

                      <td className="py-4">
                        <div className="flex items-center">
                          <span
                            className={`transition-colors duration-500 ${
                              priceFlash[token.id] === "up"
                                ? "text-green-400"
                                : priceFlash[token.id] === "down"
                                ? "text-red-400"
                                : ""
                            }`}
                          >
                            ${token.price.toFixed(2)}
                          </span>
                          <Tooltip text="Last traded price" />
                        </div>
                      </td>

                      <td
                        className={`py-4 ${
                          token.change >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        <div className="flex items-center">
                          <span>
                            {token.change >= 0 ? "+" : ""}
                            {token.change}%
                          </span>
                          <Tooltip text="24h price change" />
                        </div>
                      </td>

                      <td className="py-4">
                        {token.volume.toLocaleString()}
                      </td>

                      <td className="py-4">
                        <span className="px-2 py-1 text-xs rounded bg-gray-800">
                          {token.status}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedToken && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0b0f14] w-[420px] rounded-lg p-6 relative animate-scaleIn">
            <button
              onClick={() => setSelectedToken(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold">
              {selectedToken.name}
            </h2>
            <p className="text-gray-400 mb-4">
              {selectedToken.symbol}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span>${selectedToken.price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Change</span>
                <span
                  className={
                    selectedToken.change >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {selectedToken.change >= 0 ? "+" : ""}
                  {selectedToken.change}%
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Volume</span>
                <span>
                  {selectedToken.volume.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="px-2 py-1 text-xs rounded bg-gray-800">
                  {selectedToken.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
