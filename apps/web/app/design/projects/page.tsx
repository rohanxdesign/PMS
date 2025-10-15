import { Card, CardContent, CardHeader } from "@/app/components/ui/Card";

export default function DesignProjects() {
  const projects = [
    { name: "Brand Refresh", bandwidth: 60 },
    { name: "Client A – Festival Pack", bandwidth: 30 },
    { name: "Client B – Socials", bandwidth: 70 },
  ];
  return (
    <main className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">Design – My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Card key={p.name}>
            <CardHeader>{p.name}</CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">Bandwidth</div>
              <div className="mt-2 h-2 w-full rounded bg-gray-100">
                <div className="h-2 rounded bg-blue-500" style={{ width: `${p.bandwidth}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}



