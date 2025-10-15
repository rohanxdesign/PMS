import * as React from "react";

export function KPI({ label, value, trend }: { label: string; value: string | number; trend?: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-3xl font-bold text-gray-900">{value}</div>
      {trend ? <div className="mt-1 text-xs text-gray-500">{trend}</div> : null}
    </div>
  );
}


