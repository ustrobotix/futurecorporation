"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme()
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    const handleToggle = async () => {
        const nextTheme = resolvedTheme === "light" ? "dark" : "light"

        // If View Transitions API is not supported, just switch instantly
        if (
            !buttonRef.current ||
            !(document as any).startViewTransition
        ) {
            setTheme(nextTheme)
            return
        }

        const rect = buttonRef.current.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        // Max radius to cover entire viewport
        const maxRadius = Math.ceil(
            Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            )
        )

        // Inject dynamic keyframes for the circle expansion from the button position
        const styleId = "theme-transition-style"
        let styleEl = document.getElementById(styleId) as HTMLStyleElement | null
        if (!styleEl) {
            styleEl = document.createElement("style")
            styleEl.id = styleId
            document.head.appendChild(styleEl)
        }
        styleEl.textContent = `
            ::view-transition-old(root),
            ::view-transition-new(root) {
                animation: none;
                mix-blend-mode: normal;
            }
            ::view-transition-old(root) {
                z-index: 1;
            }
            ::view-transition-new(root) {
                z-index: 9999;
                clip-path: circle(0px at ${x}px ${y}px);
                animation: themeExpand 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            @keyframes themeExpand {
                to {
                    clip-path: circle(${maxRadius}px at ${x}px ${y}px);
                }
            }
        `

        // Start the view transition — browser captures old state, we switch theme, then it animates
        const transition = (document as any).startViewTransition(() => {
            setTheme(nextTheme)
        })

        // Clean up the style after animation finishes
        transition.finished.then(() => {
            styleEl?.remove()
        })
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
