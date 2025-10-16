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

export default function VerticalHeaderDemo() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Vertical Header Demo</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Header Orientation Animation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Collapsed State - Vertical */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Collapsed State (Vertical)</h3>
              <div className="flex justify-center">
                <KanbanColumn
                  title="KT Pending"
                  count={2}
                  deals={sampleDeals}
                  defaultExpanded={false}
                />
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  ✅ Header text is vertical (rotated -90°)<br/>
                  ✅ Pill layout is column direction<br/>
                  ✅ Text uses vertical writing mode<br/>
                  ✅ Fits narrow collapsed width perfectly
                </p>
              </div>
            </div>

            {/* Expanded State - Horizontal */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Expanded State (Horizontal)</h3>
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
                  ✅ Header text is horizontal (0° rotation)<br/>
                  ✅ Pill layout is row direction<br/>
                  ✅ Text uses horizontal writing mode<br/>
                  ✅ Cards are visible below
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Vertical Header Features:</h3>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>🎯 <strong>Text Rotation:</strong> -90° rotation for vertical text in collapsed state</li>
              <li>🎯 <strong>Writing Mode:</strong> Uses CSS writing-mode for proper vertical text</li>
              <li>🎯 <strong>Layout Direction:</strong> Pill changes from row to column layout</li>
              <li>🎯 <strong>Smooth Animation:</strong> All transitions are synchronized</li>
              <li>🎯 <strong>Space Efficient:</strong> Vertical text fits narrow collapsed width</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Technical Implementation:</h3>
            <div className="text-yellow-800 text-sm font-mono bg-yellow-100 p-2 rounded">
              <pre className="whitespace-pre-wrap">
{`// Pill layout animation
animate={{ 
  flexDirection: isExpanded ? 'row' : 'column',
  height: isExpanded ? 'auto' : 'fit-content'
}}

// Text rotation animation
animate={{ 
  rotate: isExpanded ? 0 : -90,
  writingMode: isExpanded ? 'horizontal-tb' : 'vertical-rl'
}}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
