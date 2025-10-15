import { Table, THead, TRow, TH, TD } from "@/app/components/ui/Table";
import { formatCurrency } from "@/app/lib/fx";
import { SampleLead } from "@/app/data/sample";

interface DealsTableProps {
  leads: SampleLead[];
  fx: { nprPerInr: number; inrPerNpr: number } | null;
  onLeadClick: (lead: SampleLead) => void;
}

export function DealsTable({ leads, fx, onLeadClick }: DealsTableProps) {
  const getStageLabel = (stage: string) => {
    switch (stage) {
      case "New": return "New";
      case "Contacted": return "Meeting booked";
      default: return "Qualified";
    }
  };

  const getCurrencyDisplay = (lead: SampleLead) => {
    if (lead.country === "Nepal") {
      return {
        primary: formatCurrency(lead.totalAmount, "NPR"),
        secondary: fx ? formatCurrency(lead.totalAmount * fx.inrPerNpr, "INR") : "INR …"
      };
    } else {
      return {
        primary: formatCurrency(lead.totalAmount, "INR"),
        secondary: fx ? formatCurrency(lead.totalAmount * fx.nprPerInr, "NPR") : "NPR …"
      };
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1224px] mx-auto overflow-x-auto">
        <div className="min-w-[680px]">
          <Table>
            <THead>
              <TRow>
                <TH className="w-40">Lead Name</TH>
                <TH className="w-60">Total Amount</TH>
                <TH className="w-50">Owner</TH>
                <TH className="w-45">Stage</TH>
                <TH className="w-52">Company</TH>
                <TH className="flex-1">Remarks</TH>
              </TRow>
            </THead>
            <tbody>
              {leads.map((lead, idx) => {
                const currency = getCurrencyDisplay(lead);
                
                return (
                  <TRow
                    key={idx}
                    onClick={() => onLeadClick(lead)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <TD className="w-40">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-medium text-sm text-gray-900">
                          {lead.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lead.country}
                        </p>
                      </div>
                    </TD>
                    
                    <TD className="w-60">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-medium text-sm text-gray-900">
                          {currency.primary}
                        </p>
                        <p className="text-xs text-gray-500">
                          {currency.secondary}
                        </p>
                      </div>
                    </TD>
                    
                    <TD className="w-50">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-medium text-sm text-gray-900">
                          {lead.owner}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lead.totalDeals} deals
                        </p>
                      </div>
                    </TD>
                    
                    <TD className="w-45">
                      <div className="flex items-center">
                        <div className="bg-gray-100 px-2 py-1 rounded-full">
                          <p className="text-xs text-gray-600">
                            {getStageLabel(lead.stage)}
                          </p>
                        </div>
                      </div>
                    </TD>
                    
                    <TD className="w-52">
                      <p className="font-medium text-sm text-gray-900">
                        {lead.company}
                      </p>
                    </TD>
                    
                    <TD className="flex-1">
                      <p className="text-sm text-gray-900 truncate">
                        {lead.remarks || ''}
                      </p>
                    </TD>
                  </TRow>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
