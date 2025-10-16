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

export default function FigmaExact() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Exact Figma Specifications</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Figma Specs Applied:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Specifications */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Main Div Block</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Width: 293px (expanded) / 80px (collapsed)</li>
                  <li>• Height: 672px</li>
                  <li>• Padding: 12px</li>
                  <li>• Gap: 8px</li>
                  <li>• Border-radius: 12px</li>
                  <li>• Background: #F5F9FC</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">KT Pending Pill</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Padding: 3px 6px</li>
                  <li>• Border-radius: 4px</li>
                  <li>• Background: #D0DFF0</li>
                  <li>• Gap: 8px</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Typography</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Font: Instrument Sans</li>
                  <li>• Size: 12px</li>
                  <li>• Weight: 600 (Semibold)</li>
                  <li>• Line-height: 18px (150%)</li>
                  <li>• Color: #274A72</li>
                </ul>
              </div>
            </div>
            
            {/* Live Component */}
            <div className="flex justify-center">
              <KanbanColumn
                title="KT Pending"
                count={3}
                deals={figmaDeals}
                defaultExpanded={true}
              />
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Reference:</h3>
            <p className="text-blue-800 text-sm">
              Based on your <a href="https://www.figma.com/design/3v0Rj8afL2isK5gjNdiXxO/Lead-Management?node-id=338-14765&m=dev" target="_blank" rel="noopener noreferrer" className="underline">Figma design</a> specifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
