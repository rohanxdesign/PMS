interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'primary';
}

export function ActionButton({ icon, label, onClick, variant = 'default' }: ActionButtonProps) {
  if (variant === 'primary') {
    return (
      <button
        onClick={onClick}
        className="border border-[rgba(255,255,255,0.12)] border-solid relative rounded-[10px] shrink-0"
        style={{ 
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(14, 18, 27) 0%, rgb(14, 18, 27) 100%)" 
        }}
      >
        <div className="box-border flex gap-[4px] items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
          <div className="relative shrink-0 size-[24px]">
            {icon}
          </div>
          <div className="box-border flex items-center justify-center px-[4px] py-0 relative shrink-0">
            <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.084px]">
              <p className="leading-[20px] whitespace-pre">{label}</p>
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#e1e4ea] border-solid relative rounded-[8px] shrink-0 hover:bg-gray-50 transition-colors"
    >
      <div className="box-border flex gap-[4px] items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">
        <div className="relative shrink-0 size-[20px]">
          {icon}
        </div>
        <div className="box-border flex items-center justify-center px-[4px] py-0 relative shrink-0">
          <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525866] text-[14px] text-nowrap tracking-[-0.084px]">
            <p className="leading-[20px] whitespace-pre">{label}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
