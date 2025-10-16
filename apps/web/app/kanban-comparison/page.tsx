'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';

// Data matching your Figma design
const figmaDeals: DealData[] = [
  {
    id: '1',
    name: 'Deal Name',
    company: 'Test Company',
    amount: 'INR 22,000',
    owner: 'Kshitiz Regmi',
    closeDate: 'in 2 weeks'
  },
  {
    id: '2',
    name: 'Deal Name',
    company: 'Test Company',
    amount: 'INR 22,000',
    owner: 'Kshitiz Regmi',
    closeDate: 'in 2 weeks'
  },
  {
    id: '3',
    name: 'Deal Name',
    company: 'Test Company',
    amount: 'INR 22,000',
    owner: 'Kshitiz Regmi',
    closeDate: 'in 2 weeks'
  }
];

export default function KanbanComparison() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Kanban Component - Figma Match</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Expanded State */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Expanded State (Default)</h2>
          <div className="w-80">
            <KanbanColumn
              title="KT Pending"
              count={3}
              deals={figmaDeals}
              defaultExpanded={true}
            />
          </div>
        </div>

        {/* Collapsed State */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Collapsed State</h2>
          <div className="w-80">
            <KanbanColumn
              title="KT Pending"
              count={3}
              deals={figmaDeals}
              defaultExpanded={false}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-white rounded-lg shadow-sm max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Fixed Issues:</h2>
        <ul className="space-y-2 text-gray-600">
          <li>✅ <strong>Structure:</strong> Entire column now expands/collapses (not individual cards)</li>
          <li>✅ <strong>Layout:</strong> Header always visible, cards only show when expanded</li>
          <li>✅ <strong>Styling:</strong> Clean, minimal design matching Figma exactly</li>
          <li>✅ <strong>Animation:</strong> Smooth expand/collapse with proper timing</li>
          <li>✅ <strong>Data:</strong> Using exact data from your Figma design</li>
        </ul>
      </div>
    </div>
  );
}
