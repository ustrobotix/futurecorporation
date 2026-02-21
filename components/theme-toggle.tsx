"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme()
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    const handleToggle = () => {
        const nextTheme = resolvedTheme === "light" ? "dark" : "light"

        if (!buttonRef.current) {
            setTheme(nextTheme)
            return
        }

        const rect = buttonRef.current.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        // Max radius to cover entire viewport from click point
        const maxRadius = Math.ceil(
            Math.sqrt(
                Math.max(x, window.innerWidth - x) ** 2 +
                Math.max(y, window.innerHeight - y) ** 2
            )
        )

        // Create expanding overlay in the NEW theme color
        const overlay = document.createElement("div")
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 55;
            pointer-events: none;
            background-color: ${nextTheme === "dark" ? "#0f172a" : "#f8fafc"};
            clip-path: circle(0px at ${x}px ${y}px);
            transition: clip-path 500ms cubic-bezier(0.4, 0, 0.2, 1);
        `
        document.body.appendChild(overlay)

        // Start expansion
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`
            })
        })

        // Switch theme while overlay covers everything (no blank flash)
        setTimeout(() => {
            setTheme(nextTheme)
        }, 300)

        // Fade out overlay after theme has applied
        setTimeout(() => {
            overlay.style.transition = "opacity 200ms ease-out"
            overlay.style.opacity = "0"
        }, 550)

        // Remove overlay
        setTimeout(() => {
            overlay.remove()
        }, 800)
    }

    return (
        <Button
            ref={buttonRef}
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className={cn(
                "relative rounded-full w-10 h-10 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 backdrop-blur-sm z-[60]",
                className
            )}
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-400" />
            <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-electric-blue" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
