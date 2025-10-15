"use client";
import { DealTile } from "./DealTile";

interface Deal {
  id: string;
  name: string;
  accountType: string;
  stage: string;
  amount: number;
  remarks?: string;
}

interface DealsGridProps {
  deals: Deal[];
  leadCountry: "India" | "Nepal";
  onDealSelect: (deal: Deal) => void;
}

export function DealsGrid({ deals, leadCountry, onDealSelect }: DealsGridProps) {
  if (deals.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">📋</div>
        <p className="text-gray-500">No deals found for this lead</p>
      </div>
    );
  }

  if (deals.length === 1) {
    return (
      <div className="max-w-md mx-auto">
        <DealTile 
          deal={deals[0]} 
          leadCountry={leadCountry} 
          onClick={() => onDealSelect(deals[0])}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deals.map((deal) => (
        <DealTile
          key={deal.id}
          deal={deal}
          leadCountry={leadCountry}
          onClick={() => onDealSelect(deal)}
        />
      ))}
    </div>
  );
}
