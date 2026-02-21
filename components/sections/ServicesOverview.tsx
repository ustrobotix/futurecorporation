"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/GlassCard"
import { Microscope, Bot, BrainCircuit, GraduationCap, Users } from "lucide-react"
import { useReducedMotion } from "@/lib/useReducedMotion"
import Image from "next/image"

const services = [
    {
        icon: Users,
        title: "School Partnerships",
        description:
            "Collaborating with educational institutions to integrate advanced robotics curricula.",
    },
    {
        icon: Microscope,
        title: "Robotics Lab Creation",
        description:
            "Designing and building state-of-the-art robotics labs for hands-on learning.",
    },
    {
        icon: BrainCircuit,
        title: "AI Training Programs",
        description:
            "Comprehensive courses on Artificial Intelligence, Machine Learning, and Neural Networks.",
    },
    {
        icon: GraduationCap,
        title: "Career Upskilling",
        description:
            "Professional development programs to bridge the gap between academia and industry.",
    },
    {
        icon: Bot,
        title: "Consultation",
        description:
            "Expert guidance on implementing robotics solutions and educational frameworks.",
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function ServicesOverview() {
    const prefersReduced = useReducedMotion()

    return (
        <section id="services" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-background transition-colors duration-300" aria-label="Our Services">
            {/* Background Image - Sahayika AI */}
            <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none">
                <Image
                    src="/images/sahayika.jpg"
                    alt="Sahayika AI Background"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
                    whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
                        <span className="text-electric-blue">PIONEERING</span> THE FUTURE
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg px-2">
                        We provide a comprehensive ecosystem for robotics and AI education,
                        from lab infrastructure to advanced curriculum.
                    </p>
                </motion.div>

                <motion.div
                    variants={prefersReduced ? undefined : containerVariants}
                    initial={prefersReduced ? undefined : "hidden"}
                    whileInView={prefersReduced ? undefined : "visible"}
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                >
                    {services.map((service) => (
                        <motion.div key={service.title} variants={prefersReduced ? undefined : cardVariants}>
                            <GlassCard
                                className="group hover:bg-foreground/5 transition-colors duration-300 border border-foreground/10 hover:border-electric-blue/30 h-full"
                                disableAnimation
                            >
                                <div className="mb-4 sm:mb-6 w-10 h-10 sm:w-12 sm:h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center group-hover:bg-electric-blue group-hover:text-navy-900 transition-all duration-300">
                                    <service.icon
                                        size={20}
                                        className="text-electric-blue group-hover:text-navy-900 transition-colors sm:w-6 sm:h-6"
                                    />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-electric-blue transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed group-hover:text-foreground transition-colors">
                                    {service.description}
                                </p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
