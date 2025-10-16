'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';

// Enhanced data with more realistic content
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

export default function EnhancedDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
              <p className="text-gray-600 text-sm">Interactive Kanban Board</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Pipeline</p>
                <p className="text-xl font-bold text-gray-900">INR 10.5M</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">LR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Deals</p>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-3xl font-bold text-gray-900">6</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Win Rate</p>
                <p className="text-3xl font-bold text-gray-900">25%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                <p className="text-3xl font-bold text-gray-900">INR 1.3M</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Sales Pipeline</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Click chevrons to expand/collapse columns</span>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '672px' }}>
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
        </div>
      </div>
    </div>
  );
}
