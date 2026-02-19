"use client"

import Link from "next/link"
import { Instagram, Linkedin, Sparkles } from "lucide-react"

const footerLinks = {
    company: [
        { name: "About Us", href: "#about" },
        { name: "Impact", href: "#impact" },
        { name: "Contact", href: "#contact" },
    ],
    services: [
        { name: "School Partnerships", href: "#services" },
        { name: "Robotics Labs", href: "#services" },
        { name: "AI Training", href: "#services" },
        { name: "Consultation", href: "#services" },
    ],
}

const CURRENT_YEAR = 2026 // Static to prevent hydration mismatch

export function Footer() {
    return (
        <footer className="bg-background border-t border-border pt-16 sm:pt-20 pb-8 sm:pb-10 relative overflow-hidden transition-colors duration-300">
            {/* Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] bg-electric-blue/5 blur-[100px] -z-10" />

            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6 sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2" aria-label="Future Corporation Home">
                            <div className="w-8 h-8 bg-electric-blue rounded flex items-center justify-center">
                                <span className="text-navy-900 font-bold text-sm">FC</span>
                            </div>
                            <span className="text-xl font-bold tracking-wider text-foreground">
                                FUTURE<span className="text-electric-blue">CORP</span>
                            </span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Transforming learning through robotics, AI, and next-generation
                            technology. Empowering the innovators of tomorrow.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.linkedin.com/company/future-corporation-in/posts/?feedView=all"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-foreground hover:bg-electric-blue hover:text-navy-900 transition-all duration-300"
                                aria-label="Follow us on LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="https://www.instagram.com/futurecorpjsr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-foreground hover:bg-electric-blue hover:text-navy-900 transition-all duration-300"
                                aria-label="Follow us on Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-foreground font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                            Company <Sparkles size={14} className="text-electric-blue" />
                        </h3>
                        <ul className="space-y-3 sm:space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-electric-blue text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h3 className="text-foreground font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                            Services <Sparkles size={14} className="text-electric-blue" />
                        </h3>
                        <ul className="space-y-3 sm:space-y-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-electric-blue text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-foreground font-semibold mb-4 sm:mb-6">Stay Updated</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter for the latest in robotics and AI
                            education.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="footer-email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="footer-email"
                                type="email"
                                placeholder="Enter your email"
                                className="bg-surface/50 dark:bg-white/5 border border-border dark:border-white/10 rounded px-3 sm:px-4 py-2 text-sm text-foreground focus:outline-none focus:border-electric-blue w-full"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-electric-blue text-navy-900 px-4 py-2 rounded text-sm font-semibold hover:bg-electric-blue-dim transition-colors whitespace-nowrap"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-border pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 dark:text-gray-500 text-sm">
                        © {CURRENT_YEAR} Future Corporation. All rights reserved.
                    </p>
                    <div className="flex gap-6 sm:gap-8">
                        <a
                            href="tel:+917319677613"
                            className="text-gray-600 dark:text-gray-500 hover:text-foreground text-sm transition-colors"
                        >
                            +91 7319677613
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
