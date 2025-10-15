"use client";
import * as React from "react";

interface FancyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function FancyButton({ 
  children, 
  onClick, 
  className = "", 
  disabled = false,
  icon 
}: FancyButtonProps) {
  // Ensure consistent rendering between server and client
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`h-11 bg-gray-200 animate-pulse rounded-lg ${className}`} />;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border border-[rgba(255,255,255,0.12)] border-solid relative rounded-[10px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{ 
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(14, 18, 27) 0%, rgb(14, 18, 27) 100%)"
      }}
    >
      <div className="box-border content-stretch flex gap-1 items-center justify-center overflow-clip p-2.5 relative rounded-[inherit] size-full">
        {/* Icon with layered structure */}
        {icon && (
          <div className="relative shrink-0 size-6">
            {/* Base icon */}
            <div className="absolute inset-[12.5%]">
              {icon}
            </div>
            {/* Overlay stroke for depth - only for plus icon */}
            {React.isValidElement(icon) && icon.props.children?.props?.d?.includes("M12 6v6m0 0v6m0-6h6m-6 0H6") && (
              <div className="absolute inset-[12.5%]">
                <div className="absolute inset-[-5.56%]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Text with proper typography */}
        <div className="box-border content-stretch flex items-center justify-center px-1 py-0 relative shrink-0">
          <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-sm text-nowrap text-white tracking-[-0.084px]">
            <p className="leading-5 whitespace-pre">{children}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

// Default plus icon for convenience
export function PlusIcon() {
  return (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}
