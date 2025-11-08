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
        <Card className="relative p-6 bg-gradient-to-br from-[#1a1d3a]/80 via-[#0f1223]/80 to-[#1a1d3a]/80 border-2 border-[#6366f1]/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(99,102,241,0.15)] overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#6366f1]/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1] opacity-50" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-[#6366f1] flex items-center justify-center text-white font-bold">Wi</div>
                    <h3 className="text-base font-black tracking-wider bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent uppercase">
                        Wi-Fi
                    </h3>
                </div>

                {!info ? (
                    <p className="text-gray-500 text-center py-6 italic text-sm font-medium">No Wi‑Fi data</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white font-bold">{info.ssid || 'Unknown'}</div>
                                <div className="text-xs text-gray-300">{info.security} • {info.frequency}</div>
                            </div>
                            <div className={`text-xs font-black ${info.connected ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                                {info.connected ? 'Connected' : 'Disconnected'}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
                                    <div className="h-full bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded-full" style={{ width: `${info.signalStrength}%` }} />
                                </div>
                                <div className="text-xs text-gray-300 mt-1">Signal: {info.signalStrength}%</div>
                            </div>
                            <div className="text-sm font-mono text-white">{formatSpeed(info.linkSpeed)}</div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-300">
                            <div>IP: <span className="text-white font-mono">{info.ipAddress || '—'}</span></div>
                            <div>DL <span className="text-white font-mono">{formatSpeed(info.downloadSpeed)}</span> / UL <span className="text-white font-mono">{formatSpeed(info.uploadSpeed)}</span></div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
