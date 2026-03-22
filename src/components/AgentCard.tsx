"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StatusIndicator } from "@/components/StatusIndicator"
import { generateSimulatedAgentOutput, type SimulatedAgentOutputInput } from "@/ai/flows/simulated-agent-output-flow"
import { RefreshCcw, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <Card className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300 group flex flex-col h-full rounded-2xl overflow-hidden">
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
      <CardContent className="p-4 flex-grow font-code text-xs leading-relaxed">
        <div className="flex items-start gap-2 text-muted-foreground/40 mb-2">
          <Terminal className="w-3 h-3 mt-0.5" />
          <span className="uppercase tracking-tighter text-[10px]">{outputType}</span>
        </div>
        <div className="custom-scrollbar overflow-y-auto max-h-32 text-foreground/80 whitespace-pre-wrap">
          {isLoading ? (
            <div className="flex flex-col gap-1 opacity-50">
              <div className="h-3 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
            </div>
          ) : (
            output
          )}
        </div>
      </CardContent>
    </Card>
  )
}
