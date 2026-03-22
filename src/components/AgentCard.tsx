"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StatusIndicator } from "@/components/StatusIndicator"
import { RefreshCcw, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AgentCardProps {
  agentName: string
  outputType: 'command_line' | 'log_entry' | 'status_message'
  status: "online" | "offline" | "error" | "warning"
}

export function AgentCard({ agentName, outputType, status }: AgentCardProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const HighlightedCode = () => (
    <div className="space-y-1">
      <div>
        <span className="text-primary">const</span> <span className="text-foreground">LyraEngine</span> <span className="text-foreground">=</span> <span className="text-primary">require</span><span className="text-foreground">(</span><span className="text-emerald-400">"lyra-engine"</span><span className="text-foreground">);</span>
      </div>
      <div className="pt-1">
        <span className="text-primary">const</span> <span className="text-foreground">config</span> <span className="text-foreground">=</span> <span className="text-foreground">{`{`}</span>
      </div>
      <div className="pl-4">
        <span className="text-foreground">token:</span> <span className="text-emerald-400">"RND-LYRA-77XZ"</span><span className="text-foreground">,</span>
      </div>
      <div className="pl-4">
        <span className="text-foreground">memory:</span> <span className="text-orange-400">true</span><span className="text-foreground">,</span>
      </div>
      <div className="pl-4">
        <span className="text-foreground">autoLearning:</span> <span className="text-orange-400">false</span><span className="text-foreground">,</span>
      </div>
      <div className="pl-4">
        <span className="text-foreground">responseSpeed:</span> <span className="text-emerald-400">"fast"</span>
      </div>
      <div>
        <span className="text-foreground">{`};`}</span>
      </div>
      <div className="pt-1">
        <span className="text-primary">const</span> <span className="text-foreground">engine</span> <span className="text-foreground">=</span> <span className="text-primary">new</span> <span className="text-foreground">LyraEngine(config);</span>
      </div>
      <div>
        <span className="text-foreground">engine.</span><span className="text-primary">boot</span><span className="text-foreground">();</span>
      </div>
    </div>
  )

  return (
    <Card className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300 group flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 px-4 border-b border-border/30">
        <div className="flex flex-col gap-1">
          <CardTitle className="font-headline text-sm font-bold tracking-tight text-primary/90">
            {agentName}
          </CardTitle>
          <StatusIndicator status={status} />
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 hover:text-primary transition-colors rounded-lg"
          disabled={isLoading}
        >
          <RefreshCcw className={isLoading ? "animate-spin w-4 h-4" : "w-4 h-4"} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow font-code text-[10px] leading-relaxed relative overflow-hidden bg-black/40">
        <div className="flex items-center justify-between gap-2 text-muted-foreground/30 mb-3 border-b border-border/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            <span className="uppercase tracking-widest text-[8px] font-bold">{outputType}</span>
          </div>
          <span className="text-[8px] opacity-50">STABLE_OS_v2.4</span>
        </div>
        
        <div className="custom-scrollbar overflow-y-auto max-h-48 min-h-[140px] relative">
          {isLoading ? (
            <div className="flex flex-col gap-2 opacity-50">
              <div className="h-2 w-full bg-muted rounded animate-pulse" />
              <div className="h-2 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-2 w-1/2 bg-muted rounded animate-pulse" />
            </div>
          ) : (
            <div className={cn(
              "transition-all duration-500",
              "animate-code-glitch animate-code-flow"
            )}>
              <div className="flex">
                <span className="text-primary/40 mr-3 opacity-50 select-none">$</span>
                <HighlightedCode />
              </div>
              <span className="inline-block w-1.5 h-3 bg-primary ml-1 animate-status-pulse align-middle mt-2" />
            </div>
          )}
        </div>

        {/* Scanline/Grid Overlay Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,221,51,0.02),rgba(255,255,255,0.01),rgba(242,63,13,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
      </CardContent>
    </Card>
  )
}