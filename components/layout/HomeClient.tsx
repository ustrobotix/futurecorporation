"use client"

import React, { useState, Suspense } from "react"
import { AnimatePresence } from "framer-motion"
import { LoadingScreen } from "@/components/layout/LoadingScreen"
import { Hero } from "@/components/layout/Hero"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import { WebGLFallback } from "@/components/three/WebGLFallback"
import dynamic from "next/dynamic"

// Lazy-load the heavy 3D component — never SSR it
const Hero3D = dynamic(
    () => import("@/components/three/Hero3D").then((mod) => ({ default: mod.Hero3D })),
    {
        ssr: false,
        loading: () => <WebGLFallback />,
    }
)

/**
 * Client-side orchestration: loading screen → hero with 3D.
 * Separated from page.tsx so static sections remain server-rendered.
 */
export function HomeClient() {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {!isLoading && (
                <Hero>
                    <ErrorBoundary fallback={<WebGLFallback />}>
                        <Suspense fallback={<WebGLFallback />}>
                            <Hero3D />
                        </Suspense>
                    </ErrorBoundary>
                </Hero>
            )}
        </>
    )
}
