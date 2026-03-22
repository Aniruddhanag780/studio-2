"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
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
            <Sparkles className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
            <span className="font-headline font-bold text-xl tracking-tight uppercase">Lyra AI</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            asChild
            onClick={handleGetAccessClick}
            className={cn(
              "relative overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 h-10 rounded-xl group transition-all duration-500 hover:scale-[1.05] border-none shadow-lg",
              isAnimating && "animate-glow-pulse-accent"
            )}
          >
            <Link href="https://lyraconsole.netlify.app/signup">
              <span className="relative z-10">Get Access</span>
              <div className={cn(
                "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 via-black/5 to-transparent pointer-events-none",
                isAnimating && "animate-shimmer"
              )} />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
