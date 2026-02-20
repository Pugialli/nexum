import { GcpLineChart } from "@/components/gcp-line-chart";
import { HabilidadesChart } from "@/components/habilidades-chart";
import { TestsBarChart } from "@/components/tests-bar-chart";

const chartData = [
  { test: "1", score: 32, gcp: 58 },
  { test: "2", score: 28, gcp: 62 },
  { test: "3", score: 41, gcp: 65 },
  { test: "4", score: 35, gcp: 70 },
  { test: "5", score: 42, gcp: 68 },
  { test: "6", score: 30, gcp: 72 },
  { test: "7", score: 37, gcp: 75 },
  { test: "8", score: 29, gcp: 80 },
  { test: "9", score: 33, gcp: 85 },
  { test: "10", score: 38, gcp: 88 },
];

export default function Page() {
  return (
    <div className="h-screen w-full p-4 sm:p-10 pt-2 sm:pt-4 flex flex-col gap-4">
      <div className="flex-1 min-h-0 flex flex-col gap-4">
        <div className="min-h-0 flex-1">
          <TestsBarChart data={chartData} />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
          <GcpLineChart data={chartData} />
          <HabilidadesChart />
        </div>
      </div>
    </div>
  );
}
