"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Play } from "lucide-react"

interface HeroProps {
    children?: React.ReactNode
}

export function Hero({ children }: HeroProps) {
    return (
        <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20">
            {/* 3D Scene Background (Injected) */}
            <div className="absolute inset-0 z-0">
                {children}
            </div>

            {/* Content Container (Asymmetric Editorial Layout) */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center h-full">

                {/* Text Content (Left - Col 7) */}
                <div className="lg:col-span-7 flex flex-col justify-center">

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-electric-blue" />
                        <span className="text-electric-blue font-mono text-sm tracking-[0.2em] section-eyebrow">
                            ENGINEERING THE FUTURE
                        </span>
                    </motion.div>

                    {/* Headline (Staggered Reveal) */}
                    <div className="overflow-hidden mb-6">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground leading-[0.9] text-balance font-sans"
                        >
                            AUTONOMOUS <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-500">
                                INTELLIGENCE
                            </span>
                        </motion.h1>
                    </div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                        className="text-lg/relaxed sm:text-xl/relaxed text-gray-500 dark:text-gray-400 max-w-2xl mb-10 font-sans"
                    >
                        We build the neural infrastructure for the next generation of robotics.
                        Precision engineering meets adaptive AI for industrial-grade automation.
                    </motion.p>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.8 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <a href="#contact">
                            <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-xl shadow-[#2596be]/20 hover:shadow-[#2596be]/40 transition-shadow bg-[#2596be] text-[#0f172a] hover:bg-[#2596be]/90 border-transparent">
                                Deploy Solution <ArrowRight className="w-5 h-5" />
                            </Button>
                        </a>
                        <Button
                            variant="premium"
                            size="lg"
                            className="rounded-full px-8 h-14 text-base font-semibold border-[#2596be] text-[#2596be] hover:bg-[#2596be] hover:text-white"
                        >
                            Watch Showreel <Play className="w-4 h-4 fill-current" />
                        </Button>
                    </motion.div>
                </div>

                {/* Right Side (Visual Balance / Interaction Zone) */}
                <div className="lg:col-span-5 hidden lg:block h-full relative pointer-events-none">
                    {/* Placeholder for future UI overlays if needed */}
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
            >
                <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-electric-blue to-transparent" />
            </motion.div>
        </section>
    )
}
