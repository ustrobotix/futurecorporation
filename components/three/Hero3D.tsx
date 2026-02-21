"use client"

import React, { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Float, ContactShadows, RoundedBox, Cylinder, Sphere } from "@react-three/drei"
import { useTheme } from "next-themes"
import * as THREE from "three"

// --- Responsive Camera Controller ---
function ResponsiveCamera() {
    const { camera, size } = useThree()

    useEffect(() => {
        const isMobile = size.width < 768
        if (isMobile) {
            camera.position.set(0, 1, 13)
                ; (camera as THREE.PerspectiveCamera).fov = 38
        } else {
            camera.position.set(0, 2, 12)
                ; (camera as THREE.PerspectiveCamera).fov = 35
        }
        ; (camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    }, [camera, size.width])

    return null
}

// --- Robotic Arm Component ---
function RoboticArm() {
    const { resolvedTheme } = useTheme()
    const isLight = resolvedTheme === "light"
    const { size } = useThree()
    const isMobile = size.width < 768

    // Materials
    const mainMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: isLight ? "#e2e8f0" : "#1e293b",
        roughness: 0.2,
        metalness: 0.8,
    }), [isLight])

    const jointMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#2596be",
        roughness: 0.4,
        metalness: 0.5,
        emissive: "#2596be",
        emissiveIntensity: 0.5
    }), [])

    const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#0f172a",
        roughness: 0.1,
        metalness: 1,
    }), [])

    // Refs for animation
    const arm1Ref = useRef<THREE.Group>(null)
    const arm2Ref = useRef<THREE.Group>(null)
    const headRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        // Idle Animation - Engineering Precision
        if (arm1Ref.current) {
            arm1Ref.current.rotation.y = Math.sin(t * 0.2) * 0.2
        }
        if (arm2Ref.current) {
            arm2Ref.current.rotation.z = Math.sin(t * 0.5) * 0.1 - 0.2
        }
        // WAVING ANIMATION
        if (headRef.current) {
            headRef.current.rotation.z = Math.sin(t * 3) * 0.5
            headRef.current.rotation.x = Math.sin(t * 1) * 0.2
        }
    })

    // Responsive positioning: center on mobile, right-offset on desktop
    const groupPosition: [number, number, number] = isMobile ? [1.5, -2.0, 0] : [3, -3, 0]
    const groupScale = isMobile ? 0.75 : 1

    return (
        <group position={groupPosition} rotation={[0, -0.5, 0]} scale={groupScale}>
            {/* Base */}
            <Cylinder args={[1, 1.2, 0.5, 32]} material={accentMaterial} position={[0, 0.25, 0]} />
            <RoundedBox args={[1.5, 0.2, 1.5]} radius={0.05} smoothness={4} material={mainMaterial} position={[0, 0.1, 0]} />

            {/* Turret */}
            <group ref={arm1Ref}>
                <Cylinder args={[0.8, 0.8, 0.8, 32]} material={mainMaterial} position={[0, 0.8, 0]} />

                {/* Joint 1 */}
                <Sphere args={[0.5, 32, 32]} material={jointMaterial} position={[0, 1.2, 0]} />

                {/* Arm Segment 1 */}
                <group position={[0, 1.2, 0]} rotation={[0, 0, 0.2]}>
                    <RoundedBox args={[0.4, 2.5, 0.4]} radius={0.1} smoothness={4} material={mainMaterial} position={[0, 1.25, 0]}>
                        <meshStandardMaterial color={isLight ? "#cbd5e1" : "#334155"} roughness={0.3} metalness={0.7} />
                    </RoundedBox>

                    {/* Joint 2 */}
                    <Sphere args={[0.4, 32, 32]} material={jointMaterial} position={[0, 2.5, 0]} />

                    {/* Arm Segment 2 */}
                    <group ref={arm2Ref} position={[0, 2.5, 0]} rotation={[0, 0, -0.5]}>
                        <RoundedBox args={[0.3, 2, 0.3]} radius={0.05} smoothness={4} material={mainMaterial} position={[0, 1, 0]} />

                        {/* Head Joint */}
                        <Sphere args={[0.3, 32, 32]} material={jointMaterial} position={[0, 2, 0]} />

                        {/* Head/Hand (Waving) */}
                        <group ref={headRef} position={[0, 2, 0]} rotation={[0, 0, 0.5]}>
                            {/* Wrist */}
                            <RoundedBox args={[0.5, 0.6, 0.8]} radius={0.1} smoothness={4} material={accentMaterial} position={[0, 0.3, 0]} />

                            {/* Claw/Fingers for Wave Visibility */}
                            <group position={[0, 0.6, 0]}>
                                <RoundedBox args={[0.1, 0.6, 0.1]} radius={0.02} smoothness={4} material={jointMaterial} position={[-0.15, 0.3, 0]} rotation={[0, 0, 0.2]} />
                                <RoundedBox args={[0.1, 0.7, 0.1]} radius={0.02} smoothness={4} material={jointMaterial} position={[0, 0.35, 0]} />
                                <RoundedBox args={[0.1, 0.6, 0.1]} radius={0.02} smoothness={4} material={jointMaterial} position={[0.15, 0.3, 0]} rotation={[0, 0, -0.2]} />
                            </group>

                            {/* Sensor Eye */}
                            <Cylinder args={[0.15, 0.15, 0.2]} material={jointMaterial} rotation={[1.57, 0, 0]} position={[0, 0.3, 0.4]} />
                        </group>
                    </group>
                </group>
            </group>
        </group>
    )
}

// --- Main Scene ---
export function Hero3D() {
    const { resolvedTheme } = useTheme()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    return (
        <div className="absolute inset-0 z-0 bg-transparent min-h-[50vh] pointer-events-none">
            <Canvas
                dpr={isMobile ? [1, 1.5] : [1, 1.25]}
                camera={{ position: [0, 2, 12], fov: 35 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                performance={{ min: 0.5 }}
                style={{ pointerEvents: 'none' }}
            >
                <ResponsiveCamera />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow={!isMobile} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2596be" />

                {isMobile ? (
                    <RoboticArm />
                ) : (
                    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                        <RoboticArm />
                    </Float>
                )}

                {/* Ground Reflections - skip on mobile */}
                {!isMobile && (
                    <ContactShadows resolution={512} scale={20} blur={2.5} opacity={0.5} far={10} color={resolvedTheme === 'dark' ? '#000000' : '#a1a1aa'} />
                )}

                <Environment preset="city" />
            </Canvas>
        </div>
    )
}

