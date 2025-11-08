"use client";

import { KeyboardEvent, useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ConnectionPanelProps {
    ipAddress: string;
    setIpAddress: (ip: string) => void;
    isConnecting: boolean;
    onConnect: () => void;
    status: string;
    statusClass: string;
}

export function ConnectionPanel({
    ipAddress,
    setIpAddress,
    isConnecting,
    onConnect,
    status,
    statusClass,
}: ConnectionPanelProps) {
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onConnect();
        }
    };

    // Upload state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadResponse, setUploadResponse] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUploadResponse(null);
        const f = e.target.files && e.target.files[0];
        setSelectedFile(f || null);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        const ip = ipAddress.trim();
        if (!ip) {
            setUploadResponse('Enter IP address first');
            return;
        }

        const url = `http://${ip}:8765/upload`;
        const form = new FormData();
        form.append('file', selectedFile);

        setIsUploading(true);
        setUploadResponse(null);

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: form,
            });
            const text = await res.text();
            setUploadResponse(text || `Status ${res.status}`);
        } catch (err) {
            setUploadResponse(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsUploading(false);
        }
    };


    return (
        <Card className="relative p-8 bg-gradient-to-br from-[#1a1d3a]/90 via-[#0f1223]/90 to-[#1a1d3a]/90 border-2 border-[#6366f1]/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(99,102,241,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5 pointer-events-none" />
            <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="text-5xl animate-pulse">⚡</div>
                    <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                        BLITZ REMOTE
                    </h1>
                </div>

                <div className="flex gap-3 mb-5">
                    <Input
                        type="text"
                        placeholder="Enter PC IP (e.g., 192.168.1.10)"
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isConnecting}
                        className="flex-1 h-12 bg-[#0a0e27]/80 border-2 border-[#6366f1]/40 text-white placeholder:text-gray-500 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/50 font-medium backdrop-blur-sm"
                    />
                    <Button
                        onClick={onConnect}
                        disabled={isConnecting}
                        className="h-12 px-8 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#ec4899] text-white font-bold shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-300 border-0"
                    >
                        CONNECT
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${statusClass === 'connected' ? 'bg-[#10b981]' : statusClass === 'disconnected' ? 'bg-[#ef4444]' : 'bg-gray-500'}`} />
                    <p
                        className={`text-center font-bold tracking-wide text-sm uppercase transition-all duration-300 ${statusClass === 'connected'
                            ? 'text-[#10b981] drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]'
                            : statusClass === 'disconnected'
                                ? 'text-[#ef4444] drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]'
                                : 'text-gray-400'
                            }`}
                    >
                        {status}
                    </p>
                </div>

                {/* File upload to server IP */}
                <div className="mt-6">
                    <label className="flex items-center gap-3">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#111327] file:text-sm file:font-semibold file:text-white cursor-pointer"
                        />
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || isUploading}
                            className="ml-2 h-10 px-4 bg-linear-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-md disabled:opacity-50"
                        >
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </label>

                    {uploadResponse && (
                        <div className="mt-3 text-xs text-gray-200 bg-black/30 p-2 rounded">{uploadResponse}</div>
                    )}
                </div>
            </div>
        </Card>
    );
}
