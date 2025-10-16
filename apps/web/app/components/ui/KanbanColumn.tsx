'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import { DealCard, DealData } from './DealCard';
import { KanbanCard } from './KanbanCard';
import { componentStyles } from '../../lib/colors';

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
  // New component props (for demo pages)
  title?: string;
  count?: number;
  deals?: DealData[];
  defaultExpanded?: boolean;
  className?: string;
  
  // BD Board props (for sales/leads page)
  id?: string;
  leads?: Lead[];
  bgColor?: string;
  headerBg?: string;
  headerText?: string;
  borderColor?: string;
  onLeadClick?: (lead: Lead) => void;
  
  // Dynamic width props
  dynamicWidth?: number;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  // New props
  title: titleProp,
  count: countProp,
  deals,
  defaultExpanded = false,
  className = '',
  // BD props
  id,
  leads,
  bgColor,
  headerBg,
  headerText,
  borderColor,
  onLeadClick,
  // Dynamic width props
  dynamicWidth,
  isExpanded: externalIsExpanded,
  onToggleExpanded
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(defaultExpanded);
  
  // Use external state if provided, otherwise use internal state
  const isExpanded = externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded;
  
  // Setup droppable for BD board
  const { setNodeRef } = useDroppable({
    id: id || 'default',
  });

  // Determine which mode we're in (demo vs BD board)
  const isBDMode = Boolean(leads);
  const title = titleProp || (isBDMode ? titleProp : '');
  const count = countProp !== undefined ? countProp : (leads?.length || 0);
  
  // Use custom colors if provided, otherwise use Figma defaults
  const columnBg = bgColor || componentStyles.kanbanColumn.backgroundColor;
  const pillBg = headerBg || componentStyles.kanbanHeader.backgroundColor;
  const pillText = headerText || componentStyles.kanbanHeaderText.color;

  const toggleExpanded = () => {
    if (onToggleExpanded) {
      onToggleExpanded();
    } else {
      setInternalIsExpanded(!internalIsExpanded);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  };

  // Calculate width - use dynamic width if provided, otherwise use default
  const getColumnWidth = () => {
    if (dynamicWidth !== undefined) {
      return isExpanded ? `${dynamicWidth}px` : componentStyles.kanbanColumn.width.collapsed;
    }
    return isExpanded ? componentStyles.kanbanColumn.width.expanded : componentStyles.kanbanColumn.width.collapsed;
  };

  return (
    <motion.div 
      ref={setNodeRef}
      className={`flex-shrink-0 ${className} cursor-pointer`}
      onDoubleClick={toggleExpanded}
      style={{
        width: getColumnWidth(),
        height: componentStyles.kanbanColumn.height,
        padding: componentStyles.kanbanColumn.padding,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: componentStyles.kanbanColumn.gap,
        borderRadius: componentStyles.kanbanColumn.borderRadius,
        backgroundColor: columnBg
      }}
      animate={{ 
        width: getColumnWidth()
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut" 
      }}
    >
      <div className="flex flex-col gap-2 h-full items-stretch w-full">
            {/* Header container with chevron above pill */}
            <div className="flex flex-col items-start gap-3">
              {/* Chevron button - Above pill, only visible in collapsed state */}
              {!isExpanded && (
                <button
                  onClick={toggleExpanded}
                  onKeyDown={handleKeyDown}
                  className="hover:opacity-70 active:opacity-50 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-interactive-focus focus:ring-offset-1 flex-shrink-0"
                  aria-label={`Expand ${title} column`}
                  aria-expanded={isExpanded}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: pillText }}
                  >
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              
              {/* Header Pill - Identical component for both states */}
              <motion.div 
                className="flex items-center justify-center cursor-pointer"
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded();
                }}
                style={{
                  padding: componentStyles.kanbanHeader.padding,
                  borderRadius: componentStyles.kanbanHeader.borderRadius,
                  backgroundColor: pillBg,
                  width: isExpanded ? 'fit-content' : '18px',
                  height: isExpanded ? '18px' : 'auto',
                  alignSelf: 'flex-start'
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeInOut" 
                }}
              >
                {/* Text based on expanded state */}
                {isExpanded ? (
                  <span
                    className="whitespace-nowrap"
                    style={{
                      fontFamily: componentStyles.kanbanHeaderText.fontFamily,
                      fontSize: componentStyles.kanbanHeaderText.fontSize,
                      fontWeight: componentStyles.kanbanHeaderText.fontWeight,
                      lineHeight: componentStyles.kanbanHeaderText.lineHeight,
                      color: pillText
                    }}
                  >
                    {title} ({count})
                  </span>
                ) : (
                  <span
                    className="whitespace-nowrap"
                    style={{
                      fontFamily: componentStyles.kanbanHeaderText.fontFamily,
                      fontSize: componentStyles.kanbanHeaderText.fontSize,
                      fontWeight: componentStyles.kanbanHeaderText.fontWeight,
                      lineHeight: componentStyles.kanbanHeaderText.lineHeight,
                      color: pillText,
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      display: 'block'
                    }}
                  >
                    {title} ({count})
                  </span>
                )}
              </motion.div>
            </div>

        {/* Cards - Fade in/out when expanded */}
        <motion.div
          animate={{ 
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? 'auto' : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col gap-2 overflow-hidden w-full"
          style={{ 
            display: isExpanded ? 'flex' : 'none'
          }}
        >
          {isBDMode ? (
            // Render KanbanCard for BD board with leads
            leads?.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 10 }}
                transition={{ 
                  delay: isExpanded ? index * 0.05 : 0,
                  duration: 0.2,
                  ease: "easeOut"
                }}
              >
                <KanbanCard 
                  lead={lead} 
                  onClick={() => onLeadClick?.(lead)}
                  borderColor={borderColor}
                />
              </motion.div>
            ))
          ) : (
            // Render DealCard for demo pages with deals
            deals?.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 10 }}
                transition={{ 
                  delay: isExpanded ? index * 0.05 : 0,
                  duration: 0.2,
                  ease: "easeOut"
                }}
              >
                <DealCard deal={deal} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};