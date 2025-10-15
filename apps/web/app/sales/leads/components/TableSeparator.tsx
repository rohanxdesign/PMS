interface TableSeparatorProps {
  className?: string;
}

export function TableSeparator({ className }: TableSeparatorProps) {
  return (
    <div className={`w-full h-px bg-[#e1e4ea] ${className || ''}`} />
  );
}

