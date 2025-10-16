'use client';

import React, { useState } from 'react';
import { DealCard, DealData } from './DealCard';

interface SimpleKanbanColumnProps {
  title: string;
  count: number;
  deals: DealData[];
  defaultExpanded?: boolean;
  className?: string;
}

export const SimpleKanbanColumn: React.FC<SimpleKanbanColumnProps> = ({
  title,
  count,
  deals,
  defaultExpanded = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`bg-kanban-bg flex gap-sm items-start justify-center overflow-hidden p-md relative rounded-lg w-full ${className}`}>
      <div className="flex flex-col gap-[9px] grow items-start min-w-0 relative shrink-0">
        {/* Header */}
        <div className="bg-kanban-header-bg flex gap-sm items-center justify-center px-[6px] py-[3px] relative rounded-sm shrink-0">
          <span className="font-semibold leading-[18px] relative shrink-0 text-kanban-header-text text-xs whitespace-nowrap">
            {title} ({count})
          </span>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="flex flex-col gap-[9px] w-full">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}

        {/* Toggle Button */}
        <div className="flex items-center justify-center relative shrink-0 w-full">
          <button
            onClick={toggleExpanded}
            className="flex items-center justify-center p-2 hover:bg-kanban-header-bg rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-kanban-header-text focus:ring-offset-2"
            aria-label={isExpanded ? `Collapse ${title} column` : `Expand ${title} column`}
            aria-expanded={isExpanded}
            role="button"
            tabIndex={0}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`text-text-secondary transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
