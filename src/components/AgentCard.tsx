"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StatusIndicator } from "@/components/StatusIndicator"
import { generateSimulatedAgentOutput, type SimulatedAgentOutputInput } from "@/ai/flows/simulated-agent-output-flow"
import { RefreshCcw, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AgentCardProps {
  agentName: string
  outputType: SimulatedAgentOutputInput["outputType"]
  status: "online" | "offline" | "error" | "warning"
}

export function AgentCard({ agentName, outputType, status }: AgentCardProps) {
  const [output, setOutput] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  const fetchOutput = async () => {
    setIsLoading(true)
    try {
      const result = await generateSimulatedAgentOutput({ agentName, outputType })
      setOutput(result.output)
    } catch (error) {
      setOutput("Error generating output...")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOutput()
    // Simulate periodic updates for logs
    const interval = setInterval(() => {
      if (Math.random() > 0.7) fetchOutput()
    }, 15000)
    return () => clearInterval(interval)
  }, [])

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
          onClick={fetchOutput}
          disabled={isLoading}
        >
          <RefreshCcw className={isLoading ? "animate-spin w-4 h-4" : "w-4 h-4"} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow font-code text-[10px] leading-relaxed relative overflow-hidden bg-black/20">
        <div className="flex items-center justify-between gap-2 text-muted-foreground/30 mb-3 border-b border-border/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            <span className="uppercase tracking-widest text-[8px] font-bold">{outputType}</span>
          </div>
          <span className="text-[8px] opacity-50">STABLE_OS_v2.4</span>
        </div>
        
        <div className="custom-scrollbar overflow-y-auto max-h-36 min-h-[100px] text-foreground/90 whitespace-pre-wrap relative">
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
              <span className="text-primary/40 mr-2 opacity-50 select-none">$</span>
              {output}
              <span className="inline-block w-1.5 h-3 bg-primary ml-1 animate-status-pulse align-middle" />
            </div>
          )}
        </div>

        {/* Scanline/Grid Overlay Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
      </CardContent>
    </Card>
  )
}
