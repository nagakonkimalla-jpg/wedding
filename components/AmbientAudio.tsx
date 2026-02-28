"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

interface AmbientAudioProps {
    audioPath: string;
    startTime?: number;
}

export default function AmbientAudio({ audioPath, startTime = 0 }: AmbientAudioProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isPlayingRef = useRef(true);
    const hasPlayedRef = useRef(false);

    // Keep ref in sync with state
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // Try to play audio — returns true if successful
    const tryPlay = useCallback(async () => {
        if (!audioRef.current || !isPlayingRef.current || hasPlayedRef.current) return;
        try {
            await audioRef.current.play();
            hasPlayedRef.current = true;
        } catch {
            // Autoplay blocked — will retry on user interaction
        }
    }, []);

    useEffect(() => {
        const audio = new Audio(audioPath);
        audio.currentTime = startTime;
        audio.loop = false;
        audio.volume = 0.3;
        audio.preload = "auto";
        audioRef.current = audio;

        // Loop back to startTime instead of beginning
        const handleEnded = () => {
            audio.currentTime = startTime;
            audio.play().catch(() => {});
        };
        audio.addEventListener('ended', handleEnded);

        // Resume on any user interaction (handles autoplay blocking)
        const resumeOnInteraction = () => {
            if (audioRef.current && isPlayingRef.current && !hasPlayedRef.current) {
                audioRef.current.play().then(() => {
                    hasPlayedRef.current = true;
                    // Clean up listeners once playing
                    document.removeEventListener('click', resumeOnInteraction);
                    document.removeEventListener('touchstart', resumeOnInteraction);
                    document.removeEventListener('scroll', resumeOnInteraction);
                }).catch(() => {});
            }
        };

        // Try autoplay immediately
        if (isPlayingRef.current) {
            audio.play().then(() => {
                hasPlayedRef.current = true;
            }).catch(() => {
                // Blocked — set up interaction listeners
                document.addEventListener('click', resumeOnInteraction);
                document.addEventListener('touchstart', resumeOnInteraction);
                document.addEventListener('scroll', resumeOnInteraction, { passive: true });
            });
        }

        return () => {
            audio.removeEventListener('ended', handleEnded);
            document.removeEventListener('click', resumeOnInteraction);
            document.removeEventListener('touchstart', resumeOnInteraction);
            document.removeEventListener('scroll', resumeOnInteraction);
            audio.pause();
            audioRef.current = null;
            hasPlayedRef.current = false;
        };
    }, [audioPath, startTime]);

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().then(() => {
                hasPlayedRef.current = true;
            }).catch(() => {});
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
