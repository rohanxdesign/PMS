'use client';

import React from 'react';
import { SimpleKanbanColumn } from '../components/ui/SimpleKanbanColumn';
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

export default function SimpleTest() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Simple Kanban Test</h1>
      
      <div className="w-80">
        <SimpleKanbanColumn
          title="Test Column"
          count={1}
          deals={testDeals}
          defaultExpanded={false}
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
        <p className="text-gray-600">Click the chevron button to expand/collapse the column.</p>
      </div>
    </div>
  );
}
