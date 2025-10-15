interface TabToggleProps {
  activeTab: 'all' | 'today' | 'week';
  onTabChange: (tab: 'all' | 'today' | 'week') => void;
}

export function TabToggle({ activeTab, onTabChange }: TabToggleProps) {
  const tabs = [
    { key: 'all' as const, label: 'All' },
    { key: 'today' as const, label: 'Today' },
    { key: 'week' as const, label: 'This Week' }
  ];

  return (
    <div className="flex flex-col gap-[6px] items-start relative w-full">
      <div className="bg-[#f5f7fa] flex gap-[4px] items-start p-[4px] rounded-[10px] w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`basis-0 flex gap-[6px] grow items-center justify-center min-h-px min-w-px overflow-clip p-[4px] relative rounded-[6px] shrink-0 transition-all ${
                isActive
                  ? 'bg-white shadow-[0px_6px_10px_0px_rgba(14,18,27,0.06),0px_2px_4px_0px_rgba(14,18,27,0.03)]'
                  : ''
              }`}
            >
              <p className={`basis-0 font-['Inter:Medium',_sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-center tracking-[-0.084px] ${
                isActive ? 'text-[#0e121b]' : 'text-[#99a0ae]'
              }`}>
                {tab.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
