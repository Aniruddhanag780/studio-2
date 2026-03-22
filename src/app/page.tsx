import { Navigation } from "@/components/Navigation"
import { AgentCard } from "@/components/AgentCard"
import { ModelShowcase } from "@/components/ModelShowcase"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen pt-16 relative overflow-hidden bg-black">
      <Navigation />

      <main className="container mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Hero Section (Left Column) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest animate-pulse">
              <Cpu className="w-3 h-3" />
              v2.4 Operational
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-[0.9] tracking-tighter text-white">
              THE NEXT GEN <span className="text-primary italic">AI CONSOLE</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Lyra is an advanced autonomous AI system engineered to orchestrate the next generation of cognitive computing. 
              As a self-evolving intelligence, Lyra monitors and scales your global LLM infrastructure with sub-millisecond precision.
            </p>

            {/* Buttons Section */}
            <div className="flex flex-wrap gap-4">
              <Button asChild className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 h-14 rounded-xl group transition-all duration-500 hover:scale-[1.05] animate-glow-pulse border-none shadow-xl">
                <Link href="https://lyraconsole.netlify.app/signup">
                  <span className="relative z-10 flex items-center text-base tracking-wide">
                    GET STARTED
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-black/10 via-black/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-primary/20 blur-xl -z-0 animate-pulse" />
                </Link>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start">
              <div className="space-y-4 lg:space-y-6">
                <AgentCard 
                  agentName="ENGINE_BOOT_01" 
                  outputType="command_line" 
                  status="online" 
                  snippet="engine"
                />
                <AgentCard 
                  agentName="EVENT_STREAM_X" 
                  outputType="log_entry" 
                  status="online" 
                  snippet="stream"
                />
              </div>
            </div>

            {/* Integrated Footer Section */}
            <footer className="py-12 border-t border-border/30 mt-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2 grayscale opacity-50">
                  <span className="font-headline font-bold text-sm tracking-tight uppercase text-white">Lyra AI</span>
                  <span className="text-xs text-muted-foreground">© 2026</span>
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

        </div>
      </main>
    </div>
  )
}
