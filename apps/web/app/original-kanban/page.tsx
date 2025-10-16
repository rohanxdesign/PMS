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

export default function OriginalKanban() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Hybrid KanbanColumn - Best of Both Worlds</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Hybrid Component with Vertical Text & Upward Chevron</h2>
          
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
            
            <KanbanColumn
              title="Closed Won"
              count={5}
              deals={figmaDeals}
              defaultExpanded={false}
            />
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Hybrid Component Features:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ <strong>Vertical Text:</strong> Always reads bottom-to-top (180° rotation)</li>
                <li>✅ <strong>Upward Chevron:</strong> Points up when collapsed, down when expanded</li>
                <li>✅ <strong>Color Library:</strong> Professional color system with CSS variables</li>
                <li>✅ <strong>Exact Figma Colors:</strong> #F5F9FC, #D0DFF0, #274A72</li>
                <li>✅ <strong>Typography:</strong> Instrument Sans font integration</li>
                <li>✅ <strong>Dimensions:</strong> 293px expanded, 80px collapsed</li>
                <li>✅ <strong>Animations:</strong> Smooth width and fade transitions</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Interactive Features:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Click chevrons</strong> to expand/collapse columns</li>
                <li>• <strong>Width animation</strong> from 80px to 293px</li>
                <li>• <strong>Card fade animations</strong> with staggered timing</li>
                <li>• <strong>Vertical text</strong> always reads bottom-to-top</li>
                <li>• <strong>Keyboard accessible</strong> with Enter/Space</li>
                <li>• <strong>Professional styling</strong> with exact Figma specs</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Hybrid Component Journey:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>🎯 <strong>Started with:</strong> Original KanbanColumn with color library</li>
              <li>🎯 <strong>Added VerticalAccordion:</strong> New component with vertical text</li>
              <li>🎯 <strong>Created hybrid:</strong> Combined best features from both</li>
              <li>🎯 <strong>Vertical text:</strong> Always reads bottom-to-top (180° rotation)</li>
              <li>🎯 <strong>Upward chevron:</strong> Points up when collapsed, down when expanded</li>
              <li>🎯 <strong>Maintained:</strong> All original animations and color system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
