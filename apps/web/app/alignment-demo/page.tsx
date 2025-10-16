'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';

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

export default function AlignmentDemo() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Pill Alignment Demo</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Fixed Pill Alignment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Collapsed State */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Collapsed State</h3>
              <div className="flex justify-center">
                <KanbanColumn
                  title="KT Pending"
                  count={2}
                  deals={sampleDeals}
                  defaultExpanded={false}
                />
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm">
                  ✅ Pill aligned to start (left edge) of column<br/>
                  ✅ Rotates from left edge as origin<br/>
                  ✅ Consistent with Kanban board alignment<br/>
                  ✅ Professional visual hierarchy
                </p>
              </div>
            </div>

            {/* Expanded State */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Expanded State</h3>
              <div className="flex justify-center">
                <KanbanColumn
                  title="KT Pending"
                  count={2}
                  deals={sampleDeals}
                  defaultExpanded={true}
                />
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  ✅ Pill remains aligned to start<br/>
                  ✅ Text content starts from left edge<br/>
                  ✅ Cards align with pill position<br/>
                  ✅ Consistent visual flow
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Alignment Fixes Applied:</h3>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>🔧 <strong>Container Alignment:</strong> Added <code>items-start</code> to column container</li>
              <li>🔧 <strong>Pill Justification:</strong> Changed from <code>justify-center</code> to <code>justify-start</code></li>
              <li>🔧 <strong>Rotation Origin:</strong> Changed from <code>center center</code> to <code>left center</code></li>
              <li>🔧 <strong>Visual Consistency:</strong> Pill now starts from the left edge of the Kanban board</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Technical Changes:</h3>
            <div className="text-yellow-800 text-sm font-mono bg-yellow-100 p-2 rounded">
              <code>
                // Container alignment<br/>
                className="flex flex-col gap-[9px] h-full items-start"<br/><br/>
                // Pill alignment<br/>
                className="flex items-center justify-start"<br/><br/>
                // Rotation origin<br/>
                transformOrigin: 'left center'
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
