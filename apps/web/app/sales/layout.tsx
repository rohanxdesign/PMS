import SectionNav from "@/app/components/nav/SectionNav";
import { FileText, LayoutGrid } from "lucide-react";

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SectionNav
        items={[
          { href: "/sales/command-center", label: "Command Center", icon: <FileText className="h-4 w-4" /> },
          { href: "/sales/leads", label: "Leads", icon: <LayoutGrid className="h-4 w-4" /> },
        ]}
      />
      {children}
    </div>
  );
}


