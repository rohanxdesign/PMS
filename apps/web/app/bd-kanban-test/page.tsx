"use client";

import { KanbanBoard } from "@/app/components/ui/KanbanBoard";
import { useLeads } from "@/app/context/LeadsContext";

export default function BDKanbanTest() {
  const { leads } = useLeads();

  const handleLeadClick = (lead: any) => {
    console.log('Lead clicked:', lead);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            BD Kanban Board Test
          </h1>
          <p className="text-gray-600">
            Testing the new expandable KanbanColumn component with BD leads data
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <KanbanBoard 
            leads={leads} 
            onLeadClick={handleLeadClick}
          />
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Features Tested:</h3>
          <ul className="text-blue-800 space-y-1">
            <li>✅ Expandable/collapsible columns</li>
            <li>✅ Vertical text orientation when collapsed</li>
            <li>✅ Upward chevron when collapsed</li>
            <li>✅ Drag and drop functionality</li>
            <li>✅ Custom BD board colors</li>
            <li>✅ Lead cards with proper styling</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
