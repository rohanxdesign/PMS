import { Card, CardContent, CardHeader } from "@/app/components/ui/Card";
import { KPI } from "@/app/components/ui/KPI";

export default function MarketingClient({ params }: { params: { id: string } }) {
  const clientName = decodeURIComponent(params.id ?? "Client");
  return (
    <main className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">Marketing – {clientName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPI label="Active Projects" value={3} />
        <KPI label="Queued Posts" value={12} />
        <KPI label="Avg. Turnaround (d)" value={4.2} />
      </div>
      <Card>
        <CardHeader>Recent Deliverables</CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            <li>Carousel: Festival Campaign</li>
            <li>Reel: BTS shoot</li>
            <li>Blog: Monthly report</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}



