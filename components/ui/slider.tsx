"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-cyan-40000-5000100950600-3000000000 text-cyan-400 text-cyan-400 text-cyan-50 text-[rgba(198,32,32,1)] text-[rgba(202,11,11,1)] text-[rgba(175,54,54,1)] text-[rgba(0,253,253,1)] text-[rgba(28,199,199,1)] text-[rgba(11,22,22,1)] text-[rgba(22,11,11,1)] text-[rgba(114,58,58,1)] text-cyan-300 text-cyan-300 text-cyan-50 text-red-900 text-orange-50 text-zinc-300 text-slate-50 text-red-800 text-red-800 text-red-900 text-orange-800 text-orange-700 text-neutral-600 text-neutral-400 text-gray-300 text-gray-200 text-slate-800 text-slate-600 text-slate-100 text-white text-cyan-400 text-cyan-300 text-cyan-50 text-stone-300 text-neutral-700 text-gray-500 text-slate-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
