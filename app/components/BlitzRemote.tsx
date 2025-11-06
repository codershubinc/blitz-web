'use client';

import { useState } from 'react';
import { ConnectionPanel } from '@/components/connection-panel';
import { MusicPlayer } from '@/components/music-player';
import { BluetoothPanel } from '@/components/bluetooth-panel';
import { WiFiPanel } from '@/components/wifi-panel';
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


    const handleConnect = () => {
        connect(ipAddress);
    };

    return (
        <div className="w-full max-w-[95vw] sm:max-w-[500px] md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1400px] mx-auto my-3 sm:my-5 px-3 sm:px-5">
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
                    <div className="flex flex-col gap-4">
                        <BluetoothPanel devices={bluetoothDevices} />
                        <WiFiPanel info={wifiInfo} />
                    </div>
                </div>

                <RemoteControls output={output} onCommand={sendCommand} />
            </div>
        </div>
    );
}
