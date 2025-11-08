'use client';

import { Card } from '@/components/ui/card';
import { WiFiInfo } from '@/lib/types';

interface WiFiPanelProps {
    info: WiFiInfo | null;
}

function formatSpeed(mbps: number): string {
    if (mbps >= 1000) {
        return `${(mbps / 1000).toFixed(2)} Gbps`;
    } else if (mbps >= 1) {
        return `${mbps.toFixed(2)} Mbps`;
    } else {
        return `${(mbps * 1024).toFixed(0)} Kbps`;
    }
}

export function WiFiPanel({ info }: WiFiPanelProps) {
    return (
        <Card className="relative p-4 bg-gradient-to-br from-[#1a1d3a]/80 via-[#0f1223]/80 to-[#1a1d3a]/80 border-2 border-[#6366f1]/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(99,102,241,0.15)] overflow-hidden h-max">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#6366f1]/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1] opacity-50" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-[10px] font-bold">Wi</div>
                    <h3 className="text-sm font-black tracking-wider bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent uppercase">
                        WiFi
                    </h3>
                </div>

                {!info || !info.connected ? (
                    <p className="text-gray-500 text-center py-2 italic text-xs font-medium">Not Connected</p>
                ) : (
                    <div className="flex flex-col gap-2 text-xs">
                        <div className="flex justify-between items-center">
                            <span className="text-white/60 font-medium">Network</span>
                            <span className="text-white font-bold">{info.ssid}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-white/60 font-medium">IP</span>
                            <span className="text-white font-mono">{info.ipAddress}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-white/60 font-medium">Speed</span>
                            <span className="text-white font-bold">
                                <span className="text-[#6366f1]">{info.downloadSpeed ? formatSpeed(info.downloadSpeed) : 'N/A'}</span>
                                <span className="text-white/40 mx-1">/</span>
                                <span className="text-[#8b5cf6]">{info.uploadSpeed ? formatSpeed(info.uploadSpeed) : 'N/A'}</span>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
