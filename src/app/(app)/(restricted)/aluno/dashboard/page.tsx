import { DashboardAluno } from "@/components/dashboard/dashboard";

const chartData = [
  { test: "1", score: 32, gcp: 58, date: "10/01/2024" },
  { test: "2", score: 28, gcp: 62, date: "24/01/2024" },
  { test: "3", score: 41, gcp: 65, date: "07/02/2024" },
  { test: "4", score: 35, gcp: 70, date: "21/02/2024" },
  { test: "5", score: 42, gcp: 68, date: "06/03/2024" },
  { test: "6", score: 30, gcp: 72, date: "20/03/2024" },
  { test: "7", score: 37, gcp: 75, date: "03/04/2024" },
  { test: "8", score: 29, gcp: 80, date: "17/04/2024" },
  { test: "9", score: 33, gcp: 85, date: "01/05/2024" },
  { test: "10", score: 38, gcp: 88, date: "15/05/2024" },
];

export default function Page() {
  return (
    <div className="h-screen w-full p-4 sm:p-10 pt-2 sm:pt-4 flex flex-col gap-4">
      <DashboardAluno alunoData={chartData} />
    </div>
  )
}
