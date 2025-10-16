'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { VerticalAccordion } from '../components/ui/VerticalAccordion';
import { DealData, DealCard } from '../components/ui/DealCard';

// Sample data
const sampleDeals: DealData[] = [
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
  }
];

export default function KanbanComparisonNew() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Kanban Component Comparison</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Old KanbanColumn */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Previous KanbanColumn</h2>
            
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '400px' }}>
              <KanbanColumn
                title="KT Pending"
                count={2}
                deals={sampleDeals}
                defaultExpanded={true}
              />
              
              <KanbanColumn
                title="Qualified"
                count={1}
                deals={sampleDeals.slice(0, 1)}
                defaultExpanded={false}
              />
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Previous Features:</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Horizontal text orientation</li>
                <li>• Width animation (80px ↔ 293px)</li>
                <li>• Cards fade in/out</li>
                <li>• Chevron rotates 180°</li>
                <li>• Traditional Kanban layout</li>
              </ul>
            </div>
          </div>

          {/* New VerticalAccordion */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">New VerticalAccordion</h2>
            
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '400px' }}>
              <VerticalAccordion
                title="KT Pending"
                count={2}
                defaultExpanded={true}
              >
                <div className="flex flex-col gap-2 ml-4">
                  {sampleDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </VerticalAccordion>
              
              <VerticalAccordion
                title="Qualified"
                count={1}
                defaultExpanded={false}
              >
                <div className="flex flex-col gap-2 ml-4">
                  {sampleDeals.slice(0, 1).map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </VerticalAccordion>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">New Features:</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Vertical text orientation (Figma design)</li>
                <li>• Chevron facing upward</li>
                <li>• Content slides in from left</li>
                <li>• Exact Figma dimensions (24px × 97px)</li>
                <li>• Modern accordion interaction</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Key Differences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">❌ Old Component</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>• Horizontal text layout</li>
                <li>• Width-based expansion</li>
                <li>• Traditional Kanban style</li>
                <li>• Chevron rotates 180°</li>
                <li>• Cards fade in/out</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">🔄 Transition</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Text orientation change</li>
                <li>• Layout direction change</li>
                <li>• Animation style change</li>
                <li>• Interaction pattern change</li>
                <li>• Design system update</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">✅ New Component</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Vertical text layout</li>
                <li>• Content-based expansion</li>
                <li>• Figma-accurate design</li>
                <li>• Chevron facing up</li>
                <li>• Content slides in</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
