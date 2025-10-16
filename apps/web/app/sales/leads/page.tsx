"use client";
import { KanbanBoard } from "@/app/components/ui/KanbanBoard";
import { LeadDrawer } from "./LeadDrawer";
import { TabToggle } from "./components/TabToggle";
import { SearchInput } from "./components/SearchInput";
import { ActionButton } from "./components/ActionButton";
import { ViewToggle } from "./components/ViewToggle";
import { DealsTable } from "./components/DealsTable";
import { AddNewDealButton } from "./components/AddNewDealButton";
import { ViewDropdown } from "./components/ViewDropdown";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchInrNprRate } from "@/app/lib/fx";
import { useMockLeads } from "@/app/context/MockLeadsContext";
import { useMockCounts } from "@/app/lib/hooks/useMockCounts";
import Link from "next/link";

export default function SalesLeads() {
  const router = useRouter();
  const { leads, deals } = useMockLeads();
  const { counts, isLoading: countsLoading, error: countsError } = useMockCounts();
  
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [fx, setFx] = useState<{ nprPerInr: number; inrPerNpr: number } | null>(null);
  const [today, setToday] = useState<string>(() => {
    return new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit' 
    });
  });
  const [activeTab, setActiveTab] = useState<'all'|'today'|'week'>('all');
  const [viewMode, setViewMode] = useState<'table'|'kanban'>('table');
  const [currentView, setCurrentView] = useState<string>('all-deals');
  
  // Filtered data
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => 
      [lead.name, lead.company, lead.email, lead.owner, lead.stage]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [leads, searchQuery]);
  
  // Initialize data
  useEffect(() => { 
    fetchInrNprRate().then(setFx);
  }, []);

  // Event handlers
  const handleLeadClick = (lead: any) => {
    router.push(`/sales/leads/edit/${lead.id}`);
  };

  const handleViewChange = (viewId: string) => {
    setCurrentView(viewId);
    // Handle different view filters here
    console.log('View changed to:', viewId);
  };

  const handleKanbanView = () => {
    setViewMode('kanban');
    setCurrentView('board');
  };

  const handleTableView = () => {
    setViewMode('table');
    setCurrentView('table');
  };

  return (
    <main className="min-h-screen p-5 space-y-4">
      {/* Header Section */}
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[1224px] mx-auto">
          <div>
            <div className="text-sm font-semibold text-gray-800">{today}</div>
            <div className="text-sm text-gray-500">
              {countsLoading ? (
                "Loading counts..."
              ) : countsError ? (
                "Error loading counts"
              ) : (
                `You have ${counts.newLeads} new leads assigned and ${counts.ktPending} KTs pending today`
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Filter Section */}
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[1224px] mx-auto">
          <div className="flex gap-[12px] items-start relative w-full">
            {/* Tab Toggle */}
            <div className="flex flex-col gap-[6px] items-start relative shrink-0 w-[320px]">
              <TabToggle activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            
            {/* Right Section */}
            <div className="flex gap-[12px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
              <div className="flex gap-[12px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
                {/* Search Input */}
                <SearchInput 
                  value={searchQuery} 
                  onChange={setSearchQuery} 
                />
                
                {/* Filter Button */}
                <ActionButton
                  icon={
                    <svg className="w-5 h-5 text-[#475467]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  }
                  label="Filter"
                />
                
                {/* All Deals Dropdown */}
                <ViewDropdown 
                  currentView={currentView}
                  onViewChange={handleViewChange}
                  onKanbanView={handleKanbanView}
                  onTableView={handleTableView}
                />
              </div>
              
              {/* Add New Deal Button */}
              <AddNewDealButton className="w-[162px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[1224px] mx-auto">
            <DealsTable 
              leads={filteredLeads} 
              fx={fx} 
              onLeadClick={handleLeadClick} 
            />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <KanbanBoard 
            leads={filteredLeads} 
            onLeadClick={handleLeadClick}
          />
        </div>
      )}
      
      <LeadDrawer lead={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
