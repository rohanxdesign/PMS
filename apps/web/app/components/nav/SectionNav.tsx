"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";

function Chip({ active, children, href, icon }: { active?: boolean; children: React.ReactNode; href: string; icon?: React.ReactNode }) {
  // EXACT SPECS: 36px height, radius-8, gap 8px, padding 8px 12px 8px 8px
  return (
    <Link 
      href={href} 
      className={`
        inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors
        ${active 
          ? 'bg-blue-50 text-gray-900' // bg/weak-50 - light blue background
          : 'bg-white text-gray-900 hover:bg-gray-50' // bg/white-0 - white background
        }
      `}
      style={{ height: '36px' }}
    >
      <span className={active ? "text-blue-600" : "text-gray-600"}>{icon}</span>
      <span className="leading-none">{children}</span>
    </Link>
  );
}

type Item = { href: string; label: string; icon?: React.ReactNode };

export default function SectionNav({ items, right }: { items: Item[]; right?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-gray-200 bg-white sticky top-0 z-40">
      {/* EXACT SPECS: 80px height, 1440px width, padding 20px 44px 20px 44px, gap 16px */}
      <div 
        className="w-full flex items-center justify-between" 
        style={{ 
          height: '80px', 
          padding: '20px 44px',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        {/* Left side - Navigation tabs */}
        <div className="flex items-center" style={{ gap: '16px' }}>
          {items.map((it) => (
            <Chip key={it.href} href={it.href} active={pathname?.startsWith(it.href)} icon={it.icon}>
              {it.label}
            </Chip>
          ))}
        </div>
        
        {/* Right side - Bell and User profile */}
        <div className="flex items-center" style={{ gap: '16px' }}>
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm hover:bg-gray-50" style={{ height: '36px' }}>
            <div className="h-6 w-6 rounded-full bg-blue-200" />
            <span className="font-medium">Kamal</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>
          {right}
        </div>
      </div>
    </div>
  );
}


