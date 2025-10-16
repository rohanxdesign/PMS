"use client";
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Badge } from "./Badge";
import { Avatar } from "./Avatar";
import { formatCurrency } from "@/app/lib/fx";

interface KanbanCardProps {
  lead: {
    id: string;
    name: string;
    company?: string;
    country: "India" | "Nepal";
    stage: string;
    owner: string;
    totalAmount: number;
    totalDeals: number;
    remarks?: string;
  };
  onClick: () => void;
  borderColor?: string;
}

export function KanbanCard({ lead, onClick, borderColor = "rgba(0,0,0,0.1)" }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: lead.id,
    data: {
      lead,
    },
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Won": return "green";
      case "Lost": return "red";
      case "Qualified": return "blue";
      case "Contacted": return "yellow";
      case "New": return "gray";
      default: return "gray";
    }
  };

  const formatCloseDate = () => {
    // Mock close date calculation - in real app this would come from deal data
    const days = Math.floor(Math.random() * 14) + 1;
    return days === 1 ? "in 1 day" : `in ${days} days`;
  };

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        ...style,
        border: `1px solid ${borderColor}`,
      }}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`w-full min-w-[268px] bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-all duration-200 group ${
        isDragging ? 'opacity-50 rotate-1 scale-105' : ''
      }`}
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
      whileTap={{ scale: 0.99 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      dragMomentum={false}
    >
      {/* Deal Name */}
      <div className="font-semibold text-[#1d2939] text-sm mb-5 group-hover:text-blue-600 transition-colors">
        {lead.name}
      </div>

      {/* Deal Details */}
      <div className="space-y-3">
        {/* Company */}
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
            Company
          </span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#d0d5dd] rounded"></div>
            <span className="text-[10px] font-semibold text-[#101828]">
              {lead.company || 'N/A'}
            </span>
          </div>
        </div>

        {/* Deal Amount */}
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
            Deal Amount
          </span>
          <span className="text-[10px] font-semibold text-[#101828]">
            {lead.country === "Nepal" 
              ? formatCurrency(lead.totalAmount, "NPR")
              : formatCurrency(lead.totalAmount, "INR")
            }
          </span>
        </div>

        {/* Lead Owner */}
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
            Lead Owner
          </span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#d0d5dd] rounded-full"></div>
            <span className="text-[10px] font-semibold text-[#101828]">
              {lead.owner}
            </span>
          </div>
        </div>

        {/* Close Date */}
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
            Est Close Date
          </span>
          <span className="text-[10px] font-semibold text-[#101828]">
            {formatCloseDate()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
