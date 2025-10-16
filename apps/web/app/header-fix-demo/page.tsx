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

export default function HeaderFixDemo() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Header Fix Demo</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Fixed Header Issues</h2>
          
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
                  ✅ "KT Pending (2)" text is always visible<br/>
                  ✅ Header pill hugs the content (not full width)<br/>
                  ✅ Chevron button is inside the pill
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
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm">
                  ✅ "KT Pending (2)" text is visible<br/>
                  ✅ Header pill still hugs the content<br/>
                  ✅ Chevron rotates to indicate expanded state<br/>
                  ✅ Cards are visible below
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Issues Fixed:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>🔧 <strong>Missing text in collapsed state:</strong> Text now always visible</li>
              <li>🔧 <strong>Header filling container:</strong> Added <code>width: 'fit-content'</code> and <code>alignSelf: 'flex-start'</code></li>
              <li>🔧 <strong>Button positioning:</strong> Chevron button is now inside the header pill</li>
              <li>🔧 <strong>Attention to detail:</strong> Header now properly hugs the content like in Figma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
