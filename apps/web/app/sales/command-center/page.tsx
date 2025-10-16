"use client";
import { KPI } from "@/app/components/ui/KPI";
import { useFirebaseLeads } from "@/app/context/FirebaseLeadsContext";
import { useMemo } from "react";

export default function CommandCenter() {
  const { deals } = useFirebaseLeads();

  // Calculate BD-specific metrics
  const metrics = useMemo(() => {
    const totalDeals = deals.length;
    const wonDeals = deals.filter(d => d.stage === "Won").length;
    const activeDeals = deals.filter(d => !["Won", "Lost"].includes(d.stage)).length;
    const totalValue = deals.reduce((sum, d) => sum + d.amount, 0);
    const avgDealSize = totalDeals > 0 ? totalValue / totalDeals : 0;
    const winRate = totalDeals > 0 ? (wonDeals / totalDeals) * 100 : 0;
    const highPriorityDeals = deals.filter(d => d.priority === "High").length;
    const avgLeadScore = totalDeals > 0 ? deals.reduce((sum, d) => sum + d.leadScore, 0) / totalDeals : 0;

    return {
      totalDeals,
      wonDeals,
      activeDeals,
      totalValue,
      avgDealSize,
      winRate,
      highPriorityDeals,
      avgLeadScore
    };
  }, [deals]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sales – Command Center</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>You have {metrics.highPriorityDeals} high-priority deals and {metrics.activeDeals} active deals in your pipeline</span>
            </div>
          </div>
        </div>
      </div>

      {/* BD Metrics Dashboard */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPI 
            label="Total Pipeline Value" 
            value={`NR ${metrics.totalValue.toLocaleString()}`}
            trend={`${metrics.activeDeals} active deals`}
          />
          <KPI 
            label="Win Rate" 
            value={`${metrics.winRate.toFixed(1)}%`}
            trend={`${metrics.wonDeals} won out of ${metrics.totalDeals}`}
          />
          <KPI 
            label="Average Deal Size" 
            value={`NR ${metrics.avgDealSize.toLocaleString()}`}
            trend="Monthly retainer"
          />
          <KPI 
            label="Average Lead Score" 
            value={metrics.avgLeadScore.toFixed(0)}
            trend="Out of 100"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Command Center Dashboard</h2>
          <p className="text-gray-600">This is the command center page. More content will be added here.</p>
        </div>
      </div>
    </div>
  );
}