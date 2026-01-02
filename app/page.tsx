import TokenTable from "@/components/TokenTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6" >
      <div className="flex justify-center">
      <h1 className="text-2xl font-semibold">
        Token Trading Table
      </h1></div>
      <div className="flex justify-center">
      <p className="text-gray-400 mt-2">
        Real-time token market data
      </p></div>
      <TokenTable />
    </main>
  );
}
