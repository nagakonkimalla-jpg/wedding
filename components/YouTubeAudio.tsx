"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

interface YouTubeAudioProps {
    videoId: string;
    volume?: number; // 0-100
}

declare global {
    interface Window {
        YT: typeof YT;
        onYouTubeIframeAPIReady: () => void;
    }
}

let apiLoaded = false;
let apiReady = false;
const readyCallbacks: (() => void)[] = [];

function loadYouTubeAPI(): Promise<void> {
    return new Promise((resolve) => {
        if (apiReady) {
            resolve();
            return;
        }

        readyCallbacks.push(resolve);

        if (!apiLoaded) {
            apiLoaded = true;
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);

            window.onYouTubeIframeAPIReady = () => {
                apiReady = true;
                readyCallbacks.forEach(cb => cb());
                readyCallbacks.length = 0;
            };
        }
    });
}

export default function YouTubeAudio({ videoId, volume = 30 }: YouTubeAudioProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const playerRef = useRef<YT.Player | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isPlayingRef = useRef(true);
    const hasPlayedRef = useRef(false);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    const tryPlay = useCallback(() => {
        if (!playerRef.current || !isPlayingRef.current || hasPlayedRef.current) return;
        try {
            playerRef.current.playVideo();
        } catch {
            // Will retry on user interaction
        }
    }, []);

    useEffect(() => {
        let player: YT.Player | null = null;
        let destroyed = false;

        const initPlayer = async () => {
            await loadYouTubeAPI();
            if (destroyed) return;

            // Create a container div for the player
            const div = document.createElement('div');
            div.id = `yt-audio-${videoId}`;
            containerRef.current?.appendChild(div);

            player = new window.YT.Player(div.id, {
                videoId,
                height: '0',
                width: '0',
                playerVars: {
                    autoplay: 1,
                    loop: 1,
                    playlist: videoId, // Required for loop to work
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                },
                events: {
                    onReady: (event: YT.PlayerEvent) => {
                        if (destroyed) return;
                        playerRef.current = event.target;
                        event.target.setVolume(volume);
                        if (isPlayingRef.current) {
                            event.target.playVideo();
                            hasPlayedRef.current = true;
                        }
                    },
                    onStateChange: (event: YT.OnStateChangeEvent) => {
                        if (destroyed) return;
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            hasPlayedRef.current = true;
                        }
                    },
                },
            });
        };

        // Resume on user interaction (handles autoplay blocking)
        const resumeOnInteraction = () => {
            if (playerRef.current && isPlayingRef.current && !hasPlayedRef.current) {
                try {
                    playerRef.current.playVideo();
                    hasPlayedRef.current = true;
                    document.removeEventListener('click', resumeOnInteraction);
                    document.removeEventListener('touchstart', resumeOnInteraction);
                    document.removeEventListener('scroll', resumeOnInteraction);
                } catch {
                    // ignore
                }
            }
        };

        document.addEventListener('click', resumeOnInteraction);
        document.addEventListener('touchstart', resumeOnInteraction);
        document.addEventListener('scroll', resumeOnInteraction, { passive: true });

        initPlayer();

        return () => {
            destroyed = true;
            document.removeEventListener('click', resumeOnInteraction);
            document.removeEventListener('touchstart', resumeOnInteraction);
            document.removeEventListener('scroll', resumeOnInteraction);
            if (player) {
                try {
                    player.destroy();
                } catch {
                    // ignore
                }
            }
            playerRef.current = null;
            hasPlayedRef.current = false;
        };
    }, [videoId, volume]);

    useEffect(() => {
        if (!playerRef.current) return;

        if (isPlaying) {
            playerRef.current.playVideo();
            localStorage.setItem('wedding-audio-unmuted', 'true');
        } else {
            playerRef.current.pauseVideo();
            localStorage.setItem('wedding-audio-unmuted', 'false');
        }
    }, [isPlaying]);

    const toggleMute = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <>
            <div ref={containerRef} style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }} />
            <button
                onClick={toggleMute}
                className="fixed bottom-6 left-6 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/20 text-(--accent-primary) transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-(--accent-primary)"
                aria-label={isPlaying ? "Mute audio" : "Play audio"}
            >
                {isPlaying ? <HiVolumeUp size={24} color="var(--accent-primary)" /> : <HiVolumeOff size={24} color="var(--accent-primary)" />}
            </button>
        </>
    );
}
