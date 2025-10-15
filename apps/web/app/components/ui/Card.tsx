import * as React from "react";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={(className ?? "") + " rounded-lg border border-gray-200 bg-white shadow-sm"}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={(className ?? "") + " px-4 py-3 border-b border-gray-100 font-semibold"}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={(className ?? "") + " p-4"}>{children}</div>;
}


