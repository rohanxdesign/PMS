'use client';

import React from 'react';
import { KanbanColumn } from '../../components/ui/KanbanColumn';
import { DealData } from '../../components/ui/DealCard';

// Sample data for demonstration
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
  },
  {
    id: '3',
    name: 'Cloud Migration',
    company: 'StartupXYZ',
    amount: 'INR 3,20,000',
    owner: 'Emily Davis',
    closeDate: 'in 3 weeks'
  }
];

const qualifiedDeals: DealData[] = [
  {
    id: '4',
    name: 'Data Analytics Platform',
    company: 'DataCorp',
    amount: 'INR 4,50,000',
    owner: 'Alex Rodriguez',
    closeDate: 'in 4 weeks'
  }
];

export default function KanbanDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Interactive Kanban Component Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KanbanColumn
            title="KT Pending"
            count={3}
            deals={sampleDeals}
            defaultExpanded={false}
          />
          
          <KanbanColumn
            title="Qualified"
            count={1}
            deals={qualifiedDeals}
            defaultExpanded={true}
          />
          
          <KanbanColumn
            title="In Progress"
            count={0}
            deals={[]}
            defaultExpanded={false}
          />
        </div>
        
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Features Demonstrated
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ Smooth expand/collapse animations with Framer Motion</li>
            <li>✅ Pixel-perfect design matching your Figma file</li>
            <li>✅ Full accessibility support (keyboard navigation, ARIA labels)</li>
            <li>✅ Responsive design with CSS variables for design tokens</li>
            <li>✅ TypeScript support with proper type definitions</li>
            <li>✅ Storybook integration for component documentation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
