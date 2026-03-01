import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

// A component that generates the texture for the disco ball procedurally
// A component that generates the texture for the disco ball procedurally
function DiscoBallSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Create textures procedurally to simulate the individual mirror tiles
    const { colorMap, normalMap, roughnessMap } = useMemo(() => {
        const size = 1024;
        const tilesU = 60; // horizontal tiles
        const tilesV = 30; // vertical tiles

        // Canvas for base color (mostly silver, with dark gaps)
        const colorCanvas = document.createElement("canvas");
        colorCanvas.width = size;
        colorCanvas.height = size;
        const colorCtx = colorCanvas.getContext("2d")!;

        // Canvas for normal map (tile tilt)
        const normalCanvas = document.createElement("canvas");
        normalCanvas.width = size;
        normalCanvas.height = size;
        const normalCtx = normalCanvas.getContext("2d")!;

        // Canvas for roughness
        const roughCanvas = document.createElement("canvas");
        roughCanvas.width = size;
        roughCanvas.height = size;
        const roughCtx = roughCanvas.getContext("2d")!;

        // Fill backgrounds
        colorCtx.fillStyle = "#111111"; // dark grout
        colorCtx.fillRect(0, 0, size, size);

        normalCtx.fillStyle = "#8080ff"; // flat normal
        normalCtx.fillRect(0, 0, size, size);

        roughCtx.fillStyle = "#ffffff"; // completely rough grout
        roughCtx.fillRect(0, 0, size, size);

        const tileW = size / tilesU;
        const tileH = size / tilesV;
        const gap = 1.5;

        // Draw tiles
        for (let u = 0; u < tilesU; u++) {
            for (let v = 0; v < tilesV; v++) {
                const x = u * tileW;
                const y = v * tileH;

                // Random slight tilt for each tile to make reflections sparkle independently
                const tiltX = (Math.random() - 0.5) * 40;
                const tiltY = (Math.random() - 0.5) * 40;

                // Base color is a bright silver
                const brightness = 220 + Math.random() * 35;
                colorCtx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
                colorCtx.fillRect(x + gap, y + gap, tileW - gap * 2, tileH - gap * 2);

                // Normal colors (R=X, G=Y, B=Z)
                const nr = Math.floor(128 + tiltX);
                const ng = Math.floor(128 + tiltY);
                normalCtx.fillStyle = `rgb(${nr}, ${ng}, 255)`;
                normalCtx.fillRect(x + gap, y + gap, tileW - gap * 2, tileH - gap * 2);

                // Roughness: very low for the mirrors
                const r = Math.floor(10 + Math.random() * 20);
                roughCtx.fillStyle = `rgb(${r}, ${r}, ${r})`;
                roughCtx.fillRect(x + gap, y + gap, tileW - gap * 2, tileH - gap * 2);
            }
        }

        const cTex = new THREE.CanvasTexture(colorCanvas);
        const nTex = new THREE.CanvasTexture(normalCanvas);
        const rTex = new THREE.CanvasTexture(roughCanvas);

        // Setting appropriate wrapping and repeat
        [cTex, nTex, rTex].forEach(tex => {
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
        });

        return { colorMap: cTex, normalMap: nTex, roughnessMap: rTex };
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Rotate the disco ball slowly
            meshRef.current.rotation.y += delta * 0.4;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2.2, 64, 32]} />
            <meshStandardMaterial
                map={colorMap}
                normalMap={normalMap}
                roughnessMap={roughnessMap}
                metalness={1}
                envMapIntensity={2.5}
            />
        </mesh>
    );
}

// Light beams shooting out
function LightBeams() {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <div
                    key={i}
                    className="absolute top-1/2 left-1/2 h-[1px] origin-left"
                    style={{
                        width: "120%",
                        transform: `translateY(-50%) rotate(${angle}deg)`,
                        background: `linear-gradient(90deg, rgba(255,255,255,0.4), transparent)`,
                        animation: `disco-pulse ${2 + (i % 3)}s ease-in-out infinite ${i * 0.3}s`,
                        filter: "blur(0.5px)"
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes disco-pulse {
          0%, 100% { opacity: 0.1; width: 80%; transform: translateY(-50%) rotate(var(--angle)) scale(1); }
          50% { opacity: 0.6; width: 130%; transform: translateY(-50%) rotate(var(--angle)) scale(1.02); }
        }
      `}</style>
        </div>
    );
}

export default function DiscoBall() {
    return (
        <div className="relative flex flex-col items-center justify-center">
            {/* Hanging wire */}
            <div className="w-[1.5px] h-12 sm:h-16 bg-gradient-to-b from-[#94A3B8] to-[#475569] opacity-80 z-20" />

            {/* Container for the 3D canvas - adjusted size based on feedback */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 group z-20">

                {/* Glow effect behind */}
                <div className="absolute inset-[-10%] bg-[#E2E8F0] rounded-full blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 z-0" />

                {/* 3D Canvas */}
                <div className="absolute inset-0 z-10">
                    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                        <ambientLight intensity={0.4} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} color="#ffffff" />
                        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.8} color="#60a5fa" />
                        <pointLight position={[0, -5, 5]} intensity={1.2} color="#38bdf8" />
                        <pointLight position={[5, 5, 5]} intensity={0.8} color="#fcd34d" />

                        <DiscoBallSphere />

                        <Environment preset="city" />
                        <OrbitControls enableZoom={false} enablePan={false} />
                    </Canvas>
                </div>

            </div>
        </div>
    );
}
