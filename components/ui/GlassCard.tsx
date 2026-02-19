import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"
import React from "react"

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    className?: string
    gradient?: boolean
    disableAnimation?: boolean
}

export function GlassCard({
    children,
    className,
    gradient = false,
    disableAnimation = false,
    ...props
}: GlassCardProps) {
    return (
        <motion.div
            initial={disableAnimation ? undefined : { opacity: 0, y: 20 }}
            whileInView={disableAnimation ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={disableAnimation ? undefined : { duration: 0.5 }}
            className={cn(
                "glass-panel rounded-xl p-4 sm:p-6 relative overflow-hidden group",
                gradient && "bg-gradient-to-br from-white/5 to-white/0",
                className
            )}
            {...props}
        >
            {/* Dynamic Glow Effect on Hover */}
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-electric-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

            <div className="relative z-10">{children}</div>
        </motion.div>
    )
}
