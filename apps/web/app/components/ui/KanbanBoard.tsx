"use client";
import { useState, useEffect, useRef } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { useMockLeads } from '@/app/context/MockLeadsContext';

interface Lead {
  id: string;
  name: string;
  company?: string;
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
  const { updateLead } = useMockLeads();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  
  // State for tracking expanded/collapsed columns
  const [expandedColumns, setExpandedColumns] = useState<Record<string, boolean>>({
    newAssigned: true,
    qualified: true,
    negotiation: true,
    ktPending: true,
    proposal: true,
    contacted: true,
    contractWon: true,
    contractLost: false
  });
  
  // State for viewport width
  const [viewportWidth, setViewportWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate viewport width
  useEffect(() => {
    const updateViewportWidth = () => {
      if (containerRef.current) {
        setViewportWidth(containerRef.current.offsetWidth);
      }
    };

    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  // Calculate dynamic widths for columns
  const calculateDynamicWidths = () => {
    const collapsedWidth = 48; // Changed from 80px to 48px
    const minExpandedWidth = 300;
    const gapSize = 8; // 2px gap between columns
    const padding = 24; // 12px padding on each side (p-3)
    
    // Count expanded and collapsed columns
    const expandedCount = Object.values(expandedColumns).filter(Boolean).length;
    const collapsedCount = Object.values(expandedColumns).filter(v => !v).length;
    
    // Calculate available width
    const totalGaps = (expandedCount + collapsedCount - 1) * gapSize;
    const availableWidth = viewportWidth - padding - totalGaps;
    
    // Calculate width for expanded columns
    const collapsedTotalWidth = collapsedCount * collapsedWidth;
    const remainingWidth = availableWidth - collapsedTotalWidth;
    const expandedWidth = Math.max(minExpandedWidth, remainingWidth / expandedCount);
    
    return {
      expandedWidth: Math.floor(expandedWidth),
      collapsedWidth
    };
  };

  const { expandedWidth, collapsedWidth } = calculateDynamicWidths();

  // Toggle column expanded state with min 3 and max 5 expanded rules
  const toggleColumn = (columnId: string) => {
    setExpandedColumns(prev => {
      const currentExpandedCount = Object.values(prev).filter(Boolean).length;
      
      // If trying to collapse and only 3 are expanded, prevent collapse
      if (prev[columnId] && currentExpandedCount <= 3) {
        return prev;
      }
      
      // If trying to expand and already 5 are expanded, prevent expansion
      if (!prev[columnId] && currentExpandedCount >= 5) {
        return prev;
      }
      
      return {
        ...prev,
        [columnId]: !prev[columnId]
      };
    });
  };

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
      id: "ktPending",
      title: "KT Pending",
      stage: "KT Pending",
      bgColor: "#fef3f2",
      headerBg: "#fecdca",
      headerText: "#912018",
      borderColor: "rgba(254,205,202,0.64)",
      leads: groupedLeads["KT Pending"] || []
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
      title: "Contacted",
      stage: "Contacted",
      bgColor: "#f5f9fc",
      headerBg: "#d0dff0",
      headerText: "#274a72",
      borderColor: "rgba(208,223,240,0.64)",
      leads: groupedLeads["Contacted"] || []
    }
  ];

  // Define sidebar columns
  const sidebarColumns = [
    {
      id: "newAssigned",
      title: "New Assigned Leads",
      stage: "New",
      bgColor: "#fdf8f9",
      headerBg: "#f4d6df",
      headerText: "#68354e",
      borderColor: "rgba(244,214,223,0.64)",
      leads: groupedLeads["New"] || []
    },
    {
      id: "contractWon",
      title: "Contract Won",
      stage: "Won",
      bgColor: "#d1fadf",
      headerBg: "#6ce9a6",
      headerText: "#039855",
      borderColor: "rgba(108,233,166,0.64)",
      leads: groupedLeads["Won"] || []
    },
    {
      id: "contractLost",
      title: "Contract Lost",
      stage: "Lost",
      bgColor: "#f2f4f7",
      headerBg: "#d0d5dd",
      headerText: "#475467",
      borderColor: "rgba(208,213,221,0.64)",
      leads: groupedLeads["Lost"] || []
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

    // Always reset drag state at the end
    const resetDragState = () => {
      setActiveId(null);
      setDraggedLead(null);
    };

    if (!over || !active) {
      resetDragState();
      return;
    }

    const leadId = active.id as string;
    const columnId = over.id as string;

    // Find the column to get the stage (check both main columns and sidebar columns)
    const column = [...columns, ...sidebarColumns].find(c => c.id === columnId);
    if (!column) {
      resetDragState();
      return;
    }

    // Find the lead and update its stage
    const lead = leads.find(l => l.id === leadId);
    if (lead && lead.stage !== column.stage) {
      updateLead(leadId, { stage: column.stage as any });
    }

    resetDragState();
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
      <div ref={containerRef} className="flex gap-2 min-h-screen bg-white p-3">
        {/* Left Sidebar - New Assigned Leads */}
        <KanbanColumn
          id={sidebarColumns[0].id}
          title={sidebarColumns[0].title}
          leads={sidebarColumns[0].leads}
          bgColor={sidebarColumns[0].bgColor}
          headerBg={sidebarColumns[0].headerBg}
          headerText={sidebarColumns[0].headerText}
          borderColor={sidebarColumns[0].borderColor}
          onLeadClick={onLeadClick}
          dynamicWidth={expandedColumns.newAssigned ? expandedWidth : collapsedWidth}
          isExpanded={expandedColumns.newAssigned}
          onToggleExpanded={() => toggleColumn('newAssigned')}
        />

        {/* Main Kanban Board */}
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            leads={column.leads}
            bgColor={column.bgColor}
            headerBg={column.headerBg}
            headerText={column.headerText}
            borderColor={column.borderColor}
            onLeadClick={onLeadClick}
            dynamicWidth={expandedColumns[column.id] ? expandedWidth : collapsedWidth}
            isExpanded={expandedColumns[column.id]}
            onToggleExpanded={() => toggleColumn(column.id)}
          />
        ))}

        {/* Right Sidebar - Contract Won */}
        <KanbanColumn
          id={sidebarColumns[1].id}
          title={sidebarColumns[1].title}
          leads={sidebarColumns[1].leads}
          bgColor={sidebarColumns[1].bgColor}
          headerBg={sidebarColumns[1].headerBg}
          headerText={sidebarColumns[1].headerText}
          borderColor={sidebarColumns[1].borderColor}
          onLeadClick={onLeadClick}
          dynamicWidth={expandedColumns.contractWon ? expandedWidth : collapsedWidth}
          isExpanded={expandedColumns.contractWon}
          onToggleExpanded={() => toggleColumn('contractWon')}
        />

        {/* Right Sidebar - Contract Lost */}
        <KanbanColumn
          id={sidebarColumns[2].id}
          title={sidebarColumns[2].title}
          leads={sidebarColumns[2].leads}
          bgColor={sidebarColumns[2].bgColor}
          headerBg={sidebarColumns[2].headerBg}
          headerText={sidebarColumns[2].headerText}
          borderColor={sidebarColumns[2].borderColor}
          onLeadClick={onLeadClick}
          dynamicWidth={expandedColumns.contractLost ? expandedWidth : collapsedWidth}
          isExpanded={expandedColumns.contractLost}
          onToggleExpanded={() => toggleColumn('contractLost')}
        />
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
