"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        const duration = 2500
        const startTime = Date.now()

        const frame = () => {
            const now = Date.now()
            const elapsed = now - startTime
            const rawProgress = Math.min(elapsed / duration, 1)
            const eased = rawProgress === 1 ? 1 : 1 - Math.pow(2, -10 * rawProgress)

            setProgress(eased * 100)

            if (rawProgress < 1) {
                requestAnimationFrame(frame)
            } else {
                setIsComplete(true)
                setTimeout(onComplete, 800)
            }
        }

        requestAnimationFrame(frame)
    }, [onComplete])

    const circumference = 2 * Math.PI * 62
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: '#0f172a' }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Animated Background Grid */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.03 }}
                        transition={{ duration: 1 }}
                        style={{
                            backgroundImage: `linear-gradient(rgba(37,150,190,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(37,150,190,0.15) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px"
                        }}
                    />

                    {/* Radial Glow Behind Logo */}
                    <motion.div
                        className="absolute"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{
                            width: 400,
                            height: 400,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(37,150,190,0.12) 0%, transparent 70%)',
                        }}
                    />

                    {/* Main Content — stacked vertically, no overlap */}
                    <div className="flex flex-col items-center gap-8">

                        {/* Logo + Ring Container */}
                        <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
                            {/* Outer Rotating Ring */}
                            <motion.div
                                className="absolute inset-0"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                style={{
                                    borderRadius: '50%',
                                    border: '1px solid rgba(37,150,190,0.15)',
                                }}
                            />

                            {/* Progress Ring */}
                            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                                {/* Track */}
                                <circle
                                    cx="70" cy="70" r="62"
                                    fill="none"
                                    stroke="rgba(37, 150, 190, 0.08)"
                                    strokeWidth="1.5"
                                />
                                {/* Animated Progress */}
                                <motion.circle
                                    cx="70" cy="70" r="62"
                                    fill="none"
                                    stroke="#2596be"
                                    strokeWidth="2.5"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                    style={{ filter: 'drop-shadow(0 0 6px rgba(37,150,190,0.5))' }}
                                />
                            </svg>

                            {/* Logo */}
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="relative rounded-full overflow-hidden flex items-center justify-center"
                                style={{
                                    width: 120,
                                    height: 120,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(12px)',
                                    boxShadow: '0 0 40px rgba(37,150,190,0.2), inset 0 0 30px rgba(37,150,190,0.05)',
                                }}
                            >
                                <img src="/logo.jpg" alt="FC Logo" className="w-full h-full object-cover" style={{ opacity: 0.95 }} />
                            </motion.div>
                        </div>

                        {/* Text Section — clearly below the ring */}
                        <div className="flex flex-col items-center gap-3">
                            {/* System Status Text */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="flex items-center gap-2"
                            >
                                <span
                                    className="font-mono text-xs tracking-[0.25em] uppercase"
                                    style={{ color: '#2596be' }}
                                >
                                    System Initializing
                                </span>
                                {progress < 100 && (
                                    <motion.span
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                        style={{ color: '#2596be' }}
                                    >
                                        ●
                                    </motion.span>
                                )}
                            </motion.div>

                            {/* Progress Percentage */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="font-mono text-2xl font-bold tracking-wider"
                                style={{ color: 'rgba(37,150,190,0.7)' }}
                            >
                                {Math.round(progress)}%
                            </motion.div>

                            {/* Animated Progress Bar */}
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="relative overflow-hidden rounded-full"
                                style={{
                                    width: 200,
                                    height: 2,
                                    background: 'rgba(37,150,190,0.1)',
                                }}
                            >
                                <motion.div
                                    className="absolute left-0 top-0 h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, #2596be, #00f3ff)',
                                        boxShadow: '0 0 10px rgba(37,150,190,0.5)',
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
