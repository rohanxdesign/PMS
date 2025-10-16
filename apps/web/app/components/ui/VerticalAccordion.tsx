'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { componentStyles } from '../../lib/colors';

interface VerticalAccordionProps {
  title: string;
  count: number;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export const VerticalAccordion: React.FC<VerticalAccordionProps> = ({
  title,
  count,
  children,
  defaultExpanded = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <div className={`flex gap-[9px] items-start relative ${className}`}>
      {/* Vertical Text Pill */}
      <motion.div 
        className="flex flex-col items-center justify-center"
        style={{
          padding: '3px 6px',
          borderRadius: '4px',
          gap: '8px',
          backgroundColor: '#D0DFF0',
          width: '24px',
          height: '97px'
        }}
        animate={{ 
          height: isExpanded ? '97px' : '97px' // Keep consistent height
        }}
        transition={{ 
          duration: 0.3, 
          ease: "easeInOut" 
        }}
      >
        {/* Vertical Text */}
        <motion.p
          style={{
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: '18px',
            color: '#274A72',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            whiteSpace: 'nowrap',
            transform: 'rotate(180deg)' // Rotate text to read from bottom to top
          }}
          animate={{ 
            opacity: 1
          }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut" 
          }}
        >
          {title} ({count})
        </motion.p>
      </motion.div>

      {/* Chevron Up Button */}
      <motion.button
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        className="flex items-center justify-center relative shrink-0 w-[24px] h-[24px] p-1 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        aria-label={isExpanded ? `Collapse ${title} section` : `Expand ${title} section`}
        aria-expanded={isExpanded}
        style={{
          transform: 'rotate(90deg)' // Rotate the entire button 90 degrees
        }}
        animate={{ 
          rotate: isExpanded ? 90 : 90 // Keep rotated, but could animate if needed
        }}
        transition={{ 
          duration: 0.3, 
          ease: "easeInOut" 
        }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#274A72]"
          animate={{ 
            rotate: isExpanded ? 180 : 0 // Rotate chevron when expanded
          }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut" 
          }}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && children && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
