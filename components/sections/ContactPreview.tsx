"use client"

import React from "react"
import { motion } from "framer-motion"
import { Phone, MessageSquare, Mail, Instagram, Linkedin } from "lucide-react"
import { useReducedMotion } from "@/lib/useReducedMotion"
import { ContactForm } from "@/components/features/ContactForm"
import Image from "next/image"

export function ContactPreview() {
    const prefersReduced = useReducedMotion()

    return (
        <section
            id="contact"
            className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-background border-t border-foreground/5 transition-colors duration-300"
            aria-label="Contact Us"
        >
            {/* Background Image - Labs */}
            <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
                <Image
                    src="/images/labs.jpg"
                    alt="Future Corporation Labs"
                    fill
                    className="object-cover grayscale mix-blend-overlay dark:mix-blend-normal"
                    sizes="100vw"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={prefersReduced ? undefined : { opacity: 0, x: -50 }}
                        whileInView={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block px-3 py-1 rounded-full border border-electric-blue/30 bg-electric-blue/5 backdrop-blur-sm mb-4 sm:mb-6">
                            <span className="text-electric-blue text-xs font-mono tracking-widest uppercase">
                                Get in Touch
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                            READY TO{" "}
                            <span className="text-electric-blue">TRANSFORM</span> THE FUTURE?
                        </h2>
                        <p className="text-black dark:text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-md font-bold">
                            Connect with us to discuss partnerships, robotics lab creation, or
                            student training programs.
                        </p>

                        <div className="space-y-4 sm:space-y-6">
                            <a
                                href="tel:+917319677613"
                                className="flex items-center gap-3 sm:gap-4 text-black dark:text-gray-300 hover:text-electric-blue transition-colors group font-bold"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 glass-panel rounded-full flex items-center justify-center group-hover:border-electric-blue/50 transition-colors shrink-0 group-hover:text-electric-blue border border-black/5 dark:border-white/10 text-black dark:text-white">
                                    <Phone size={18} />
                                </div>
                                <span className="text-base sm:text-lg">+91 7319677613</span>
                            </a>
                            <a
                                href="https://wa.me/917319677613"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 sm:gap-4 text-black dark:text-gray-300 hover:text-electric-blue transition-colors group font-bold"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 glass-panel rounded-full flex items-center justify-center group-hover:border-electric-blue/50 transition-colors shrink-0 group-hover:text-electric-blue border border-black/5 dark:border-white/10 text-black dark:text-white">
                                    <MessageSquare size={18} />
                                </div>
                                <span className="text-base sm:text-lg">WhatsApp Us</span>
                            </a>
                            <a
                                href="mailto:contact@futurecorp.ai"
                                className="flex items-center gap-3 sm:gap-4 text-black dark:text-gray-300 hover:text-electric-blue transition-colors group font-bold"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 glass-panel rounded-full flex items-center justify-center group-hover:border-electric-blue/50 transition-colors shrink-0 group-hover:text-electric-blue border border-black/5 dark:border-white/10 text-black dark:text-white">
                                    <Mail size={18} />
                                </div>
                                <span className="text-base sm:text-lg">contact@futurecorp.ai</span>
                            </a>
                        </div>

                        <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">
                            <a
                                href="https://www.instagram.com/futurecorpjsr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 glass-panel rounded-lg hover:bg-electric-blue hover:text-navy-900 transition-all duration-300 text-foreground"
                                aria-label="Follow us on Instagram"
                            >
                                <Instagram size={22} />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/future-corporation-in/posts/?feedView=all"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 glass-panel rounded-lg hover:bg-electric-blue hover:text-navy-900 transition-all duration-300 text-foreground"
                                aria-label="Follow us on LinkedIn"
                            >
                                <Linkedin size={22} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={prefersReduced ? undefined : { opacity: 0, x: 50 }}
                        whileInView={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
