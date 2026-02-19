"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Menu, X, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
    { name: "Services", href: "#services" },
    { name: "Impact", href: "#impact" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const { scrollY } = useScroll()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20)
    })

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Ease Out Expo
            >
                <motion.div
                    className={cn(
                        "transition-all duration-500 ease-out-expo flex items-center justify-between",
                        isScrolled
                            ? "w-[95%] max-w-5xl glass-panel rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-2xl shadow-black/5"
                            : "w-full max-w-7xl px-6 py-4 bg-transparent border-transparent shadow-none"
                    )}
                >
                    {/* Logo Identity */}
                    <Link href="/" className="flex items-center gap-3 group relative z-10" aria-label="Future Corporation">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 group-hover:border-electric-blue/50 transition-colors bg-surface shadow-lg">
                            <img src="/logo.jpg" alt="FC" className="object-cover w-full h-full" />
                        </div>
                        <span className={cn(
                            "text-lg font-bold tracking-tight transition-colors duration-300 font-sans",
                            isScrolled ? "text-foreground" : "text-foreground"
                        )}>
                            FUTURE<span className="text-electric-blue">CORP</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation (Engineered Layout) */}
                    <nav className="hidden md:flex items-center gap-1 bg-surface/50 dark:bg-black/20 rounded-full px-2 py-1 backdrop-blur-md border border-black/5 dark:border-white/5">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative hover:text-electric-blue hover:bg-electric-blue/5",
                                    pathname === item.href ? "text-electric-blue bg-electric-blue/10" : "text-slate-700 dark:text-gray-300"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions Area */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle className={cn("transition-transform hover:rotate-12", isScrolled ? "scale-90" : "scale-100")} />

                        <a href="#contact" className="hidden sm:block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "relative overflow-hidden rounded-full font-sans font-medium transition-all duration-300 group flex items-center gap-2",
                                    isScrolled
                                        ? "h-9 px-5 bg-electric-blue text-navy-900 shadow-lg hover:shadow-electric-blue/50"
                                        : "h-10 px-6 glass-panel border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10 hover:border-electric-blue hover:text-white hover:shadow-[0_0_20px_rgba(37,150,190,0.3)]"
                                )}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </span>
                                {/* Shine effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                            </motion.button>
                        </a>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-foreground p-2 hover:bg-foreground/5 rounded-full transition-colors relative z-50"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </motion.div>
            </motion.header>

            {/* Mobile Menu Overlay (Engineered Glass) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-background/80 md:hidden flex flex-col items-center justify-center"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-bold font-sans text-foreground hover:text-electric-blue transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
