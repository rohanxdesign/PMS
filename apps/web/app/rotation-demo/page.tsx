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

export default function RotationDemo() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">+90° Anti-Clockwise Rotation Demo</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Header Rotation Animation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Collapsed State - Rotated */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Collapsed State (+90° Anti-Clockwise)</h3>
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
                  🔄 Header rotates +90° (anti-clockwise) to fit container width<br/>
                  ✅ "KT Pending (2)" text is still readable<br/>
                  ✅ Space-efficient collapsed state<br/>
                  ✅ Smooth rotation animation
                </p>
              </div>
            </div>

            {/* Expanded State - Normal */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Expanded State (0° Normal)</h3>
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
                  ✅ Header returns to normal orientation<br/>
                  ✅ "KT Pending (2)" text is horizontal<br/>
                  ✅ Cards are visible below<br/>
                  ✅ Full functionality available
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Rotation Benefits:</h3>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>🎯 <strong>Space Efficiency:</strong> Rotated header fits narrow collapsed width</li>
              <li>🎯 <strong>Visual Continuity:</strong> Header always visible and readable</li>
              <li>🎯 <strong>Smooth Animation:</strong> +90° anti-clockwise rotation with easing transition</li>
              <li>🎯 <strong>Better UX:</strong> Users can still see column title when collapsed</li>
              <li>🎯 <strong>Professional Polish:</strong> Attention to detail in interaction design</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Technical Implementation:</h3>
            <div className="text-yellow-800 text-sm font-mono bg-yellow-100 p-2 rounded">
              <code>
                animate={{ rotate: isExpanded ? 0 : -90 }} // +90° anti-clockwise<br/>
                transformOrigin: 'center center'<br/>
                transition: duration: 0.3, ease: "easeInOut"
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
