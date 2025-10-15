import { KPI } from "@/app/components/ui/KPI";
import Link from "next/link";

export default function FoundersDashboard() {
  return (
    <main className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold">Founders’ Command Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPI label="Active Clients" value={52} trend="▲ +3 this week" />
        <KPI label="SLA Breaches (7d)" value={4} trend="▼ -2 vs last week" />
        <KPI label="Utilization" value={"78%"} trend="Design high, Tech moderate" />
        <KPI label="Open Tickets" value={23} trend="7 overdue" />
      </div>
      <div>
        <Link href="/founders/reports" className="text-blue-700 underline">View weekly reports →</Link>
      </div>
    </main>
  );
}
