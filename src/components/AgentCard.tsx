"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StatusIndicator } from "@/components/StatusIndicator"
import { Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

type SnippetType = 'engine' | 'stream' | 'orchestrator' | 'queue'

interface AgentCardProps {
  agentName: string
  outputType: 'command_line' | 'log_entry' | 'status_message'
  status: "online" | "offline" | "error" | "warning"
  snippet?: SnippetType
}

export function AgentCard({ agentName, outputType, status, snippet = 'engine' }: AgentCardProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const EngineSnippet = () => (
    <div className="space-y-1">
      <div><span className="text-primary">const</span> <span className="text-foreground">LyraEngine</span> <span className="text-foreground">=</span> <span className="text-primary">require</span><span className="text-foreground">(</span><span className="text-emerald-400">"lyra-engine"</span><span className="text-foreground">);</span></div>
      <div className="pt-1"><span className="text-primary">const</span> <span className="text-foreground">config</span> <span className="text-foreground">=</span> <span className="text-foreground">{`{`}</span></div>
      <div className="pl-4"><span className="text-foreground">token:</span> <span className="text-emerald-400">"RND-LYRA-77XZ"</span><span className="text-foreground">,</span></div>
      <div className="pl-4"><span className="text-foreground">memory:</span> <span className="text-orange-400">true</span><span className="text-foreground">,</span></div>
      <div className="pl-4"><span className="text-foreground">autoLearning:</span> <span className="text-orange-400">false</span><span className="text-foreground">,</span></div>
      <div className="pl-4"><span className="text-foreground">responseSpeed:</span> <span className="text-emerald-400">"fast"</span><span className="text-foreground">,</span></div>
      <div className="pl-4"><span className="text-foreground">maxConcurrency:</span> <span className="text-orange-400">1024</span><span className="text-foreground">,</span></div>
      <div className="pl-4"><span className="text-foreground">errorThreshold:</span> <span className="text-orange-400">0.02</span><span className="text-foreground">,</span></div>
      <div className="pl-4"><span className="text-foreground">retryPolicy:</span> <span className="text-emerald-400">"exponential-backoff"</span><span className="text-foreground">,</span></div>
      <div className="pl-4"><span className="text-foreground">caching:</span> <span className="text-foreground">{`{`}</span></div>
      <div className="pl-8"><span className="text-foreground">provider:</span> <span className="text-emerald-400">"redis-cluster"</span><span className="text-foreground">,</span></div>
      <div className="pl-8"><span className="text-foreground">ttl:</span> <span className="text-orange-400">3600</span><span className="text-foreground">,</span></div>
      <div className="pl-8"><span className="text-foreground">invalidateOnMutation:</span> <span className="text-orange-400">true</span></div>
      <div className="pl-4"><span className="text-foreground">{`}`}</span></div>
      <div><span className="text-foreground">{`};`}</span></div>
      <div className="pt-2"><span className="text-primary">const</span> <span className="text-foreground">engine</span> <span className="text-foreground">=</span> <span className="text-primary">new</span> <span className="text-foreground">LyraEngine(config);</span></div>
      <div><span className="text-foreground">engine.</span><span className="text-primary">use</span><span className="text-foreground">(</span><span className="text-primary">async</span> <span className="text-foreground">(ctx, next) ={`>`} {`{`}</span></div>
      <div className="pl-4"><span className="text-primary">const</span> <span className="text-foreground">start</span> <span className="text-foreground">=</span> <span className="text-foreground">performance.</span><span className="text-primary">now</span><span className="text-foreground">();</span></div>
      <div className="pl-4"><span className="text-primary">await</span> <span className="text-primary">next</span><span className="text-foreground">();</span></div>
      <div className="pl-4"><span className="text-foreground">console.</span><span className="text-primary">log</span><span className="text-foreground">(</span><span className="text-emerald-400">{`Execution: \${performance.now() - start}ms`}</span><span className="text-foreground">);</span></div>
      <div><span className="text-foreground">{`});`}</span></div>
      <div className="pt-2"><span className="text-foreground">engine.</span><span className="text-primary">on</span><span className="text-foreground">(</span><span className="text-emerald-400">"critical-failure"</span><span className="text-foreground">, (err) ={`>`} {`{`}</span></div>
      <div className="pl-4"><span className="text-foreground">AlertSystem.</span><span className="text-primary">dispatch</span><span className="text-foreground">(err.message);</span></div>
      <div className="pl-4"><span className="text-foreground">engine.</span><span className="text-primary">reboot</span><span className="text-foreground">();</span></div>
      <div><span className="text-foreground">{`});`}</span></div>
      <div className="pt-2"><span className="text-foreground">engine.</span><span className="text-primary">boot</span><span className="text-foreground">();</span></div>
      <div className="text-muted-foreground/20 italic">// System monitoring active...</div>
      <div className="text-muted-foreground/20 italic">// Loading weights for neural-v4...</div>
      <div className="text-muted-foreground/20 italic">// Verifying checksums...</div>
      <div className="text-muted-foreground/20 italic">// Handshake established with central node.</div>
      <div className="pt-2"><span className="text-foreground">export default engine;</span></div>
    </div>
  )

  const StreamSnippet = () => (
    <div className="space-y-1">
      <div><span className="text-primary">import</span> <span className="text-foreground">{`{ StreamX }`}</span> <span className="text-primary">from</span> <span className="text-emerald-400">"@lyra/streams"</span><span className="text-foreground">;</span></div>
      <div><span className="text-primary">const</span> <span className="text-foreground">source</span> <span className="text-foreground">=</span> <span className="text-primary">new</span> <span className="text-foreground">StreamX(</span><span className="text-emerald-400">"PRI_UPS_01"</span><span className="text-foreground">);</span></div>
      <div className="pt-1"><span className="text-foreground">source.</span><span className="text-primary">on</span><span className="text-foreground">(</span><span className="text-emerald-400">"data"</span><span className="text-foreground">, (</span><span className="text-foreground">packet</span><span className="text-foreground">) ={`>`} {`{`}</span></div>
      <div className="pl-4"><span className="text-primary">const</span> <span className="text-foreground">normalized</span> <span className="text-foreground">=</span> <span className="text-foreground">Lyra.</span><span className="text-primary">process</span><span className="text-foreground">(packet);</span></div>
      <div className="pl-4"><span className="text-primary">if</span> <span className="text-foreground">(normalized.entropy {`>`}</span> <span className="text-orange-400">0.8</span><span className="text-foreground">) {`{`}</span></div>
      <div className="pl-8"><span className="text-foreground">Alert.</span><span className="text-primary">dispatch</span><span className="text-foreground">(</span><span className="text-emerald-400">"anomaly"</span><span className="text-foreground">);</span></div>
      <div className="pl-4"><span className="text-foreground">{`}`}</span></div>
      <div className="pl-4"><span className="text-primary">switch</span><span className="text-foreground">(normalized.type) {`{`}</span></div>
      <div className="pl-8"><span className="text-primary">case</span> <span className="text-emerald-400">"TELEMETRY"</span><span className="text-foreground">:</span></div>
      <div className="pl-12"><span className="text-foreground">Database.</span><span className="text-primary">insert</span><span className="text-foreground">(normalized.payload);</span></div>
      <div className="pl-12"><span className="text-primary">break</span><span className="text-foreground">;</span></div>
      <div className="pl-8"><span className="text-primary">case</span> <span className="text-emerald-400">"SYSTEM_LOG"</span><span className="text-foreground">:</span></div>
      <div className="pl-12"><span className="text-foreground">Logger.</span><span className="text-primary">stream</span><span className="text-foreground">(normalized.payload);</span></div>
      <div className="pl-12"><span className="text-primary">break</span><span className="text-foreground">;</span></div>
      <div className="pl-8"><span className="text-primary">default</span><span className="text-foreground">:</span></div>
      <div className="pl-12"><span className="text-foreground">Buffer.</span><span className="text-primary">push</span><span className="text-foreground">(normalized);</span></div>
      <div className="pl-4"><span className="text-foreground">{`}`}</span></div>
      <div><span className="text-foreground">{`});`}</span></div>
      <div className="pt-2"><span className="text-foreground">source.</span><span className="text-primary">pipe</span><span className="text-foreground">(</span><span className="text-primary">new</span> <span className="text-foreground">Transformer({`{`}</span></div>
      <div className="pl-4"><span className="text-foreground">mode:</span> <span className="text-emerald-400">"aggressive"</span><span className="text-foreground">,</span></div>
      <div className="pl-4"><span className="text-foreground">compression:</span> <span className="text-orange-400">true</span><span className="text-foreground">,</span></div>
      <div className="pl-4"><span className="text-foreground">encryption:</span> <span className="text-emerald-400">"AES-256"</span></div>
      <div><span className="text-foreground">{`}));`}</span></div>
      <div className="pt-2"><span className="text-foreground">source.</span><span className="text-primary">connect</span><span className="text-foreground">();</span></div>
      <div className="text-muted-foreground/20 italic">// Establishing TLS handshake...</div>
      <div className="text-muted-foreground/20 italic">// Buffering incoming sequence #4992...</div>
      <div className="text-muted-foreground/20 italic">// Parity check passed.</div>
      <div className="pt-2 font-bold text-primary">STREAM_UP_V24</div>
    </div>
  )

  const renderSnippet = () => {
    switch(snippet) {
      case 'stream': return <StreamSnippet />;
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
      </CardHeader>
      <CardContent className="p-4 font-code text-[10px] leading-relaxed relative overflow-hidden bg-black/40 h-[280px] flex flex-col">
        <div className="flex items-center justify-between gap-2 text-muted-foreground/30 mb-3 border-b border-border/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            <span className="uppercase tracking-widest text-[8px] font-bold">{outputType}</span>
          </div>
          <span className="text-[8px] opacity-50">STABLE_OS_v2.4</span>
        </div>
        
        <div className="custom-scrollbar relative flex-grow overflow-y-auto scroll-smooth pr-2">
          {isInitialLoading ? (
            <div className="flex flex-col gap-2 opacity-50 py-4">
              <div className="h-2 w-full bg-muted rounded animate-pulse" />
              <div className="h-2 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-2 w-1/2 bg-muted rounded animate-pulse" />
              <div className="h-2 w-full bg-muted rounded animate-pulse" />
              <div className="h-2 w-3/4 bg-muted rounded animate-pulse" />
            </div>
          ) : (
            <div className={cn(
              "transition-all duration-500",
              "animate-code-glitch animate-code-flow pb-8"
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
