import TokenTable from "@/components/TokenTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold">
        Token Discovery Table
      </h1>

      <p className="text-gray-400 mt-2">
        Real-time token market data
      </p>

      <TokenTable />
    </main>
  );
}
