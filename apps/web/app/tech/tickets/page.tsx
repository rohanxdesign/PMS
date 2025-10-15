import { Table, THead, TRow, TH, TD } from "@/app/components/ui/Table";

export default function TechTickets() {
  const rows = [
    { title: "API rate limit bug", status: "Backlog", assignee: "Maya", deps: "#45" },
    { title: "Webhook retry logic", status: "In Progress", assignee: "Lee", deps: "-" },
    { title: "Add audit logs", status: "Review", assignee: "Zed", deps: "#12" },
  ];
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Technical – Tickets</h1>
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <Table>
          <THead>
            <TRow>
              <TH>Title</TH>
              <TH>Status</TH>
              <TH>Assignee</TH>
              <TH>Dependencies</TH>
            </TRow>
          </THead>
          <tbody>
            {rows.map((r, idx) => (
              <TRow key={idx}>
                <TD>{r.title}</TD>
                <TD>{r.status}</TD>
                <TD>{r.assignee}</TD>
                <TD>{r.deps}</TD>
              </TRow>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
}



