
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleGetAccessClick = () => {
    setIsAnimating(true)
    // The animation runs for 1 second before resetting
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Cpu className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
            <span className="font-headline font-bold text-xl tracking-tight uppercase">Lyra AI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/platform" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Platform</Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Docs</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-sm font-medium hidden sm:inline-flex">Login</Button>
          <Button 
            onClick={handleGetAccessClick}
            className={cn(
              "relative overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 h-10 rounded-full group transition-all duration-500 hover:scale-[1.05] border-none shadow-lg",
              isAnimating && "animate-glow-pulse-accent"
            )}
          >
            <span className="relative z-10">Get Access</span>
            <div className={cn(
              "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 via-white/10 to-transparent pointer-events-none",
              isAnimating && "animate-shimmer"
            )} />
          </Button>
        </div>
      </div>
    </nav>
  )
}
