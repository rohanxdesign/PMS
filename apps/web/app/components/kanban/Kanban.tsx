"use client";
import * as React from "react";

type KanbanItem = { id: string; title: string; meta?: string };
type KanbanColumn = { id: string; title: string; items: KanbanItem[] };

export function KanbanBoard({ columns }: { columns: KanbanColumn[] }) {
  return (
    <div className="flex gap-5 min-h-screen bg-gray-50 px-10 py-0">
      {/* Left Sidebar - New Assigned Leads */}
      <div className="bg-[#fdf8f9] rounded-xl p-3 flex flex-col gap-3 items-center justify-center">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
          ## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
            <div className="bg-[#f4d6df] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#68354e] whitespace-nowrap">
              New Assigned Leads (0)
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Board */}
      <div className="flex-1 flex gap-2 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-0">
            <div className="flex flex-col h-full bg-[#fcf7f5] rounded-xl p-3">
              {/* Column Header */}
              <div className="mb-2">
                <div className="bg-[#f1d7c8] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#663d21]">
                  {col.title} ({col.items.length})
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-2">
                {col.items.map((it) => (
                  <div key={it.id} className="bg-white border border-[rgba(241,215,200,0.64)] rounded-lg p-3">
                    <div className="font-semibold text-[#1d2939] text-sm mb-3">{it.title}</div>
                    {it.meta && (
                      <div className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
                        {it.meta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar - Contract Won */}
      <div className="bg-[#d1fadf] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#6ce9a6] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#039855] whitespace-nowrap">
              Contract Won (0)
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contract Lost */}
      <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#d0d5dd] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#475467] whitespace-nowrap">
              Contract Lost (0)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



          ## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
            <div className="bg-[#f4d6df] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#68354e] whitespace-nowrap">
              New Assigned Leads (0)
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Board */}
      <div className="flex-1 flex gap-2 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-0">
            <div className="flex flex-col h-full bg-[#fcf7f5] rounded-xl p-3">
              {/* Column Header */}
              <div className="mb-2">
                <div className="bg-[#f1d7c8] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#663d21]">
                  {col.title} ({col.items.length})
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-2">
                {col.items.map((it) => (
                  <div key={it.id} className="bg-white border border-[rgba(241,215,200,0.64)] rounded-lg p-3">
                    <div className="font-semibold text-[#1d2939] text-sm mb-3">{it.title}</div>
                    {it.meta && (
                      <div className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
                        {it.meta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar - Contract Won */}
      <div className="bg-[#d1fadf] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#6ce9a6] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#039855] whitespace-nowrap">
              Contract Won (0)
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contract Lost */}
      <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#d0d5dd] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#475467] whitespace-nowrap">
              Contract Lost (0)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



          ## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
            <div className="bg-[#f4d6df] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#68354e] whitespace-nowrap">
              New Assigned Leads (0)
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Board */}
      <div className="flex-1 flex gap-2 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-0">
            <div className="flex flex-col h-full bg-[#fcf7f5] rounded-xl p-3">
              {/* Column Header */}
              <div className="mb-2">
                <div className="bg-[#f1d7c8] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#663d21]">
                  {col.title} ({col.items.length})
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-2">
                {col.items.map((it) => (
                  <div key={it.id} className="bg-white border border-[rgba(241,215,200,0.64)] rounded-lg p-3">
                    <div className="font-semibold text-[#1d2939] text-sm mb-3">{it.title}</div>
                    {it.meta && (
                      <div className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
                        {it.meta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar - Contract Won */}
      <div className="bg-[#d1fadf] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#6ce9a6] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#039855] whitespace-nowrap">
              Contract Won (0)
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contract Lost */}
      <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#d0d5dd] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#475467] whitespace-nowrap">
              Contract Lost (0)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



          ## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
            <div className="bg-[#f4d6df] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#68354e] whitespace-nowrap">
              New Assigned Leads (0)
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Board */}
      <div className="flex-1 flex gap-2 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-0">
            <div className="flex flex-col h-full bg-[#fcf7f5] rounded-xl p-3">
              {/* Column Header */}
              <div className="mb-2">
                <div className="bg-[#f1d7c8] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#663d21]">
                  {col.title} ({col.items.length})
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-2">
                {col.items.map((it) => (
                  <div key={it.id} className="bg-white border border-[rgba(241,215,200,0.64)] rounded-lg p-3">
                    <div className="font-semibold text-[#1d2939] text-sm mb-3">{it.title}</div>
                    {it.meta && (
                      <div className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
                        {it.meta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar - Contract Won */}
      <div className="bg-[#d1fadf] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#6ce9a6] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#039855] whitespace-nowrap">
              Contract Won (0)
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contract Lost */}
      <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#d0d5dd] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#475467] whitespace-nowrap">
              Contract Lost (0)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



          ## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
            <div className="bg-[#f4d6df] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#68354e] whitespace-nowrap">
              New Assigned Leads (0)
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Board */}
      <div className="flex-1 flex gap-2 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-0">
            <div className="flex flex-col h-full bg-[#fcf7f5] rounded-xl p-3">
              {/* Column Header */}
              <div className="mb-2">
                <div className="bg-[#f1d7c8] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#663d21]">
                  {col.title} ({col.items.length})
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-2">
                {col.items.map((it) => (
                  <div key={it.id} className="bg-white border border-[rgba(241,215,200,0.64)] rounded-lg p-3">
                    <div className="font-semibold text-[#1d2939] text-sm mb-3">{it.title}</div>
                    {it.meta && (
                      <div className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
                        {it.meta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar - Contract Won */}
      <div className="bg-[#d1fadf] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#6ce9a6] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#039855] whitespace-nowrap">
              Contract Won (0)
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contract Lost */}
      <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#d0d5dd] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#475467] whitespace-nowrap">
              Contract Lost (0)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



          ## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
            <div className="bg-[#f4d6df] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#68354e] whitespace-nowrap">
              New Assigned Leads (0)
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Board */}
      <div className="flex-1 flex gap-2 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-0">
            <div className="flex flex-col h-full bg-[#fcf7f5] rounded-xl p-3">
              {/* Column Header */}
              <div className="mb-2">
                <div className="bg-[#f1d7c8] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#663d21]">
                  {col.title} ({col.items.length})
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-2">
                {col.items.map((it) => (
                  <div key={it.id} className="bg-white border border-[rgba(241,215,200,0.64)] rounded-lg p-3">
                    <div className="font-semibold text-[#1d2939] text-sm mb-3">{it.title}</div>
                    {it.meta && (
                      <div className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
                        {it.meta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar - Contract Won */}
      <div className="bg-[#d1fadf] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#6ce9a6] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#039855] whitespace-nowrap">
              Contract Won (0)
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contract Lost */}
      <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#d0d5dd] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#475467] whitespace-nowrap">
              Contract Lost (0)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



          ## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
            <div className="bg-[#f4d6df] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#68354e] whitespace-nowrap">
              New Assigned Leads (0)
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Board */}
      <div className="flex-1 flex gap-2 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-0">
            <div className="flex flex-col h-full bg-[#fcf7f5] rounded-xl p-3">
              {/* Column Header */}
              <div className="mb-2">
                <div className="bg-[#f1d7c8] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#663d21]">
                  {col.title} ({col.items.length})
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-2">
                {col.items.map((it) => (
                  <div key={it.id} className="bg-white border border-[rgba(241,215,200,0.64)] rounded-lg p-3">
                    <div className="font-semibold text-[#1d2939] text-sm mb-3">{it.title}</div>
                    {it.meta && (
                      <div className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
                        {it.meta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar - Contract Won */}
      <div className="bg-[#d1fadf] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#6ce9a6] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#039855] whitespace-nowrap">
              Contract Won (0)
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contract Lost */}
      <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#d0d5dd] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#475467] whitespace-nowrap">
              Contract Lost (0)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



          ## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
## Error Type
Runtime Error

## Error Message
Cannot find module '../../../chunks/ssr/[turbopack]_runtime.js'
Require stack:
- /Users/rohan/Desktop/cursor projects/project0/apps/web/.next/server/app/sales/deals/page.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/require.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/load-components.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/utils.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/options.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/swc/index.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/build/next-config-ts/transpile-config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/config.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/next.js
- /Users/rohan/Desktop/cursor projects/project0/apps/web/node_modules/next/dist/server/lib/start-server.js


    at Object.<anonymous> (.next/server/app/sales/deals/page.js:1:7)

Next.js version: 15.5.4 (Turbopack)
            <div className="bg-[#f4d6df] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#68354e] whitespace-nowrap">
              New Assigned Leads (0)
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Board */}
      <div className="flex-1 flex gap-2 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-0">
            <div className="flex flex-col h-full bg-[#fcf7f5] rounded-xl p-3">
              {/* Column Header */}
              <div className="mb-2">
                <div className="bg-[#f1d7c8] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#663d21]">
                  {col.title} ({col.items.length})
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-2">
                {col.items.map((it) => (
                  <div key={it.id} className="bg-white border border-[rgba(241,215,200,0.64)] rounded-lg p-3">
                    <div className="font-semibold text-[#1d2939] text-sm mb-3">{it.title}</div>
                    {it.meta && (
                      <div className="text-[8px] font-semibold text-[#475467] tracking-[0.96px] uppercase">
                        {it.meta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar - Contract Won */}
      <div className="bg-[#d1fadf] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#6ce9a6] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#039855] whitespace-nowrap">
              Contract Won (0)
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contract Lost */}
      <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col gap-3 items-center justify-center opacity-70 shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div className="transform -rotate-90">
            <div className="bg-[#d0d5dd] inline-flex gap-2 items-center justify-center py-[3px] px-[6px] rounded text-xs font-semibold text-[#475467] whitespace-nowrap">
              Contract Lost (0)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



