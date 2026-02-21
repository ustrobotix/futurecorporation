import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-none text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest",
    {
        variants: {
            variant: {
                default:
                    "bg-electric-blue text-navy-900 hover:bg-electric-blue/90 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] border border-transparent",
                outline:
                    "border border-electric-blue text-electric-blue hover:bg-electric-blue/10 backdrop-blur-sm",
                ghost: "hover:bg-foreground/5 text-foreground hover:text-electric-blue",
                link: "text-electric-blue underline-offset-4 hover:underline",
                premium:
                    "bg-transparent border border-electric-blue text-electric-blue relative overflow-hidden group hover:bg-electric-blue hover:text-white transition-all duration-500 shadow-[0_0_10px_rgba(37,150,190,0.1)]",
            },
            size: {
                default: "h-12 px-6 sm:px-8 py-2",
                sm: "h-9 px-4",
                lg: "h-12 sm:h-14 px-8 sm:px-10 text-sm sm:text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends Omit<HTMLMotionProps<"button">, "variant" | "size">,
    VariantProps<typeof buttonVariants> {
    children?: React.ReactNode
    variant?: VariantProps<typeof buttonVariants>["variant"]
    size?: VariantProps<typeof buttonVariants>["size"]
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, children, ...props }, ref) => {
        const isPremium = variant === "premium"

        return (
            <motion.button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {isPremium && (
                    <>
                        <span className="absolute inset-0 bg-electric-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <span className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,243,255,0.1)]" />
                    </>
                )}
                <span className="relative z-10 flex items-center gap-2">{children}</span>
            </motion.button>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
