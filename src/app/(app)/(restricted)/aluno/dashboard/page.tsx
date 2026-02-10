import { GcpLineChart } from "@/components/gcp-line-chart";
import { TestsBarChart } from "@/components/tests-bar-chart";

export default function Page() {
  return (
    <div className="h-full w-full p-4 sm:p-10">
      <div className="flex h-full w-full flex-col gap-8">
        <TestsBarChart />
        <GcpLineChart />
      </div>
    </div>
  );
}
