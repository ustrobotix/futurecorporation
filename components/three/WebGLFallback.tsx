/**
 * Static fallback for when WebGL is unavailable or the 3D scene crashes.
 * Mimics the particle aesthetic with pure CSS gradients.
 * This is a SERVER component — no "use client" needed.
 */
export function WebGLFallback() {
    return (
        <div className="absolute inset-0 -z-10 bg-navy-900 overflow-hidden">
            {/* Mimic particle glow with radial gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-electric-blue/5 blur-[120px]" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-electric-blue/3 blur-[80px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-electric-blue-dim/5 blur-[60px]" />

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,243,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    )
}
