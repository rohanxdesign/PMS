"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Info } from "lucide-react";
import { Badge } from "./Badge";

interface DropdownOption {
  value: string;
  label: string;
  badge?: {
    color: "red" | "green" | "blue" | "yellow" | "gray";
    text: string;
  };
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  showInfo?: boolean;
  className?: string;
}

export function Dropdown({ 
  value, 
  onChange, 
  options, 
  placeholder = "Select...", 
  showInfo = false,
  className = ""
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          {selectedOption?.badge ? (
            <Badge color={selectedOption.badge.color}>{selectedOption.badge.text}</Badge>
          ) : (
            <span className="text-sm">{selectedOption?.label || placeholder}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {showInfo && <Info className="h-4 w-4 text-gray-600" />}
          <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center gap-2"
            >
              {option.badge ? (
                <Badge color={option.badge.color}>{option.badge.text}</Badge>
              ) : (
                <span>{option.label}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
