interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Search..." }: SearchInputProps) {
  return (
    <div className="bg-white border border-[#e1e4ea] border-solid relative rounded-[8px] shrink-0 w-[300px]">
      <div className="box-border flex gap-[8px] items-center overflow-clip pl-[10px] pr-[8px] py-[8px] relative rounded-[inherit] w-full">
        <div className="relative shrink-0 size-[20px]">
          <svg className="w-5 h-5 text-[#99a0ae]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#99a0ae] text-[14px] tracking-[-0.084px] bg-transparent border-none outline-none"
        />
        <div className="bg-white border border-[#e1e4ea] border-solid relative rounded-[4px] shrink-0">
          <div className="box-border flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
            <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#99a0ae] text-[12px] text-nowrap tracking-[0.48px] uppercase whitespace-pre">
              ⌘1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
