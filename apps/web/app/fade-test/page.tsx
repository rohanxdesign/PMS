'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';

// Sample data
const sampleDeals: DealData[] = [
  {
    id: '1',
    name: 'Test Deal 1',
    company: 'Test Company',
    amount: 'INR 22,000',
    owner: 'Kshitiz Regmi',
    closeDate: 'in 2 weeks'
  },
  {
    id: '2',
    name: 'Test Deal 2',
    company: 'Test Company',
    amount: 'INR 22,000',
    owner: 'Kshitiz Regmi',
    closeDate: 'in 2 weeks'
  }
];

export default function FadeTest() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Fade Animation Test</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Click the chevron to test fade animation</h2>
          
          <div className="flex gap-4 justify-center">
            <KanbanColumn
              title="KT Pending"
              count={2}
              deals={sampleDeals}
              defaultExpanded={false}
            />
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Expected Behavior:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>✅ Click chevron to expand - cards should fade in smoothly</li>
              <li>✅ Click chevron to collapse - cards should fade out smoothly</li>
              <li>✅ Pill should stay inside the div block (no rotation)</li>
              <li>✅ Width should animate from 80px to 293px</li>
              <li>✅ Chevron should rotate 180 degrees</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
