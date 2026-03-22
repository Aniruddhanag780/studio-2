"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StatusIndicator } from "@/components/StatusIndicator"
import { RefreshCcw, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { generateSimulatedAgentOutput } from "@/ai/flows/simulated-agent-output-flow"

type SnippetType = 'engine' | 'stream' | 'orchestrator' | 'queue'

interface AgentCardProps {
  agentName: string
  outputType: 'command_line' | 'log_entry' | 'status_message'
  status: "online" | "offline" | "error" | "warning"
  snippet?: SnippetType
}

export function AgentCard({ agentName, outputType, status, snippet = 'engine' }: AgentCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState<string | null>(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const result = await generateSimulatedAgentOutput({
        agentName,
        outputType
      })
      setAiOutput(result.output)
    } catch (error) {
      console.error("Failed to generate AI output:", error)
      setAiOutput("Error generating output...")
    } finally {
      setIsLoading(false)
    }
  }

  const EngineSnippet = () => (
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

  const StreamSnippet = () => (
    <div className="space-y-1">
      <div>
        <span className="text-primary">import</span> <span className="text-foreground">{`{ StreamX }`}</span> <span className="text-primary">from</span> <span className="text-emerald-400">"@lyra/streams"</span><span className="text-foreground">;</span>
      </div>
      <div>
        <span className="text-primary">const</span> <span className="text-foreground">source</span> <span className="text-foreground">=</span> <span className="text-primary">new</span> <span className="text-foreground">StreamX(</span><span className="text-emerald-400">"PRI_UPS_01"</span><span className="text-foreground">);</span>
      </div>
      <div className="pt-1">
        <span className="text-foreground">source.</span><span className="text-primary">on</span><span className="text-foreground">(</span><span className="text-emerald-400">"data"</span><span className="text-foreground">, (</span><span className="text-foreground">packet</span><span className="text-foreground">) ={`>`} {`{`}</span>
      </div>
      <div className="pl-4">
        <span className="text-primary">const</span> <span className="text-foreground">normalized</span> <span className="text-foreground">=</span> <span className="text-foreground">Lyra.</span><span className="text-primary">process</span><span className="text-foreground">(packet);</span>
      </div>
      <div className="pl-4">
        <span className="text-primary">if</span> <span className="text-foreground">(normalized.entropy {`>`}</span> <span className="text-orange-400">0.8</span><span className="text-foreground">) {`{`}</span>
      </div>
      <div className="pl-8">
        <span className="text-foreground">Alert.</span><span className="text-primary">dispatch</span><span className="text-foreground">(</span><span className="text-emerald-400">"anomaly"</span><span className="text-foreground">);</span>
      </div>
      <div className="pl-4">
        <span className="text-foreground">{`}`}</span>
      </div>
      <div className="pl-4">
        <span className="text-foreground">buffer.</span><span className="text-primary">push</span><span className="text-foreground">(normalized);</span>
      </div>
      <div>
        <span className="text-foreground">{`});`}</span>
      </div>
      <div>
        <span className="text-foreground">source.</span><span className="text-primary">connect</span><span className="text-foreground">();</span>
      </div>
    </div>
  )

  const OrchestratorSnippet = () => (
    <div className="space-y-1">
      <div>
        <span className="text-primary">async function</span> <span className="text-primary">deploy</span><span className="text-foreground">(manifest) {`{`}</span>
      </div>
      <div className="pl-4">
        <span className="text-primary">const</span> <span className="text-foreground">fleet</span> <span className="text-foreground">=</span> <span className="text-primary">await</span> <span className="text-foreground">Lyra.Orchestrator.</span><span className="text-primary">getFleet</span><span className="text-foreground">();</span>
      </div>
      <div className="pl-4">
        <span className="text-primary">for</span> <span className="text-foreground">(</span><span className="text-primary">const</span> <span className="text-foreground">node</span> <span className="text-primary">of</span> <span className="text-foreground">fleet) {`{`}</span>
      </div>
      <div className="pl-8">
        <span className="text-primary">if</span> <span className="text-foreground">(node.status ===</span> <span className="text-emerald-400">"idle"</span><span className="text-foreground">) {`{`}</span>
      </div>
      <div className="pl-12">
        <span className="text-primary">await</span> <span className="text-foreground">node.</span><span className="text-primary">inject</span><span className="text-foreground">(manifest.blob);</span>
      </div>
      <div className="pl-12">
        <span className="text-foreground">node.</span><span className="text-primary">scale</span><span className="text-foreground">(manifest.replicas);</span>
      </div>
      <div className="pl-12">
        <span className="text-foreground">console.</span><span className="text-primary">log</span><span className="text-foreground">(</span><span className="text-emerald-400">`Node linked`</span><span className="text-foreground">);</span>
      </div>
      <div className="pl-8">
        <span className="text-foreground">{`}`}</span>
      </div>
      <div className="pl-4">
        <span className="text-foreground">{`}`}</span>
      </div>
      <div>
        <span className="text-foreground">{`}`}</span>
      </div>
    </div>
  )

  const QueueSnippet = () => (
    <div className="space-y-1">
      <div>
        <span className="text-primary">const</span> <span className="text-foreground">queue</span> <span className="text-foreground">=</span> <span className="text-primary">new</span> <span className="text-foreground">Lyra.</span><span className="text-primary">PriorityQueue</span><span className="text-foreground">(</span><span className="text-emerald-400">"TASKS"</span><span className="text-foreground">);</span>
      </div>
      <div>
        <span className="text-foreground">queue.concurrency</span> <span className="text-foreground">=</span> <span className="text-orange-400">128</span><span className="text-foreground">;</span>
      </div>
      <div className="pt-1">
        <span className="text-foreground">queue.</span><span className="text-primary">process</span><span className="text-foreground">(</span><span className="text-primary">async</span> <span className="text-foreground">(task) ={`>`} {`{`}</span>
      </div>
      <div className="pl-4">
        <span className="text-primary">const</span> <span className="text-foreground">result</span> <span className="text-foreground">=</span> <span className="text-primary">await</span> <span className="text-foreground">Lyra.</span><span className="text-primary">Infer</span><span className="text-foreground">(task.prompt);</span>
      </div>
      <div className="pl-4">
        <span className="text-primary">await</span> <span className="text-foreground">task.</span><span className="text-primary">callback</span><span className="text-foreground">(result);</span>
      </div>
      <div className="pl-4">
        <span className="text-foreground">metrics.</span><span className="text-primary">track</span><span className="text-foreground">(</span><span className="text-emerald-400">"throughput"</span><span className="text-foreground">,</span> <span className="text-orange-400">1</span><span className="text-foreground">);</span>
      </div>
      <div>
        <span className="text-foreground">{`});`}</span>
      </div>
      <div>
        <span className="text-foreground">queue.</span><span className="text-primary">start</span><span className="text-foreground">();</span>
      </div>
      <div className="pt-1">
        <span className="text-foreground">console.</span><span className="text-primary">info</span><span className="text-foreground">(</span><span className="text-emerald-400">"Queue active"</span><span className="text-foreground">);</span>
      </div>
    </div>
  )

  const renderSnippet = () => {
    if (aiOutput) {
      return (
        <pre className="whitespace-pre-wrap break-words text-foreground opacity-90">
          {aiOutput}
        </pre>
      )
    }

    switch(snippet) {
      case 'stream': return <StreamSnippet />;
      case 'orchestrator': return <OrchestratorSnippet />;
      case 'queue': return <QueueSnippet />;
      default: return <EngineSnippet />;
    }
  }

  return (
    <Card className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300 group flex flex-col rounded-2xl overflow-hidden shadow-2xl">
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
          disabled={isLoading || isInitialLoading}
          onClick={handleRefresh}
        >
          <RefreshCcw className={(isLoading || isInitialLoading) ? "animate-spin w-4 h-4" : "w-4 h-4"} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 font-code text-[10px] leading-relaxed relative overflow-hidden bg-black/40 min-h-[160px] flex flex-col">
        <div className="flex items-center justify-between gap-2 text-muted-foreground/30 mb-3 border-b border-border/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            <span className="uppercase tracking-widest text-[8px] font-bold">{outputType}</span>
          </div>
          <span className="text-[8px] opacity-50">STABLE_OS_v2.4</span>
        </div>
        
        <div className="custom-scrollbar relative flex-grow">
          {(isLoading || isInitialLoading) ? (
            <div className="flex flex-col gap-2 opacity-50 py-4">
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
                <div className="flex-grow">
                  {renderSnippet()}
                </div>
              </div>
              <span className="inline-block w-1.5 h-3 bg-primary ml-1 animate-status-pulse align-middle mt-2" />
            </div>
          )}
        </div>

        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,221,51,0.02),rgba(255,255,255,0.01),rgba(242,63,13,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
      </CardContent>
    </Card>
  )
}
