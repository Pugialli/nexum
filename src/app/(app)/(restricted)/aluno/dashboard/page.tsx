import { GcpLineChart } from "@/components/gcp-line-chart";
import { TestsBarChart } from "@/components/tests-bar-chart";

export default function Page() {
  return (
    <div className="w-full p-4 sm:p-10 space-y-8">
      <TestsBarChart />
      <GcpLineChart />
    </div>
  );
}
