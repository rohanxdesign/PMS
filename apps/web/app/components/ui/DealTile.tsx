"use client";
import { Badge } from "./Badge";
import { formatCurrency } from "@/app/lib/fx";

interface DealTileProps {
  deal: {
    id: string;
    name: string;
    accountType: string;
    stage: string;
    amount: number;
    remarks?: string;
  };
  leadCountry: "India" | "Nepal";
  onClick: () => void;
}

export function DealTile({ deal, leadCountry, onClick }: DealTileProps) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Won": return "green";
      case "Lost": return "red";
      case "Proposal":
      case "Negotiation": return "yellow";
      case "New": return "gray";
      default: return "blue";
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {deal.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{deal.accountType}</p>
        </div>
        <Badge color={getStageColor(deal.stage)}>{deal.stage}</Badge>
      </div>

      {/* Amount */}
      <div className="mb-3">
        <div className="text-lg font-bold text-gray-900">
          {leadCountry === "Nepal" 
            ? formatCurrency(deal.amount, "NPR")
            : formatCurrency(deal.amount, "INR")
          }
        </div>
        <div className="text-xs text-gray-500">per month</div>
      </div>

      {/* Remarks */}
      {deal.remarks && (
        <div className="text-sm text-gray-600 line-clamp-2">
          {deal.remarks}
        </div>
      )}

      {/* Hover indicator */}
      <div className="mt-3 flex items-center text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Click to edit deal</span>
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
