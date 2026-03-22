
"use client"

import { cn } from "@/lib/utils"

interface StatusIndicatorProps {
  status: "online" | "offline" | "error" | "warning"
  className?: string
}

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  const colors = {
    online: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    offline: "bg-zinc-600",
    error: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
    warning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "w-2 h-2 rounded-full",
        colors[status],
        status === "online" && "animate-status-pulse"
      )} />
      <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60">
        {status}
      </span>
    </div>
  )
}
