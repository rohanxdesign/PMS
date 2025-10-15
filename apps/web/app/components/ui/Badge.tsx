import * as React from "react";

export function Badge({ children, color = "gray", variant, className }: { children: React.ReactNode; color?: "gray" | "blue" | "green" | "yellow" | "red"; variant?: "default" | "secondary" | "outline"; className?: string }) {
  const palette: Record<string, string> = {
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-800 border-yellow-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  
  const variantClasses = {
    default: `inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${palette[color]}`,
    secondary: "inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium",
    outline: `inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium border-gray-200 text-gray-700`,
  };
  
  const baseClasses = variant ? variantClasses[variant] : variantClasses.default;
  
  return (
    <span className={className ? `${baseClasses} ${className}` : baseClasses}>{children}</span>
  );
}



