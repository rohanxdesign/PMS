import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  viewMode: 'table' | 'kanban';
  onViewModeChange: (mode: 'table' | 'kanban') => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center border rounded-md bg-white">
      <button
        onClick={() => onViewModeChange('table')}
        className={`h-10 px-3 text-sm flex items-center gap-2 rounded-l-md transition-colors ${
          viewMode === 'table' 
            ? 'bg-blue-50 text-blue-600 border-blue-200' 
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <List className="h-4 w-4" />
        Table
      </button>
      <button
        onClick={() => onViewModeChange('kanban')}
        className={`h-10 px-3 text-sm flex items-center gap-2 rounded-r-md border-l transition-colors ${
          viewMode === 'kanban' 
            ? 'bg-blue-50 text-blue-600 border-blue-200' 
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
        Kanban
      </button>
    </div>
  );
}

