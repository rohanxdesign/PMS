import * as React from "react";

export function WeekCalendar({ days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], items = [] as { day: number; title: string }[] }) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((d, idx) => (
        <div key={d} className="border rounded-md bg-white">
          <div className="px-2 py-1 border-b bg-gray-50 text-xs font-medium">{d}</div>
          <div className="p-2 space-y-1 min-h-24">
            {items.filter(i => i.day === idx).map((i, j) => (
              <div key={j} className="text-xs rounded bg-blue-50 border border-blue-100 px-2 py-1">
                {i.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}



