'use client';

import { useState } from 'react';
import { ConnectionPanel } from '@/components/connection-panel';
import { MusicPlayer } from '@/components/music-player';
import { BluetoothPanel } from '@/components/bluetooth-panel';
import { RemoteControls } from '@/components/remote-controls';
import { useWebSocket } from '@/hooks/use-websocket';

export default function BlitzRemote() {
    const [ipAddress, setIpAddress] = useState('');
    const {
        status,
        statusClass,
        output,
        isConnecting,
        playerInfo,
        albumArt,
        albumArtVisible,
        albumArtFading,
        playPauseIcon,
        controlsVisible,
        currentTime,
        totalTime,
        progressWidth,
        bluetoothDevices,
        showSkeleton,
        playerName,
        wifiInfo,
        connect,
        sendCommand,
    } = useWebSocket();

    const formatSpeed = (mbps: number): string => {
        if (mbps >= 1000) {
            return `${(mbps / 1000).toFixed(1)} Gbps`;
        } else if (mbps >= 1) {
            return `${mbps.toFixed(1)} Mbps`;
        } else {
            return `${(mbps * 1024).toFixed(0)} Kbps`;
        }
    };

    const handleConnect = () => {
        connect(ipAddress);
    };

    return (
        <div className="w-full max-w-[95vw] sm:max-w-[500px] md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1400px] mx-auto my-3 sm:my-5 px-3 sm:px-5">
            {wifiInfo?.connected && wifiInfo.downloadSpeed && wifiInfo.uploadSpeed && (
                <div className="fixed top-4 right-4 bg-gradient-to-br from-[#1a1d3a]/90 to-[#0f1223]/90 backdrop-blur-xl border border-[#6366f1]/30 rounded-lg px-3 py-2 shadow-[0_4px_16px_rgba(99,102,241,0.3)] z-50">
                    <div className="flex items-center gap-2 text-xs font-bold">
                        <span className="text-[#6366f1]">↓{formatSpeed(wifiInfo.downloadSpeed)}</span>
                        <span className="text-white/40">/</span>
                        <span className="text-[#8b5cf6]">↑{formatSpeed(wifiInfo.uploadSpeed)}</span>
                    </div>
                </div>
            )}
            <ConnectionPanel
                ipAddress={ipAddress}
                setIpAddress={setIpAddress}
                isConnecting={isConnecting}
                onConnect={handleConnect}
                status={status}
                statusClass={statusClass}
            />

            <div className="flex flex-col gap-4 sm:gap-5 mt-4 sm:mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <MusicPlayer
                        playerInfo={playerInfo}
                        albumArt={albumArt}
                        albumArtVisible={albumArtVisible}
                        albumArtFading={albumArtFading}
                        playPauseIcon={playPauseIcon}
                        controlsVisible={controlsVisible}
                        currentTime={currentTime}
                        totalTime={totalTime}
                        progressWidth={progressWidth}
                        showSkeleton={showSkeleton}
                        playerName={playerName}
                        onCommand={sendCommand}
                    />
                    <BluetoothPanel devices={bluetoothDevices} />
                </div>

                <RemoteControls output={output} onCommand={sendCommand} />
            </div>
        </div>
    );
}
