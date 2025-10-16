'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';

// Sample data
const sampleDeals: DealData[] = [
  { id: '1', name: 'Deal Name', company: 'Test Company', amount: 'INR 22,000', owner: 'Kshitiz Regmi', closeDate: 'in 2 weeks' },
  { id: '2', name: 'Deal Name', company: 'Test Company', amount: 'INR 22,000', owner: 'Kshitiz Regmi', closeDate: 'in 2 weeks' },
  { id: '3', name: 'Deal Name', company: 'Test Company', amount: 'INR 22,000', owner: 'Kshitiz Regmi', closeDate: 'in 2 weeks' }
];

export default function VisualComparison() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Visual Enhancement Comparison</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Before: Basic Styling</h2>
            <div className="bg-gray-200 p-6 rounded-lg">
              <div className="flex gap-4">
                <div className="bg-kanban-bg rounded-lg p-4 w-80">
                  <div className="flex flex-col gap-2">
                    <div className="bg-kanban-header-bg rounded px-2 py-1">
                      <span className="font-semibold text-xs text-kanban-header-text">
                        KT Pending (3)
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {sampleDeals.map((deal) => (
                        <div key={deal.id} className="bg-kanban-card-bg border border-kanban-card-border rounded p-3">
                          <h3 className="font-semibold text-sm text-text-primary mb-2">
                            {deal.name}
                          </h3>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-text-secondary">COMPANY</span>
                              <span className="text-text-tertiary">{deal.company}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">DEAL AMOUNT</span>
                              <span className="text-text-tertiary">{deal.amount}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* After */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">After: Enhanced Styling</h2>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-lg shadow-lg">
              <div className="flex gap-4">
                <KanbanColumn
                  title="KT Pending"
                  count={3}
                  deals={sampleDeals}
                  defaultExpanded={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Enhancements Added</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Visual Improvements</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Enhanced shadows and depth</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Gradient backgrounds and borders</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Hover effects and transitions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Improved color palette</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Better typography hierarchy</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Interactive Features</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Smooth horizontal expansion</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Card hover animations</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Focus states for accessibility</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Enhanced button interactions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Staggered card animations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
