import { GcpLineChart } from "@/components/gcp-line-chart";
import { HabilidadesChart } from "@/components/habilidades-chart";
import { TestsBarChart } from "@/components/tests-bar-chart";

export default function Page() {
  return (
    <div className="h-[calc(100vh-theme(space.24))] w-full p-4 sm:p-10">
      <div className="grid h-full w-full grid-rows-2 gap-8">
        <div className="min-h-0">
          <TestsBarChart />
        </div>
        <div className="grid min-h-0 grid-cols-2 gap-8">
          <GcpLineChart />
          <HabilidadesChart />
        </div>
      </div>
    </div>
  );
}
