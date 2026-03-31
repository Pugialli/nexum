import { DashboardAluno } from "@/components/dashboard/dashboard";

const chartData = [
  { test: "10", score: 32, gcp: 58, date: "10/01/2024" },
  { test: "20", score: 28, gcp: 62, date: "24/01/2024" },
  { test: "30", score: 41, gcp: 65, date: "07/02/2024" },
  { test: "40", score: 35, gcp: 70, date: "21/02/2024" },
  { test: "50", score: 42, gcp: 68, date: "06/03/2024" },
  { test: "60", score: 30, gcp: 72, date: "20/03/2024" },
  { test: "70", score: 37, gcp: 75, date: "03/04/2024" },
  { test: "80", score: 29, gcp: 80, date: "17/04/2024" },
  { test: "90", score: 33, gcp: 85, date: "01/05/2024" },
  { test: "100", score: 38, gcp: 88, date: "15/05/2024" },
];

export default function Page() {
  return (
    <div className="h-screen w-full p-4 sm:p-10 pt-2 sm:pt-4 flex flex-col gap-4">
      <DashboardAluno alunoData={chartData} />
    </div>
  )
}
