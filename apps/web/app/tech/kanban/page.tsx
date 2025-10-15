import { KanbanBoard } from "@/app/components/kanban/Kanban";

export default function TechKanban() {
  const columns = [
    { id: "backlog", title: "Backlog", items: [ { id: "1", title: "Refactor queue" } ] },
    { id: "progress", title: "In Progress", items: [ { id: "2", title: "Fix 500s" } ] },
    { id: "testing", title: "Testing", items: [] },
    { id: "review", title: "Review", items: [] },
    { id: "done", title: "Completed", items: [] },
  ];
  return (
    <main className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">Technical – Kanban</h1>
      <KanbanBoard columns={columns} />
    </main>
  );
}



