"use client";
import { useState, useRef, useEffect } from "react";

interface ViewOption {
  id: string;
  name: string;
  type: 'system' | 'custom';
  icon: React.ReactNode;
}

interface ViewDropdownProps {
  currentView: string;
  onViewChange: (viewId: string) => void;
  onKanbanView: () => void;
  onTableView: () => void;
}

export function ViewDropdown({ currentView, onViewChange, onKanbanView, onTableView }: ViewDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const viewOptions: ViewOption[] = [
    {
      id: 'board',
      name: 'Board view',
      type: 'system',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      )
    },
    {
      id: 'table',
      name: 'Table View',
      type: 'system',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      )
    }
  ];

  const currentViewOption = viewOptions.find(option => option.id === currentView);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewSelect = (viewId: string) => {
    if (viewId === 'board') {
      onKanbanView();
    } else if (viewId === 'table') {
      onTableView();
    } else {
      onViewChange(viewId);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-[#e1e4ea] border-solid relative rounded-[8px] shrink-0 hover:bg-gray-50 transition-colors"
      >
        <div className="box-border flex gap-[4px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">
          <div className="relative shrink-0 size-[20px]">
            <svg className="w-5 h-5 text-[#475467]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div className="box-border flex items-center justify-center px-[4px] py-0 relative shrink-0">
            <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525866] text-[14px] text-nowrap tracking-[-0.084px]">
              <p className="leading-[20px] whitespace-pre">{currentViewOption?.name || 'All Deals'}</p>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]">
            <svg className="w-5 h-5 text-[#475467]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            {/* Board view option */}
            <button
              onClick={() => handleViewSelect('board')}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Board view of Deals</div>
              </div>
              <div className="bg-gray-100 px-2 py-1 rounded-full">
                <span className="text-xs text-gray-600">System</span>
              </div>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2" />

            {/* List view options */}
            {viewOptions.slice(1).map((option) => (
              <button
                key={option.id}
                onClick={() => handleViewSelect(option.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors ${
                  currentView === option.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="text-gray-600">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{option.name}</div>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded-full">
                  <span className="text-xs text-gray-600">{option.type === 'system' ? 'System' : 'Custom'}</span>
                </div>
                {currentView === option.id && (
                  <div className="text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-200 my-2" />

            {/* Create new view button */}
            <button
              onClick={() => {
                // Handle create new view
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-yellow-100 hover:bg-yellow-200 text-gray-900 rounded-md transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium">Create new view</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
