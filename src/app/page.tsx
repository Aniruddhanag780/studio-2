import { Navigation } from "@/components/Navigation"
import { AgentCard } from "@/components/AgentCard"
import { ModelShowcase } from "@/components/ModelShowcase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen pt-16 relative overflow-hidden bg-[#0F0E0B]">
      {/* Background radial gradient for depth */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_60%_20%,_rgba(255,221,51,0.03)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_10%_80%,_rgba(242,63,13,0.02)_0%,_transparent_50%)] pointer-events-none" />

      <Navigation />

      <main className="container mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Hero Section (Left Column) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest animate-pulse">
              <Sparkles className="w-3 h-3" />
              v2.4 Operational
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-[0.9] tracking-tighter">
              THE NEXT GEN <span className="text-primary italic">AI CONSOLE</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Lyra is the world's most advanced management layer for autonomous agents. 
              Deploy, monitor, and scale your LLM workflows with sub-millisecond precision.
            </p>

            {/* Buttons Section */}
            <div className="flex flex-wrap gap-4">
              <Button className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 h-14 rounded-xl group transition-all duration-500 hover:scale-[1.05] animate-glow-pulse border-none shadow-xl">
                <span className="relative z-10 flex items-center text-base tracking-wide">
                  GET STARTED
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 via-white/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-primary/20 blur-xl -z-0 animate-pulse" />
              </Button>
              <Button variant="outline" className="border-border hover:bg-muted/50 font-bold px-8 h-14 rounded-xl">
                VIEW DEMO
              </Button>
            </div>

            <ModelShowcase />

            <div className="pt-12 hidden lg:block">
              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground/40 tracking-widest uppercase">
                <span className="w-12 h-[1px] bg-border/50" />
                Trusted by 500+ Engineering Teams
              </div>
            </div>
          </div>

          {/* Dashboard Section (Right Column) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-4 lg:space-y-6">
                <AgentCard 
                  agentName="TEST-GEN-01" 
                  outputType="command_line" 
                  status="online" 
                />
                <AgentCard 
                  agentName="EVENT_STREAM_X" 
                  outputType="log_entry" 
                  status="online" 
                />
              </div>
              <div className="space-y-4 lg:space-y-6 md:mt-12">
                <AgentCard 
                  agentName="DEPLOY_ORCHESTRATOR" 
                  outputType="status_message" 
                  status="online" 
                />
                <AgentCard 
                  agentName="TASK_QUEUE_PRIMARY" 
                  outputType="command_line" 
                  status="warning" 
                />
              </div>
            </div>

            {/* Quick Stats Overlay */}
            <div className="mt-8 grid grid-cols-3 gap-4 p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Active Flows</p>
                <p className="text-2xl font-headline font-bold text-primary">124</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Uptime</p>
                <p className="text-2xl font-headline font-bold text-primary">99.9%</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Latency</p>
                <p className="text-2xl font-headline font-bold text-primary">12ms</p>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-between group cursor-pointer hover:bg-accent/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-status-pulse" />
                <span className="text-sm font-headline font-medium">whats the red bar between ths 2</span>
              </div>
              <ChevronRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-border/30 mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <span className="font-headline font-bold text-sm tracking-tight uppercase">Lyra AI</span>
            <span className="text-xs text-muted-foreground">© 2024</span>
          </div>
          <div className="flex gap-8 text-xs font-medium text-muted-foreground/60">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Security</Link>
            <Link href="#" className="hover:text-primary transition-colors">Twitter / X</Link>
            <Link href="#" className="hover:text-primary transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
