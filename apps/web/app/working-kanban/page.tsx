'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';

// Data matching your Figma design exactly
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

export default function WorkingKanban() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Working Kanban - Hybrid Component</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Hybrid KanbanColumn with Vertical Text & Upward Chevron</h2>
          
        {/* Hybrid KanbanColumn - Best of both components */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Hybrid KanbanColumn (Best of Both Worlds)</h3>
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '672px' }}>
            <KanbanColumn
              title="KT Pending"
              count={3}
              deals={figmaDeals}
              defaultExpanded={true}
            />
            
            <KanbanColumn
              title="Qualified"
              count={2}
              deals={figmaDeals.slice(0, 2)}
              defaultExpanded={false}
            />
            
            <KanbanColumn
              title="In Progress"
              count={1}
              deals={figmaDeals.slice(0, 1)}
              defaultExpanded={false}
            />
          </div>
        </div>

        {/* Additional Hybrid Columns */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Additional Hybrid Columns</h3>
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '400px' }}>
            <KanbanColumn
              title="Closed Won"
              count={5}
              deals={figmaDeals}
              defaultExpanded={false}
            />
            
            <KanbanColumn
              title="Lost"
              count={2}
              deals={figmaDeals.slice(0, 2)}
              defaultExpanded={false}
            />
            
            <KanbanColumn
              title="On Hold"
              count={1}
              deals={figmaDeals.slice(0, 1)}
              defaultExpanded={false}
            />
          </div>
        </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Hybrid Component Features:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ <strong>Vertical Text:</strong> Always reads bottom-to-top (180° rotation)</li>
                <li>✅ <strong>Upward Chevron:</strong> Points up when collapsed, down when expanded</li>
                <li>✅ <strong>Width Animation:</strong> Smooth 80px ↔ 293px transition</li>
                <li>✅ <strong>Color Library:</strong> Professional color system integration</li>
                <li>✅ <strong>Fade Animations:</strong> Smooth card transitions</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Technical Implementation:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Text Rotation:</strong> Fixed 180° rotation for bottom-to-top reading</li>
                <li>• <strong>Chevron Container:</strong> 90° rotation to make chevron point upward</li>
                <li>• <strong>Layout:</strong> Always vertical column layout for header pill</li>
                <li>• <strong>Animations:</strong> Maintained all original smooth transitions</li>
                <li>• <strong>Accessibility:</strong> Keyboard navigation and ARIA labels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
