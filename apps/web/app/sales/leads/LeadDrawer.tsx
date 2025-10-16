"use client";
import * as React from "react";
import { Badge } from "@/app/components/ui/Badge";
import { useFirebaseLeads } from "@/app/context/FirebaseLeadsContext";
import { formatCurrency } from "@/app/lib/fx";

export function LeadDrawer({ lead, onClose }: { lead: any; onClose: () => void }) {
  const { deals } = useFirebaseLeads();
  
  if (!lead) return null;

  // Get deals associated with this lead
  const associatedDeals = deals.filter(deal => deal.leadId === lead.id);
  
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/20" onClick={onClose} />
      <aside className="w-full max-w-lg bg-white border-l shadow-xl p-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{lead.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="mt-1 text-sm text-gray-500">{lead.company}</div>
        <div className="mt-3 flex gap-2">
          <Badge color={lead.stage === "New" ? "gray" : lead.stage === "Contacted" ? "blue" : "green"}>{lead.stage}</Badge>
          <Badge>{lead.country}</Badge>
        </div>
        
        <div className="mt-6 space-y-4">
          <div>
            <div className="text-xs uppercase text-gray-500">Contact</div>
            <div className="text-sm">{lead.email ?? "—"}</div>
          </div>
          
          <div>
            <div className="text-xs uppercase text-gray-500">Total Value</div>
            <div className="text-lg font-semibold">
              {lead.country === "Nepal" 
                ? formatCurrency(lead.totalAmount, "NPR")
                : formatCurrency(lead.totalAmount, "INR")
              }
            </div>
            <div className="text-sm text-gray-500">{lead.totalDeals} deal{lead.totalDeals !== 1 ? 's' : ''}</div>
          </div>
          
          <div>
            <div className="text-xs uppercase text-gray-500">Associated Deals</div>
            <div className="space-y-2 mt-2">
              {associatedDeals.map((deal) => (
                <div key={deal.id} className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{deal.name}</div>
                    <Badge color={
                      deal.stage === "Won" ? "green" : 
                      deal.stage === "Lost" ? "red" : 
                      deal.stage === "Proposal" || deal.stage === "Negotiation" ? "yellow" : "blue"
                    }>
                      {deal.stage}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{deal.accountType}</div>
                  <div className="text-sm font-semibold mt-1">
                    {lead.country === "Nepal" 
                      ? formatCurrency(deal.amount, "NPR")
                      : formatCurrency(deal.amount, "INR")
                    }/month
                  </div>
                  {deal.remarks && (
                    <div className="text-xs text-gray-600 mt-1">{deal.remarks}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase text-gray-500">Notes</div>
            <div className="text-sm whitespace-pre-wrap">{lead.remarks ?? "—"}</div>
          </div>
        </div>
      </aside>
    </div>
  );
}


