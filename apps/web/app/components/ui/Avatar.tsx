import * as React from "react";

export function Avatar({ name, size = 28 }: { name: string; size?: number }) {
  const initials = name.split(" ").map(p => p[0]?.toUpperCase()).slice(0,2).join("");
  return (
    <div className="inline-flex select-none items-center justify-center rounded-full bg-gray-200 text-gray-700"
      style={{ width: size, height: size, fontSize: Math.max(10, Math.floor(size/2.5)) }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}



