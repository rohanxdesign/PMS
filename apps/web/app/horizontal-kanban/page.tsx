'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';

// Data for different columns
const ktPendingDeals: DealData[] = [
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

const qualifiedDeals: DealData[] = [
  {
    id: '4',
    name: 'Enterprise Deal',
    company: 'Big Corp',
    amount: 'INR 1,50,000',
    owner: 'Sarah Johnson',
    closeDate: 'in 1 month'
  },
  {
    id: '5',
    name: 'SaaS Platform',
    company: 'Tech Startup',
    amount: 'INR 75,000',
    owner: 'Mike Chen',
    closeDate: 'in 3 weeks'
  }
];

const inProgressDeals: DealData[] = [
  {
    id: '6',
    name: 'Cloud Migration',
    company: 'Enterprise Inc',
    amount: 'INR 2,00,000',
    owner: 'Emily Davis',
    closeDate: 'in 2 months'
  }
];

export default function HorizontalKanban() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Horizontal Kanban - Multiple Columns</h1>
      
      {/* Horizontal scrollable container for multiple columns */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        <KanbanColumn
          title="KT Pending"
          count={3}
          deals={ktPendingDeals}
          defaultExpanded={true}
        />
        
        <KanbanColumn
          title="Qualified"
          count={2}
          deals={qualifiedDeals}
          defaultExpanded={false}
        />
        
        <KanbanColumn
          title="In Progress"
          count={1}
          deals={inProgressDeals}
          defaultExpanded={false}
        />
        
        <KanbanColumn
          title="Closed Won"
          count={0}
          deals={[]}
          defaultExpanded={false}
        />
      </div>
      
      <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">How it works:</h2>
        <ul className="space-y-2 text-gray-600">
          <li>✅ <strong>Horizontal Expansion:</strong> Columns expand/collapse in width, not height</li>
          <li>✅ <strong>Multiple Columns:</strong> Several columns can fit side by side in the viewport</li>
          <li>✅ <strong>Space Efficient:</strong> Collapsed columns take minimal width (80px)</li>
          <li>✅ <strong>Expanded Columns:</strong> Show full content when expanded (320px)</li>
          <li>✅ <strong>Smooth Animation:</strong> Width changes smoothly with proper timing</li>
        </ul>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Try this:</h3>
          <p className="text-blue-800">
            Click the chevron buttons to expand/collapse different columns. 
            Notice how the width changes and multiple columns can coexist in the same viewport.
          </p>
        </div>
      </div>
    </div>
  );
}
