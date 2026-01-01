"use client";

import { useState } from "react";
import { tokens as allTokens } from "@/data/tokens";
import { TokenStatus } from "@/types/token";

const tabs: TokenStatus[] = [
  "New Pair",
  "Final Stretch",
  "Migrated",
];

export default function TokenTable() {
    const [sortAsc, setSortAsc] = useState(false);
    const tokens = allTokens
  . filter((token) => token.status === activeTab)
    .sort((a, b) =>
    sortAsc ? a.price - b.price : b.price - a.price
    );

  return (
    <div className="mt-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-800 mb-4">
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
              <th className="py-3">Token</th>
              <th className="py-3">Change</th>
              <th
              className="py-3 cursor-pointer select-none"
              onClick={() => setSortAsc(!sortAsc)}>
              Price {sortAsc ? "↑" : "↓"}
              </th>
              <th className="py-3">Volume</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {tokens.map((token) => (
              <tr
                key={token.id}
                className="border-b border-gray-900 hover:bg-gray-900 transition"
              >
                <td className="py-4 font-medium">
                  {token.name}{" "}
                  <span className="text-gray-500 text-sm">
                    ({token.symbol})
                  </span>
                </td>

                <td className="py-4">
                  ${token.price.toFixed(2)}
                </td>

                <td
                  className={`py-4 ${
                    token.change >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {token.change >= 0 ? "+" : ""}
                  {token.change}%
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
  );
}
