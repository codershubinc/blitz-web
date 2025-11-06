'use client';

import { useState, useRef } from 'react';
import { MediaInfo, BluetoothDevice, WebSocketMessage, WiFiInfo } from '@/lib/types';
import { formatTime } from '@/lib/websocket';

export function useWebSocket() {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [status, setStatus] = useState('Not Connected');
    const [statusClass, setStatusClass] = useState('disconnected');
    const [output, setOutput] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [playerInfo, setPlayerInfo] = useState('Waiting for connection...');
    const [albumArt, setAlbumArt] = useState('');
    const [albumArtVisible, setAlbumArtVisible] = useState(false);
    const [albumArtFading, setAlbumArtFading] = useState(false);
    const [playPauseIcon, setPlayPauseIcon] = useState('▶️');
    const [controlsVisible, setControlsVisible] = useState(true);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [totalTime, setTotalTime] = useState('0:00');
    const [progressWidth, setProgressWidth] = useState(0);
    const [bluetoothDevices, setBluetoothDevices] = useState<BluetoothDevice[]>([]);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [wifiInfo, setWifiInfo] = useState<WiFiInfo | null>(null);

    const previousBluetoothData = useRef<string>('');
    const previousArtworkUrl = useRef<string>('');
    const previousWifiData = useRef<string>('');

    const updateProgressBar = (position: string, length: string) => {
        const positionSeconds = position ? parseInt(position) / 1000000 : 0;
        const lengthSeconds = length ? parseInt(length) / 1000000 : 0;

        setCurrentTime(formatTime(positionSeconds));
        setTotalTime(formatTime(lengthSeconds));

        if (lengthSeconds > 0) {
            const percentage = (positionSeconds / lengthSeconds) * 100;
            setProgressWidth(Math.min(percentage, 100));
        } else {
            setProgressWidth(0);
        }
    };

    const updateWifiState = (wifi: WiFiInfo | null) => {
        try {
            const hash = JSON.stringify(wifi || {});
            if (previousWifiData.current === hash) return;
            previousWifiData.current = hash;
            setWifiInfo(wifi);
        } catch {
            setWifiInfo(wifi);
        }
    };

    const updateBluetoothDevicesState = (devices: BluetoothDevice[]) => {
        const devicesHash = JSON.stringify(
            devices.map((d) => ({
                mac: d.macAddress,
                name: d.name,
                battery: d.battery,
                connected: d.connected,
            }))
        );

        if (previousBluetoothData.current === devicesHash) {
            return;
        }

        previousBluetoothData.current = devicesHash;
        setBluetoothDevices(devices || []);
    };

    const connect = (ipAddress: string) => {
        const ip = ipAddress.trim();
        const port = 8765;

        if (!ip) {
            setOutput('Please enter an IP address.');
            return;
        }

        if (ws) {
            ws.close();
        }

        setStatus('Connecting...');
        setStatusClass('');
        setIsConnecting(true);
        setShowSkeleton(true);

        const websocket = new WebSocket(`ws://${ip}:${port}/ws`);

        websocket.onopen = () => {
            console.log('Connected to WebSocket server');
            setStatus('Status: Connected');
            setStatusClass('connected');
        };

        websocket.onmessage = (event) => {
            const data: WebSocketMessage = JSON.parse(event.data);
            console.log('Message from server:', data);

            if (data.status === 'player') {
                setShowSkeleton(false);

                const player = (data.player || {}) as MediaInfo;
                const hasActivePlayer =
                    player.Title && player.Title !== '' && player.Status !== '';

                setControlsVisible(!!hasActivePlayer);

                let displayText = 'No music playing';
                if (hasActivePlayer) {
                    displayText = `${player.Title}`;
                    if (player.Artist) {
                        displayText += ` - ${player.Artist}`;
                    }
                    if (player.Status) {
                        displayText += ` — ${player.Status}`;
                    }
                    if (player.Album) {
                        displayText += `\n📀 ${player.Album}`;
                    }
                    // Store player name separately, don't add to display
                    setPlayerName(player.Player || '');
                }

                setPlayerInfo(displayText);
                setPlayPauseIcon(player.Status === 'Playing' ? '⏸️' : '▶️');
                updateProgressBar(player.Position, player.Length);

                // Handle artwork updates with flicker prevention
                if (data.artwork && data.artwork !== '') {
                    // Only update if artwork URL actually changed
                    if (previousArtworkUrl.current !== data.artwork) {
                        previousArtworkUrl.current = data.artwork;
                        setAlbumArtFading(true);
                        setTimeout(() => {
                            setAlbumArt(data.artwork!);
                            setAlbumArtFading(false);
                            setAlbumArtVisible(true);
                        }, 250);
                    } else if (!albumArtVisible) {
                        // First time showing artwork (after connection)
                        setAlbumArt(data.artwork);
                        setAlbumArtVisible(true);
                    }
                } else {
                    // No artwork available
                    if (albumArtVisible) {
                        previousArtworkUrl.current = '';
                        setAlbumArtFading(true);
                        setTimeout(() => {
                            setAlbumArtVisible(false);
                            setAlbumArtFading(false);
                        }, 500);
                    }
                }
            } else if (data.status === 'bluetooth') {
                updateBluetoothDevicesState((data.output as BluetoothDevice[]) || []);
            } else if (data.status === 'wifi') {
                updateWifiState((data.output as WiFiInfo) || null);
            } else if (data.status === 'success') {
                setOutput(data.output as string);
            } else {
                setOutput(`Error: ${data.message}\n\n${data.output || ''}`);
            }
        };

        websocket.onclose = () => {
            console.log('Disconnected from WebSocket server');
            setStatus('Status: Disconnected');
            setStatusClass('disconnected');
            setIsConnecting(false);
            setWs(null);
        };

        websocket.onerror = (error) => {
            console.error('WebSocket Error:', error);
            setStatus('Status: Error (Check IP/Firewall)');
            setStatusClass('disconnected');
            setIsConnecting(false);
            setWs(null);
        };

        setWs(websocket);
    };

    const sendCommand = (commandName: string) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const message = {
                command: commandName,
            };
            ws.send(JSON.stringify(message));
            setOutput(`Sent command: ${commandName}...`);
        } else {
            setOutput('Not connected. Please connect first.');
        }
    };

    return {
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
    };
}
