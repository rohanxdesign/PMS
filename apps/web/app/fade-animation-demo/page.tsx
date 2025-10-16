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

export default function FadeAnimationDemo() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Fade Animation Demo</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Clean Fade In/Out Animation</h2>
          
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
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  ✅ Pill stays inside the div block<br/>
                  ✅ No rotation - clean fade animation<br/>
                  ✅ Proper alignment to start<br/>
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
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm">
                  ✅ Pill remains properly aligned<br/>
                  ✅ Smooth fade transition<br/>
                  ✅ Cards appear with animation<br/>
                  ✅ Chevron rotates smoothly
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Animation Improvements:</h3>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>🎯 <strong>No Rotation:</strong> Removed 90° rotation that caused pill to go outside div</li>
              <li>🎯 <strong>Fade Animation:</strong> Clean opacity and scale transitions</li>
              <li>🎯 <strong>Proper Alignment:</strong> Pill stays inside the div block boundaries</li>
              <li>🎯 <strong>Professional Polish:</strong> Smooth, subtle animations that don't distract</li>
              <li>🎯 <strong>Better UX:</strong> More predictable and controlled animation behavior</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Technical Implementation:</h3>
            <div className="text-yellow-800 text-sm font-mono bg-yellow-100 p-2 rounded">
              <code>
                // Pill animation<br/>
                animate={{ opacity: 1, scale: 1 }}<br/>
                transition={{ duration: 0.3, ease: "easeInOut" }}<br/><br/>
                // Chevron animation<br/>
                animate={{ rotate: isExpanded ? 180 : 0, opacity: 1 }}<br/>
                transition={{ duration: 0.3, ease: "easeInOut" }}
              </code>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">Before vs After:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-800 mb-2">❌ Before (Rotation)</h4>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Pill rotated outside div boundaries</li>
                  <li>• Complex rotation calculations</li>
                  <li>• Potential layout issues</li>
                  <li>• Less predictable behavior</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">✅ After (Fade)</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Pill stays within div boundaries</li>
                  <li>• Simple opacity/scale animations</li>
                  <li>• Clean, professional appearance</li>
                  <li>• Predictable, smooth behavior</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
