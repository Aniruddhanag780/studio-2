
"use client"

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function ModelShowcase() {
  const models = [
    { name: "Gemini 2.5", id: "model-gemini" },
    { name: "GPT-4 pro", id: "model-gpt" },
    { name: "Claude 3.5", id: "model-claude" },
  ]

  return (
    <div className="flex flex-wrap gap-8 mt-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-700">
      {models.map((model) => {
        const placeholder = PlaceHolderImages.find(p => p.id === model.id)
        return (
          <div key={model.id} className="flex items-center gap-3">
            {placeholder && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border/50 bg-muted/20">
                <Image
                  src={placeholder.imageUrl}
                  alt={placeholder.description}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholder.imageHint}
                />
              </div>
            )}
            <span className="font-headline font-medium text-sm tracking-tight">{model.name}</span>
          </div>
        )
      })}
    </div>
  )
}
