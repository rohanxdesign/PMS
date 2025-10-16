import { KanbanBoard } from "@/app/components/ui/KanbanBoard";

export default function MarketingBoard() {
  const columns = [
    { id: "backlog", title: "Backlog", items: [ { id: "1", title: "Blog: Q4 Trends" } ] },
    { id: "brief", title: "Brief Sent", items: [ { id: "2", title: "Reel: Client A" } ] },
    { id: "design", title: "In Design", items: [ { id: "3", title: "Carousel: Tips" } ] },
    { id: "review", title: "Client Review", items: [ ] },
    { id: "approved", title: "Approved", items: [ ] },
    { id: "published", title: "Published", items: [ ] },
  ];
  return (
    <main className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">Marketing – Kanban</h1>
      <KanbanBoard columns={columns} />
    </main>
  );
}



