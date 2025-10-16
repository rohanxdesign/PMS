'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';
import { colors, typography, spacing, borderRadius, shadows } from '../lib/colors';

// Sample data
const sampleDeals: DealData[] = [
  {
    id: '1',
    name: 'Enterprise Software Deal',
    company: 'TechCorp Inc.',
    amount: 'INR 2,50,000',
    owner: 'Sarah Johnson',
    closeDate: 'in 2 weeks'
  },
  {
    id: '2',
    name: 'Marketing Automation',
    company: 'GrowthCo',
    amount: 'INR 1,80,000',
    owner: 'Mike Chen',
    closeDate: 'in 1 week'
  }
];

export default function ColorLibraryDemo() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Color Library Integration</h1>
        
        {/* Color Palette Display */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-6">Color System</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kanban Colors */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Kanban Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: colors.kanban.bg }}
                  ></div>
                  <span className="text-sm text-gray-600">Background</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: colors.kanban.headerBg }}
                  ></div>
                  <span className="text-sm text-gray-600">Header Background</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: colors.kanban.headerText }}
                  ></div>
                  <span className="text-sm text-gray-600">Header Text</span>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Text Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: colors.text.primary }}
                  ></div>
                  <span className="text-sm text-gray-600">Primary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: colors.text.secondary }}
                  ></div>
                  <span className="text-sm text-gray-600">Secondary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: colors.text.tertiary }}
                  ></div>
                  <span className="text-sm text-gray-600">Tertiary</span>
                </div>
              </div>
            </div>

            {/* Status Colors */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Status Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: colors.status.pending }}
                  ></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: colors.status.qualified }}
                  ></div>
                  <span className="text-sm text-gray-600">Qualified</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: colors.status.progress }}
                  ></div>
                  <span className="text-sm text-gray-600">In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Typography System */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-6">Typography System</h2>
          
          <div className="space-y-4">
            <div>
              <h3 
                style={{
                  fontFamily: typography.fontFamily.sans.join(', '),
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.text.primary
                }}
              >
                Heading Large - Instrument Sans Bold
              </h3>
            </div>
            <div>
              <p 
                style={{
                  fontFamily: typography.fontFamily.sans.join(', '),
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.normal,
                  color: colors.text.secondary
                }}
              >
                Body text - Instrument Sans Regular
              </p>
            </div>
            <div>
              <span 
                style={{
                  fontFamily: typography.fontFamily.sans.join(', '),
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.tertiary
                }}
              >
                Small text - Instrument Sans Semibold
              </span>
            </div>
          </div>
        </div>

        {/* Component Demo */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Component with Color Library</h2>
          
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '672px' }}>
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
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Benefits of Color Library:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>✅ Centralized color management</li>
              <li>✅ Consistent design system</li>
              <li>✅ Easy theme switching</li>
              <li>✅ Type-safe color references</li>
              <li>✅ Professional component library structure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
