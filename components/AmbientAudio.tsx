"use client";

import { useEffect, useRef, useState } from 'react';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

interface AmbientAudioProps {
    audioPath: string;
    startTime?: number;
}

export default function AmbientAudio({ audioPath, startTime = 0 }: AmbientAudioProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const triedAutoplay = useRef(false);

    useEffect(() => {
        // Default to on unless user explicitly muted
        const storedPreference = localStorage.getItem('wedding-audio-unmuted');
        if (storedPreference === 'false') {
            setIsPlaying(false);
        }

        const audio = new Audio(audioPath);
        audio.currentTime = startTime;
        audio.loop = false;
        audio.volume = 0.3;
        audioRef.current = audio;

        // Loop back to startTime instead of beginning
        const handleEnded = () => {
            audio.currentTime = startTime;
            audio.play().catch(() => {});
        };
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
            audioRef.current = null;
        };
    }, [audioPath, startTime]);

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(() => {
                // Autoplay blocked — resume on first user interaction
                if (!triedAutoplay.current) {
                    triedAutoplay.current = true;
                    const resumeOnInteraction = () => {
                        if (audioRef.current && isPlaying) {
                            audioRef.current.play().catch(() => {});
                        }
                        document.removeEventListener('click', resumeOnInteraction);
                        document.removeEventListener('touchstart', resumeOnInteraction);
                    };
                    document.addEventListener('click', resumeOnInteraction, { once: true });
                    document.addEventListener('touchstart', resumeOnInteraction, { once: true });
                }
            });
            localStorage.setItem('wedding-audio-unmuted', 'true');
        } else {
            audioRef.current.pause();
            localStorage.setItem('wedding-audio-unmuted', 'false');
        }
    }, [isPlaying]);

    const toggleMute = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-6 left-6 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/20 text-(--accent-primary) transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-(--accent-primary)"
            aria-label={isPlaying ? "Mute audio" : "Play audio"}
        >
            {isPlaying ? <HiVolumeUp size={24} color="var(--accent-primary)" /> : <HiVolumeOff size={24} color="var(--accent-primary)" />}
        </button>
    );
}
