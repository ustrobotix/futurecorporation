"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/lib/useReducedMotion"
import Image from "next/image"

function Counter({
    value,
    label,
    suffix = "",
}: {
    value: number
    label: string
    suffix?: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-100px" })
    const prefersReduced = useReducedMotion()
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
    const display = useTransform(spring, (current) =>
        Math.round(current).toLocaleString()
    )

    useEffect(() => {
        if (inView) {
            if (prefersReduced) {
                spring.jump(value) // Instant, no animation
            } else {
                spring.set(value)
            }
        }
    }, [inView, spring, value, prefersReduced])

    return (
        <div
            ref={ref}
            className="text-center p-4 sm:p-6 glass-panel rounded-xl group hover:bg-foreground/5 transition-colors"
        >
            <motion.div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 font-mono tabular-nums">
                <motion.span>{display}</motion.span>
                <span className="text-electric-blue">{suffix}</span>
            </motion.div>
            <p className="text-gray-400 uppercase tracking-widest text-xs sm:text-sm font-medium">
                {label}
            </p>
        </div>
    )
}

const stats = [
    { value: 10450, label: "Students Trained", suffix: "+" },
    { value: 15, label: "Partner Schools", suffix: "+" },
    { value: 1500, label: "Projects Completed", suffix: "+" },
    { value: 3000, label: "Training Hours", suffix: "+" },
]

export function ImpactStatistics() {
    return (
        <section
            id="impact"
            className="py-16 sm:py-20 lg:py-24 relative bg-background border-y border-foreground/5 overflow-hidden transition-colors duration-300"
            aria-label="Impact Statistics"
        >
            {/* Background Image - Students */}
            <div className="absolute inset-0 z-0 opacity-15 dark:opacity-20 pointer-events-none">
                <Image
                    src="/images/students.jpg"
                    alt="Students Learning Robotics"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                    {stats.map((stat) => (
                        <Counter key={stat.label} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    )
}
