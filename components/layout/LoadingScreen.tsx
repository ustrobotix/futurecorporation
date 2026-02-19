"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        // Engineered progress curve (fast start, slow end)
        const duration = 2500 // 2.5s total load
        const startTime = Date.now()

        const frame = () => {
            const now = Date.now()
            const elapsed = now - startTime
            const rawProgress = Math.min(elapsed / duration, 1)

            // Ease out expo formula for premium feel
            const eased = rawProgress === 1 ? 1 : 1 - Math.pow(2, -10 * rawProgress)

            setProgress(eased * 100)

            if (rawProgress < 1) {
                requestAnimationFrame(frame)
            } else {
                setIsComplete(true)
                setTimeout(onComplete, 800) // Wait for exit animation
            }
        }

        requestAnimationFrame(frame)
    }, [onComplete])

    const circumference = 2 * Math.PI * 50 // Circle radius 50
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900 overflow-hidden"
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Curtain ease
                    }}
                >
                    {/* Background Grid (Subtle Engineering Feel) */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px"
                        }}
                    />

                    <div className="relative flex flex-col items-center justify-center">
                        {/* Circular Progress Ring */}
                        <svg className="w-64 h-64 transform -rotate-90 pointer-events-none absolute" viewBox="0 0 120 120">
                            {/* Track */}
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke="rgba(37, 150, 190, 0.1)"
                                strokeWidth="1"
                            />
                            {/* Indicator */}
                            <motion.circle
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke="#2596be"
                                strokeWidth="2"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </svg>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute z-10 w-28 h-28 rounded-full overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(37,150,190,0.2)]"
                        >
                            <img src="/logo.jpg" alt="FC Logo" className="w-full h-full object-cover opacity-90" />
                        </motion.div>

                        {/* Text Status */}
                        <motion.div
                            className="mt-12 font-mono text-electric-blue text-xs tracking-[0.2em] uppercase"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            System Initializing <span className="inline-block w-4 text-left">
                                {progress < 100 ? "..." : ""}
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
