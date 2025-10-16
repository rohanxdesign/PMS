'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';

// Simple test data
const testDeals: DealData[] = [
  {
    id: '1',
    name: 'Test Deal',
    company: 'Test Company',
    amount: 'INR 1,00,000',
    owner: 'Test Owner',
    closeDate: 'in 1 week'
  }
];

export default function TestKanban() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Kanban Test</h1>
      
      <div className="w-80">
        <KanbanColumn
          title="Test Column"
          count={1}
          deals={testDeals}
          defaultExpanded={true}
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">CSS Variables Test:</h2>
        <div className="space-y-2">
          <div className="bg-kanban-bg p-4 rounded">Kanban Background</div>
          <div className="bg-kanban-header-bg p-4 rounded">Header Background</div>
          <div className="text-kanban-header-text p-4 rounded bg-white">Header Text</div>
          <div className="text-text-primary p-4 rounded bg-white">Primary Text</div>
          <div className="text-text-secondary p-4 rounded bg-white">Secondary Text</div>
        </div>
      </div>
    </div>
  );
}
