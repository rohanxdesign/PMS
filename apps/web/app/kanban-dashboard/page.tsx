'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';

// Sample data for a realistic dashboard
const ktPendingDeals: DealData[] = [
  { id: '1', name: 'Enterprise Software Deal', company: 'TechCorp Inc.', amount: 'INR 2,50,000', owner: 'Sarah Johnson', closeDate: 'in 2 weeks' },
  { id: '2', name: 'Marketing Automation', company: 'GrowthCo', amount: 'INR 1,80,000', owner: 'Mike Chen', closeDate: 'in 1 week' },
  { id: '3', name: 'Cloud Migration', company: 'StartupXYZ', amount: 'INR 3,20,000', owner: 'Emily Davis', closeDate: 'in 3 weeks' }
];

const qualifiedDeals: DealData[] = [
  { id: '4', name: 'Data Analytics Platform', company: 'DataCorp', amount: 'INR 4,50,000', owner: 'Alex Rodriguez', closeDate: 'in 4 weeks' },
  { id: '5', name: 'Mobile App Development', company: 'AppStudio', amount: 'INR 1,20,000', owner: 'Lisa Wang', closeDate: 'in 1 month' }
];

const inProgressDeals: DealData[] = [
  { id: '6', name: 'API Integration', company: 'DevCo', amount: 'INR 50,000', owner: 'John Doe', closeDate: 'in 3 days' }
];

const closedWonDeals: DealData[] = [
  { id: '7', name: 'Website Redesign', company: 'DesignCo', amount: 'INR 75,000', owner: 'Jane Smith', closeDate: 'completed' },
  { id: '8', name: 'E-commerce Platform', company: 'ShopCorp', amount: 'INR 1,50,000', owner: 'Bob Wilson', closeDate: 'completed' }
];

export default function KanbanDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead Management Dashboard</h1>
        <p className="text-gray-600 mb-8">Interactive Kanban Board - Click chevrons to expand/collapse columns</p>
        
        {/* Horizontal Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
          <KanbanColumn
            title="KT Pending"
            count={3}
            deals={ktPendingDeals}
            defaultExpanded={true}
          />
          
          <KanbanColumn
            title="Qualified"
            count={2}
            deals={qualifiedDeals}
            defaultExpanded={false}
          />
          
          <KanbanColumn
            title="In Progress"
            count={1}
            deals={inProgressDeals}
            defaultExpanded={false}
          />
          
          <KanbanColumn
            title="Closed Won"
            count={2}
            deals={closedWonDeals}
            defaultExpanded={false}
          />
        </div>
        
        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Deals</h3>
            <p className="text-2xl font-bold text-gray-900">8</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
            <p className="text-2xl font-bold text-gray-900">INR 10.5M</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Active Deals</h3>
            <p className="text-2xl font-bold text-gray-900">6</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Win Rate</h3>
            <p className="text-2xl font-bold text-gray-900">25%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
