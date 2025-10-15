import * as React from "react";

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return <table className={(className ?? "") + " w-full text-left text-sm"}>{children}</table>;
}

export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-50 text-gray-600">{children}</thead>;
}

export function TRow({ 
  children, 
  onClick, 
  className 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string; 
}) {
  return (
    <tr 
      className={`border-b last:border-0 hover:bg-gray-50/50 ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TH({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 font-medium">{children}</th>;
}

export function TD({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2">{children}</td>;
}



