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

export default function RotationComparison() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Rotation Comparison</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-6">Multiple Columns with Rotation</h2>
          
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '672px' }}>
            {/* Collapsed Column */}
            <KanbanColumn
              title="KT Pending"
              count={2}
              deals={sampleDeals}
              defaultExpanded={false}
            />
            
            {/* Expanded Column */}
            <KanbanColumn
              title="Qualified"
              count={1}
              deals={sampleDeals.slice(0, 1)}
              defaultExpanded={true}
            />
            
            {/* Another Collapsed Column */}
            <KanbanColumn
              title="In Progress"
              count={3}
              deals={sampleDeals}
              defaultExpanded={false}
            />
            
            {/* Another Expanded Column */}
            <KanbanColumn
              title="Closed Won"
              count={5}
              deals={sampleDeals}
              defaultExpanded={true}
            />
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Interactive Features:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>🔄 <strong>Click any header</strong> to toggle expansion/rotation</li>
              <li>📱 <strong>Collapsed columns</strong> show rotated headers (90°)</li>
              <li>📋 <strong>Expanded columns</strong> show normal headers (0°)</li>
              <li>⚡ <strong>Smooth animations</strong> for both width and rotation</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Before vs After</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-700">❌ Before (No Rotation)</h3>
              <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <ul className="text-red-800 text-sm space-y-2">
                  <li>• Header text was cut off in collapsed state</li>
                  <li>• Poor space utilization</li>
                  <li>• Inconsistent visual hierarchy</li>
                  <li>• Header didn't fit container width</li>
                </ul>
              </div>
            </div>

            {/* After */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-700">✅ After (With Rotation)</h3>
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <ul className="text-green-800 text-sm space-y-2">
                  <li>• Header rotates 90° to fit container width</li>
                  <li>• Optimal space utilization</li>
                  <li>• Consistent visual hierarchy</li>
                  <li>• Professional attention to detail</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
