"use client";
import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { KanbanCard } from "./KanbanCard";

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

interface KanbanColumnProps {
  id: string;
  title: string;
  leads: Lead[];
  bgColor: string;
  headerBg: string;
  headerText: string;
  borderColor: string;
  onLeadClick: (lead: Lead) => void;
}

export function KanbanColumn({ 
  id, 
  title, 
  leads, 
  bgColor, 
  headerBg, 
  headerText, 
  borderColor, 
  onLeadClick 
}: KanbanColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <motion.div 
      ref={setNodeRef}
      className="flex flex-col h-full"
      style={{ backgroundColor: bgColor }}
      animate={{
        scale: isOver ? 1.01 : 1,
        backgroundColor: isOver ? `${bgColor}dd` : bgColor,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Column Header */}
      <div className="p-3 mb-2">
        <div 
          className="inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold"
          style={{ 
            backgroundColor: headerBg,
            color: headerText
          }}
        >
          {title} ({leads.length})
        </div>
      </div>

      {/* Column Content */}
      <div className="flex-1 space-y-2 px-3 pb-3">
        {leads.map((lead) => (
          <KanbanCard
            key={lead.id}
            lead={lead}
            onClick={() => onLeadClick(lead)}
            borderColor={borderColor}
          />
        ))}
        
        {leads.length === 0 && (
          <motion.div 
            className="text-center py-8 text-gray-400"
            animate={{
              opacity: isOver ? 0.7 : 1,
            }}
          >
            <div className="text-2xl mb-2">📋</div>
            <p className="text-sm">No deals in this stage</p>
            {isOver && (
              <motion.p 
                className="text-sm text-blue-600 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Drop here to move deal
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
