'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SkipBack, Play, Pause, SkipForward, Music } from 'lucide-react';

interface MusicPlayerProps {
    playerInfo: string;
    albumArt: string;
    albumArtVisible: boolean;
    albumArtFading: boolean;
    playPauseIcon: string;
    controlsVisible: boolean;
    currentTime: string;
    totalTime: string;
    progressWidth: number;
    showSkeleton: boolean;
    playerName: string;
    onCommand: (command: string) => void;
}

export function MusicPlayer({
    playerInfo,
    albumArt,
    albumArtVisible,
    albumArtFading,
    playPauseIcon,
    controlsVisible,
    currentTime,
    totalTime,
    progressWidth,
    showSkeleton,
    playerName,
    onCommand,
}: MusicPlayerProps) {
    return (
        <Card className="relative p-6 bg-gradient-to-br from-[#1a1d3a]/80 via-[#0f1223]/80 to-[#1a1d3a]/80 border-2 border-[#6366f1]/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(99,102,241,0.15)] overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] opacity-50" />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 flex-1 justify-center">
                        <Music className="w-5 h-5 text-[#6366f1]" />
                        <h3 className="text-base font-black tracking-wider bg-linear-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent uppercase">
                            Now Playing
                        </h3>
                    </div>
                    {playerName?.toLowerCase() === 'spotify' && (
                        <div className="shrink-0" title="Spotify">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1DB954">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-6 mb-6">
                    {showSkeleton ? (
                        <>
                            <Skeleton className="w-40 h-40 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 shrink-0" />
                            <div className="flex-1 space-y-3">
                                <Skeleton className="h-6 w-full bg-linear-to-r from-white/10 to-white/5 rounded-full" />
                                <Skeleton className="h-5 w-3/4 bg-linear-to-r from-white/10 to-white/5 rounded-full" />
                            </div>
                        </>
                    ) : (
                        <>
                            {albumArtVisible && (
                                <div className="relative group/art shrink-0">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#3730a3] rounded-2xl blur opacity-50 group-hover/art:opacity-75 transition duration-500" />
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={albumArt}
                                        alt="Album artwork"
                                        className={`relative w-40 h-40 rounded-2xl object-cover shadow-2xl transition-all duration-500 group-hover/art:scale-105 ${albumArtFading ? 'opacity-0' : 'opacity-100'
                                            }`}
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0 space-y-4">
                                <p className="text-white font-bold text-lg leading-relaxed whitespace-pre-wrap drop-shadow-lg">
                                    {playerInfo}
                                </p>

                                {/* Timeline Bar */}
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-[#6366f1] font-mono font-bold min-w-[45px] text-center tracking-wider">
                                        {currentTime}
                                    </span>
                                    <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden shadow-inner border border-white/10">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] relative"
                                            style={{ width: `${progressWidth}%` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                                            <div className="absolute right-0 top-0 h-full w-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                        </div>
                                    </div>
                                    <span className="text-xs text-[#6366f1] font-mono font-bold min-w-[45px] text-center tracking-wider">
                                        {totalTime}
                                    </span>
                                </div>

                                {/* Control Buttons */}
                                <div
                                    className={`flex gap-3 justify-center transition-all duration-300 ${controlsVisible
                                        ? 'opacity-100 transform-none'
                                        : 'opacity-0 scale-90 h-0 overflow-hidden pointer-events-none'
                                        }`}
                                >
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1a1d3a] to-[#0f1223] border-2 border-[#6366f1]/40 text-white hover:border-[#6366f1] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:scale-110 transition-all duration-300"
                                        onClick={() => onCommand('player_prev')}
                                        title="Previous"
                                    >
                                        <SkipBack className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6366f1] to-[#4f46e5] border-0 text-white hover:from-[#4f46e5] hover:to-[#6366f1] hover:scale-110 shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_35px_rgba(79,70,229,0.7)] transition-all duration-300"
                                        onClick={() => onCommand('player_toggle')}
                                        title="Play/Pause"
                                    >
                                        {playPauseIcon === '⏸️' ? (
                                            <Pause className="w-6 h-6" fill="currentColor" />
                                        ) : (
                                            <Play className="w-6 h-6" fill="currentColor" />
                                        )}
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1a1d3a] to-[#0f1223] border-2 border-[#6366f1]/40 text-white hover:border-[#6366f1] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:scale-110 transition-all duration-300"
                                        onClick={() => onCommand('player_next')}
                                        title="Next"
                                    >
                                        <SkipForward className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
}
