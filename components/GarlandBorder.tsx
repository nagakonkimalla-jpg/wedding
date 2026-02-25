"use client";

import { useEffect, useRef, useState } from "react";

export default function GarlandBorder() {
    const [tileCount, setTileCount] = useState(0);
    const [thoranamCount, setThoranamCount] = useState(0);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const thoranamRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const scrollYRef = useRef(0);
    const velRef = useRef(0);
    const smoothVelRef = useRef(0);

    useEffect(() => {
        setTileCount(Math.ceil(window.innerHeight / 60) + 6);
        // Each thoranam tile is roughly square; at 150px height, ~150px wide
        // Use extra tiles + overflow hidden to cover full width with no gaps
        setThoranamCount(Math.ceil(window.innerWidth / 120) + 3);
    }, []);

    useEffect(() => {
        if (!tileCount || !thoranamCount) return;

        let prevY = window.scrollY;
        let prevT = performance.now();

        const onScroll = () => {
            const now = performance.now();
            const dt = Math.max(now - prevT, 1);
            const y = window.scrollY;
            velRef.current = (y - prevY) / dt;
            scrollYRef.current = y;
            prevY = y;
            prevT = now;
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        const loop = () => {
            // Smooth velocity with exponential approach + decay
            smoothVelRef.current += (velRef.current - smoothVelRef.current) * 0.06;
            velRef.current *= 0.97;

            const t = performance.now() / 1000;
            const sy = scrollYRef.current;
            const vAmp = Math.min(Math.abs(smoothVelRef.current) * 20, 12);

            // Thoranam — per-tile wind sway (horizontal traveling wave)
            if (thoranamRef.current) {
                const kids = thoranamRef.current.children;
                for (let i = 0; i < kids.length; i++) {
                    const phase = i * 0.45;
                    // Idle breeze — two sine waves for organic movement
                    const idleY =
                        Math.sin(t * 0.7 + phase) * 1.5 +
                        Math.sin(t * 1.4 + phase * 0.6) * 0.8;
                    // Slight rotation like hanging cloth in wind
                    const idleRot =
                        Math.sin(t * 0.9 + phase * 1.2) * 0.6;
                    // Scroll-driven ripple
                    const scrollWaveY = Math.sin(sy * 0.005 + phase) * vAmp * 0.4;
                    const scrollWaveRot = Math.sin(sy * 0.004 + phase) * vAmp * 0.15;

                    const dy = idleY + scrollWaveY;
                    const rot = idleRot + scrollWaveRot;
                    (kids[i] as HTMLElement).style.transform =
                        `translateY(${dy}px) rotate(${rot}deg)`;
                }
            }

            // Left garland — traveling wave
            if (leftColRef.current) {
                const kids = leftColRef.current.children;
                for (let i = 0; i < kids.length; i++) {
                    const phase = i * 0.55;
                    const idle =
                        Math.sin(t * 0.8 + phase) * 2.0 +
                        Math.sin(t * 1.6 + phase * 0.4) * 0.9;
                    const wave = Math.sin(sy * 0.007 + phase) * vAmp;
                    const dx = idle + wave;
                    (kids[i] as HTMLElement).style.transform =
                        `translateX(${dx}px) rotate(${dx * 0.3}deg)`;
                }
            }

            // Right garland — mirrored traveling wave
            if (rightColRef.current) {
                const kids = rightColRef.current.children;
                for (let i = 0; i < kids.length; i++) {
                    const phase = i * 0.55 + Math.PI;
                    const idle =
                        Math.sin(t * 0.8 + phase) * 2.0 +
                        Math.sin(t * 1.6 + phase * 0.4) * 0.9;
                    const wave = Math.sin(sy * 0.007 + phase) * vAmp;
                    const dx = idle + wave;
                    (kids[i] as HTMLElement).style.transform =
                        `scaleX(-1) translateX(${dx}px) rotate(${dx * 0.3}deg)`;
                }
            }

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafRef.current);
        };
    }, [tileCount, thoranamCount]);

    if (!tileCount || !thoranamCount) return null;

    return (
        <>
            {/* Thoranam — individual tiles for per-segment wind animation */}
            <div className="fixed top-0 left-0 right-0 z-[30] pointer-events-none overflow-hidden">
                <div
                    ref={thoranamRef}
                    className="flex w-[110%] -ml-[5%]"
                >
                    {Array.from({ length: thoranamCount }).map((_, i) => (
                        <img
                            key={i}
                            src="/assets/images/pelli/thoranam_unit_tile.png"
                            alt=""
                            className="flex-1 min-w-0 h-[90px] sm:h-[120px] md:h-[150px] object-cover will-change-transform mix-blend-multiply origin-top"
                            draggable={false}
                        />
                    ))}
                </div>
            </div>

            {/* Left vertical garland — no opacity on container so mix-blend-multiply works against page bg */}
            <div className="fixed top-[75px] sm:top-[100px] md:top-[125px] left-0 bottom-0 z-[25] pointer-events-none w-[45px] sm:w-[55px] md:w-[65px] overflow-hidden">
                <div ref={leftColRef} className="flex flex-col items-center">
                    {Array.from({ length: tileCount }).map((_, i) => (
                        <img
                            key={i}
                            src="/assets/images/pelli/garland_vertical_tile.png"
                            alt=""
                            className="w-full flex-shrink-0 will-change-transform mix-blend-multiply"
                            draggable={false}
                        />
                    ))}
                </div>
            </div>

            {/* Right vertical garland (mirrored) */}
            <div className="fixed top-[75px] sm:top-[100px] md:top-[125px] right-0 bottom-0 z-[25] pointer-events-none w-[45px] sm:w-[55px] md:w-[65px] overflow-hidden">
                <div ref={rightColRef} className="flex flex-col items-center">
                    {Array.from({ length: tileCount }).map((_, i) => (
                        <img
                            key={i}
                            src="/assets/images/pelli/garland_vertical_tile.png"
                            alt=""
                            className="w-full flex-shrink-0 will-change-transform mix-blend-multiply"
                            style={{ transform: "scaleX(-1)" }}
                            draggable={false}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
