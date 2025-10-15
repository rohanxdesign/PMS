"use client";
import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { useLeads } from '@/app/context/LeadsContext';

interface Lead {
  id: string;
  name: string;
  company: string;
  country: "India" | "Nepal";
  stage: string;
  owner: string;
  totalAmount: number;
  totalDeals: number;
  remarks?: string;
}

interface KanbanBoardProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export function KanbanBoard({ leads, onLeadClick }: KanbanBoardProps) {
  const { updateLead } = useLeads();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  // Group leads by stage
  const groupedLeads = leads.reduce((acc, lead) => {
    if (!acc[lead.stage]) {
      acc[lead.stage] = [];
    }
    acc[lead.stage].push(lead);
    return acc;
  }, {} as Record<string, Lead[]>);

  // Define column configurations - matching the exact colors from Figma design
  const columns = [
    {
      id: "qualified",
      title: "Sales Qualified",
      stage: "Qualified", 
      bgColor: "#fcf7f5",
      headerBg: "#f1d7c8",
      headerText: "#663d21",
      borderColor: "rgba(241,215,200,0.64)",
      leads: groupedLeads["Qualified"] || []
    },
    {
      id: "negotiation",
      title: "Negotiation",
      stage: "Negotiation",
      bgColor: "#fcfaf2",
      headerBg: "#f1dfb9",
      headerText: "#544a2f",
      borderColor: "rgba(241,223,185,0.64)",
      leads: groupedLeads["Negotiation"] || []
    },
    {
      id: "proposal",
      title: "In Progress",
      stage: "Proposal",
      bgColor: "#fef3f2",
      headerBg: "#fecdca",
      headerText: "#912018",
      borderColor: "rgba(254,205,202,0.64)",
      leads: groupedLeads["Proposal"] || []
    },
    {
      id: "contacted",
      title: "KT Pending",
      stage: "Contacted",
      bgColor: "#f5f9fc",
      headerBg: "#d0dff0",
      headerText: "#274a72",
      borderColor: "rgba(208,223,240,0.64)",
      leads: groupedLeads["Contacted"] || []
    }
  ];

  // Drag handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    const lead = leads.find(l => l.id === active.id);
    setDraggedLead(lead || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || !active) return;

    const leadId = active.id as string;
    const columnId = over.id as string;
    
    // Find the column to get the stage
    const column = columns.find(c => c.id === columnId);
    if (!column) return;
    
    // Find the lead and update its stage
    const lead = leads.find(l => l.id === leadId);
    if (lead && lead.stage !== column.stage) {
      updateLead(leadId, { stage: column.stage as any });
    }

    setActiveId(null);
    setDraggedLead(null);
  };

  // Calculate totals for side labels
  const newLeads = groupedLeads["New"]?.length || 0;
  const wonDeals = groupedLeads["Won"]?.length || 0;
  const lostDeals = groupedLeads["Lost"]?.length || 0;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-5 min-h-screen bg-gray-50 px-10 py-0">
        {/* Left Sidebar - New Assigned Leads */}
        <div className="bg-[#fdf8f9] rounded-xl p-3 flex flex-col gap-3 items-center justify-center">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <div className="flex items-center justify-center">
            <div className="transform -rotate-90">
              <div className="bg-[#f4d6df] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#68354e] whitespace-nowrap">
                New Assigned Leads ({newLeads})
              </div>
            </div>
          </div>
        </div>

        {/* Main Kanban Board */}
        <div className="flex-1 flex gap-2 overflow-x-auto">
          {columns.map((column) => (
            <div key={column.stage} className="flex-1 min-w-0">
              <KanbanColumn
                id={column.id}
                title={column.title}
                leads={column.leads}
                bgColor={column.bgColor}
                headerBg={column.headerBg}
                headerText={column.headerText}
                borderColor={column.borderColor}
                onLeadClick={onLeadClick}
              />
            </div>
          ))}
        </div>

        {/* Right Sidebar - Contract Won */}
        <div className="bg-[#d1fadf] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <div className="flex items-center justify-center">
            <div className="transform -rotate-90">
              <div className="bg-[#6ce9a6] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#039855] whitespace-nowrap">
                Contract Won ({wonDeals})
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Contract Lost */}
        <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <div className="flex items-center justify-center">
            <div className="transform -rotate-90">
              <div className="bg-[#d0d5dd] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#475467] whitespace-nowrap">
                Contract Lost ({lostDeals})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeId && draggedLead ? (
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.2 }}
            className="opacity-90"
          >
            <KanbanCard
              lead={draggedLead}
              onClick={() => {}}
            />
          </motion.div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
