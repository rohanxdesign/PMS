import Link from "next/link";

interface AddNewDealButtonProps {
  className?: string;
}

export function AddNewDealButton({ className }: AddNewDealButtonProps) {
  return (
    <Link href="/sales/leads/edit/new" className={className}>
      <div 
        className="border border-[rgba(255,255,255,0.12)] border-solid relative rounded-[10px] w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
        style={{ 
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(14, 18, 27) 0%, rgb(14, 18, 27) 100%)",
          boxShadow: "0px 4px 12px rgba(14, 18, 27, 0.15), 0px 2px 4px rgba(14, 18, 27, 0.1)"
        }}
      >
        <div className="box-border content-stretch flex gap-1 items-center justify-center overflow-clip p-2.5 relative rounded-[inherit] w-full">
          {/* Plus Icon */}
          <div className="relative shrink-0 size-6">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
          </div>
          
          {/* Text */}
          <div className="box-border content-stretch flex items-center justify-center px-1 py-0 relative shrink-0">
            <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-sm text-nowrap text-white tracking-[-0.084px]">
              <p className="leading-5 whitespace-pre">Add a New Deal</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

