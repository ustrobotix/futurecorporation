"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Rocket, CheckCircle2, AlertCircle, Send } from "lucide-react"

type FormStatus = "idle" | "loading" | "success" | "error"

export function ContactForm() {
    const [formStatus, setFormStatus] = useState<FormStatus>("idle")
    const [errorMessage, setErrorMessage] = useState("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormStatus("loading")
        setErrorMessage("")

        // Simulate network request for 1.5 seconds to show loading state
        // In real app, remove setTimeout and use actual fetch
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock success
        setFormStatus("success")
    }

    return (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden min-h-[480px] flex flex-col justify-center">

            <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center text-center absolute inset-0 z-20"
                    >
                        {/* Rocket Animation */}
                        <motion.div
                            initial={{ y: 100, x: 0, opacity: 0, scale: 0.5, rotate: 45 }}
                            animate={{
                                y: [100, -300],
                                x: [0, 300],
                                opacity: [0, 1, 1, 0],
                                scale: [0.5, 1.5, 1.5, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                times: [0, 0.2, 0.8, 1],
                                ease: "easeIn"
                            }}
                            className="absolute"
                        >
                            <Rocket size={80} className="text-electric-blue fill-current" />
                            {/* Rocket Trail */}
                            <motion.div
                                className="w-2 h-20 bg-gradient-to-t from-transparent to-electric-blue mx-auto mt-2 blur-sm origin-top"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 60, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                style={{ transform: "rotate(0deg)" }} // Trail follows rocket
                            />
                        </motion.div>

                        {/* Success Message Reveal (Delay to wait for rocket) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                            className="relative z-10"
                        >
                            <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-electric-blue/20">
                                <CheckCircle2 className="w-8 h-8 text-electric-blue" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Our team is already analyzing your request.</p>
                            <Button
                                variant="outline"
                                onClick={() => setFormStatus("idle")}
                                className="border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10"
                            >
                                Send Another
                            </Button>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                            Send a Message
                        </h3>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Your name"
                                        className="w-full bg-surface/50 dark:bg-white/5 border border-foreground/10 rounded-lg px-4 py-3 text-foreground placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition-all font-sans"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full bg-surface/50 dark:bg-white/5 border border-foreground/10 rounded-lg px-4 py-3 text-foreground placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition-all font-sans"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full bg-surface/50 dark:bg-white/5 border border-foreground/10 rounded-lg px-4 py-3 text-foreground placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition-all resize-none font-sans"
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={formStatus === "loading"}
                                className="w-full bg-[#2596be] text-[#0f172a] hover:bg-[#2596be]/90 font-bold py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(37,150,190,0.3)] hover:shadow-[0_0_30px_rgba(37,150,190,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {formStatus === "loading" ? (
                                        "Initializing Uplink..."
                                    ) : (
                                        <>
                                            SEND TRANSMISSION <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
