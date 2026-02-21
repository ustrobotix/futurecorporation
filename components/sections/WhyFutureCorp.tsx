"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { useReducedMotion } from "@/lib/useReducedMotion"
import Image from "next/image"

const benefits = [
    "Industrial-Grade Curriculum Design",
    "Hands-on Projects & Rapid Prototyping",
    "University & Industry Partnerships",
    "Career-Ready Skill Certification",
]

export function WhyFutureCorp() {
    const prefersReduced = useReducedMotion()

    return (
        <section id="about" className="py-16 sm:py-20 lg:py-24 bg-background relative transition-colors duration-300" aria-label="Why Future Corporation">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
                    {/* Left Col: Text */}
                    <motion.div
                        initial={prefersReduced ? undefined : { opacity: 0, x: -50 }}
                        whileInView={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-3 py-1 rounded-full border border-electric-blue/30 bg-electric-blue/10 backdrop-blur-sm mb-4 sm:mb-6">
                            <span className="text-electric-blue text-xs font-mono tracking-widest uppercase font-semibold">
                                Our Mission
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                            BUILDING THE <br className="hidden sm:block" />
                            <span className="text-foreground dark:text-electric-blue">INNOVATORS</span> OF TOMORROW
                        </h2>
                        <p className="text-slate-900 dark:text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed font-medium">
                            We bridge the gap between theoretical knowledge and real-world
                            application. Our programs are designed to empower students with the
                            skills needed to lead in the era of Industry 4.0.
                        </p>

                        <ul className="space-y-3 sm:space-y-4">
                            {benefits.map((benefit, i) => (
                                <motion.li
                                    key={i}
                                    initial={prefersReduced ? undefined : { opacity: 0, x: -20 }}
                                    whileInView={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 text-slate-900 dark:text-gray-300 text-sm sm:text-base font-bold"
                                >
                                    <CheckCircle2 className="text-electric-blue shrink-0 w-5 h-5" />
                                    {benefit}
                                </motion.li>
                            ))}
                        </ul>


                    </motion.div>

                    {/* Right Col: Visual */}
                    <motion.div
                        initial={prefersReduced ? undefined : { opacity: 0, scale: 0.9 }}
                        whileInView={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[350px] sm:h-[450px] lg:h-[600px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 glass-panel group shadow-2xl"
                    >
                        {/* Real Labs Image */}
                        <div className="absolute inset-0">
                            <Image
                                src="/images/trophies.jpg"
                                alt="Future Corporation Trophies & Awards"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>

                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-20">
                            <div className="glass-panel p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
                                <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">
                                    Award-Winning Excellence
                                </h4>
                                <p className="text-gray-200 text-xs sm:text-sm">
                                    Recognized globally for our contribution to robotics education and innovation.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
