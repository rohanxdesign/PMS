"use client";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/app/components/ui/Card";
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import("recharts").then(m => m.LineChart), { ssr: false });
const Line = dynamic(() => import("recharts").then(m => m.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(m => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false });

export default function FoundersReports() {
  const data = [
    { week: "W1", sla: 2, posts: 18 },
    { week: "W2", sla: 3, posts: 21 },
    { week: "W3", sla: 1, posts: 24 },
    { week: "W4", sla: 4, posts: 20 },
  ];
  return (
    <main className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">Founders – Reports</h1>
      <Card>
        <CardHeader>Weekly SLA Breaches</CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sla" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}



