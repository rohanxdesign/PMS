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

export default function FigmaTest() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Figma Design Test</h1>
      
      <div className="w-80">
        <KanbanColumn
          title="KT Pending"
          count={3}
          deals={figmaDeals}
          defaultExpanded={true}
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Expected Behavior:</h2>
        <ul className="text-gray-600 space-y-1">
          <li>• Column should be expanded by default showing all 3 cards</li>
          <li>• Click the chevron to collapse the entire column</li>
          <li>• When collapsed, only the header should be visible</li>
          <li>• Smooth animation when expanding/collapsing</li>
        </ul>
      </div>
    </div>
  );
}
