"use client";
import * as React from "react";
import { Badge } from "./Badge";
import { FancyButton, PlusIcon } from "./FancyButton";

interface Deal {
  id: string;
  name: string;
  company: string;
  amount: number;
  currency: string;
  requestedBy: string;
  requestedTime: string;
  stage: string;
  estimateCloseDate: string;
  remarks: string;
}

interface DealsTableProps {
  deals: Deal[];
  onDealSelect?: (deal: Deal) => void;
}

export function DealsTable({ deals, onDealSelect }: DealsTableProps) {
  // Ensure consistent rendering between server and client
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-96 bg-gray-50 animate-pulse rounded-lg" />;
  }

  return (
    <div className="w-full">
      {/* Horizontal Filter */}
      <div className="flex gap-3 items-start mb-4">
        {/* Switch Toggle */}
        <div className="flex flex-col gap-1.5 w-80">
          <div className="bg-[#f5f7fa] flex gap-1 p-1 rounded-[10px]">
            <button className="bg-white flex-1 flex items-center justify-center p-1 rounded-[6px] shadow-[0px_6px_10px_0px_rgba(14,18,27,0.06),0px_2px_4px_0px_rgba(14,18,27,0.03)]">
              <span className="font-medium text-sm text-[#0e121b]">All</span>
            </button>
            <div className="flex-1 flex items-center justify-center p-1 rounded-[6px]">
              <span className="font-medium text-sm text-[#99a0ae]">Today</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-1 rounded-[6px]">
              <span className="font-medium text-sm text-[#99a0ae]">This Week</span>
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex-1 flex gap-3 items-center justify-end">
          {/* Search Input */}
          <div className="flex flex-col gap-1 w-[300px]">
            <div className="flex items-center gap-1">
              <span className="font-medium text-sm text-[#0e121b]">Search</span>
              <span className="font-medium text-sm text-[#335cff]">*</span>
              <span className="font-normal text-sm text-[#525866]">(Optional)</span>
              <div className="w-5 h-5">
                <svg className="w-5 h-5 text-[#525866]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="bg-white border border-[#e1e4ea] rounded-lg">
              <div className="flex items-center gap-2 px-2.5 py-2">
                <div className="w-5 h-5">
                  <svg className="w-5 h-5 text-[#99a0ae]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="flex-1 font-normal text-sm text-[#99a0ae]">Search...</span>
                <div className="bg-white border border-[#e1e4ea] rounded px-1.5 py-0.5">
                  <span className="font-medium text-xs text-[#99a0ae] uppercase tracking-wider">⌘1</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-1">
              <div className="w-4 h-4">
                <svg className="w-4 h-4 text-[#525866]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-normal text-xs text-[#525866]">This is a hint text to help user.</span>
            </div>
          </div>

          {/* Filter Button */}
          <div className="bg-white border border-[#e1e4ea] rounded-lg">
            <div className="flex items-center gap-1 p-2">
              <div className="w-5 h-5">
                <svg className="w-5 h-5 text-[#525866]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <span className="font-medium text-sm text-[#525866]">Filter</span>
            </div>
          </div>

          {/* All Deals Button */}
          <div className="bg-white border border-[#e1e4ea] rounded-lg">
            <div className="flex items-center gap-1 p-2">
              <div className="w-5 h-5">
                <svg className="w-5 h-5 text-[#525866]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <span className="font-medium text-sm text-[#525866]">All Deals</span>
            </div>
          </div>

          {/* Add New Deal Button - Exact Layer Structure */}
          <FancyButton 
            icon={<PlusIcon />}
            className="w-full h-11"
          >
            Add a New Deal
          </FancyButton>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="bg-[#f5f7fa] flex items-start rounded-lg overflow-hidden">
          <div className="flex items-start px-3 py-2 w-40">
            <span className="font-normal text-sm text-[#525866]">$ Deal Name</span>
          </div>
          <div className="flex items-start px-3 py-2 w-60">
            <span className="font-normal text-sm text-[#525866]">Deal Amount</span>
          </div>
          <div className="flex items-start px-3 py-2 w-50">
            <span className="font-normal text-sm text-[#525866]">Requested By</span>
          </div>
          <div className="flex items-start px-3 py-2 w-45">
            <span className="font-normal text-sm text-[#525866]">Stage</span>
          </div>
          <div className="flex items-start px-3 py-2 w-52">
            <span className="font-normal text-sm text-[#525866]">Estimate Close Date</span>
          </div>
          <div className="flex-1 flex items-start px-3 py-2">
            <span className="font-normal text-sm text-[#525866]">Remarks</span>
          </div>
        </div>

        {/* Rows */}
        {deals && deals.length > 0 ? deals.map((deal, index) => (
          <div key={deal.id} className="flex flex-col">
            {/* Main Row */}
            <div className="flex items-start rounded-xl overflow-hidden">
              {/* Deal Name - 160px */}
              <div className="bg-white flex items-center pl-3 pr-5 py-3 w-40 h-16">
                <div className="flex flex-col gap-0.5 w-full">
                  <span className="font-medium text-sm text-[#0e121b] truncate">{deal.name}</span>
                  <span className="font-normal text-xs text-[#525866] truncate">{deal.company}</span>
                </div>
              </div>

              {/* Deal Amount - 240px */}
              <div className="bg-white flex items-center pl-3 pr-5 py-3 w-60 h-16">
                <div className="flex flex-col gap-0.5 w-full">
                  <span className="font-medium text-sm text-[#0e121b] truncate">{deal.currency} {deal.amount.toLocaleString()}</span>
                  <span className="font-normal text-xs text-[#525866] truncate">INR {Math.round(deal.amount * 0.6).toLocaleString()}</span>
                </div>
              </div>

              {/* Requested By - 200px */}
              <div className="bg-white flex items-center pl-3 pr-5 py-3 w-50 h-16">
                <div className="flex flex-col gap-0.5 w-full">
                  <span className="font-medium text-sm text-[#0e121b] truncate">{deal.requestedBy}</span>
                  <span className="font-normal text-xs text-[#525866] truncate">{deal.requestedTime}</span>
                </div>
              </div>

              {/* Stage - 180px */}
              <div className="bg-white flex items-center p-3 w-45 h-16">
                <div className="bg-[#f2f5f8] inline-flex items-center justify-center px-2 py-0.5 rounded-full">
                  <span className="font-medium text-xs text-[#717784]">{deal.stage}</span>
                </div>
              </div>

              {/* Estimate Close Date - 208px */}
              <div className="bg-white flex items-center pl-3 pr-5 py-3 w-52 h-16">
                <div className="flex flex-col gap-0.5 w-full">
                  <span className="font-medium text-sm text-[#0e121b] truncate">{deal.estimateCloseDate}</span>
                </div>
              </div>

              {/* Remarks - flex-1 */}
              <div className="bg-white flex items-center pl-3 pr-5 py-3 flex-1 h-16">
                <div className="flex flex-col gap-0.5 w-full">
                  <span className="font-normal text-sm text-[#0e121b] truncate">{deal.remarks}</span>
                </div>
              </div>
            </div>
            
            {/* Divider */}
            {index < deals.length - 1 && (
              <div className="bg-[#e1e4ea] h-px w-full" />
            )}
          </div>
        )) : (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <span>No deals found</span>
          </div>
        )}
      </div>
    </div>
  );
}
