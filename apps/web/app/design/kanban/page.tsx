import { KanbanBoard } from "@/app/components/kanban/Kanban";

export default function DesignKanban() {
  const columns = [
    { id: "backlog", title: "Backlog", items: [ { id: "1", title: "Logo revision" } ] },
    { id: "progress", title: "In Progress", items: [ { id: "2", title: "Carousel mock" } ] },
    { id: "review", title: "Review", items: [ ] },
    { id: "client", title: "Client Review", items: [ ] },
    { id: "revisions", title: "Revisions", items: [ ] },
    { id: "ready", title: "Ready to Post", items: [ ] },
    { id: "done", title: "Done", items: [ ] },
  ];
  return (
    <main className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">Design – Kanban</h1>
      <KanbanBoard columns={columns} />
    </main>
  );
}



