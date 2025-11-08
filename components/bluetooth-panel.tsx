'use client';

import { Card } from '@/components/ui/card';
import { BluetoothDevice } from '@/lib/types';
import { getDeviceIcon } from '@/lib/websocket';
import { Bluetooth } from 'lucide-react';

interface BluetoothPanelProps {
    devices: BluetoothDevice[];
}

function BatteryIndicator({ battery }: { battery: number }) {
    const color =
        battery >= 50 ? 'bg-[#10b981]' : battery >= 20 ? 'bg-[#f59e0b]' : 'bg-[#ef4444]';
    const pulseClass = battery < 20 ? 'animate-pulse' : '';

    return (
        <div className="relative w-[70px] h-[30px] border-2 border-white/20 rounded-lg bg-black/60 overflow-hidden backdrop-blur-sm">
            <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-1.5 h-4 bg-white/20 rounded-r" />
            <div
                className={`h-full ${color} transition-all duration-500 ${pulseClass} relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]`}
                style={{ width: `${battery}%` }}
            >
                <div className="absolute inset-0 bg-linear-to-t from-white/20 to-transparent" />
            </div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">
                {battery}%
            </span>
        </div>
    );
}

export function BluetoothPanel({ devices }: BluetoothPanelProps) {
    return (
        <Card className="relative p-6 bg-linear-to-br from-[#1a1d3a]/80 via-[#0f1223]/80 to-[#1a1d3a]/80 border-2 border-[#6366f1]/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(99,102,241,0.15)] overflow-hidden h-full">
            <div className="absolute inset-0 bg-linear-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] opacity-50" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Bluetooth className="w-5 h-5 text-[#6366f1]" />
                    <h3 className="text-base font-black tracking-wider bg-linear-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent uppercase">
                        Bluetooth Devices
                    </h3>
                </div>

                <div className="flex flex-col gap-3">
                    {devices.length === 0 ? (
                        <p className="text-gray-500 text-center py-6 italic text-sm font-medium">
                            No devices connected
                        </p>
                    ) : (
                        devices.map((device, idx) => (
                            <div
                                key={idx}
                                className="relative group/device bg-linear-to-r from-[#0a0e27]/60 to-[#1a1d3a]/60 p-4 rounded-xl flex justify-between items-center hover:from-[#1a1d3a]/80 hover:to-[#0a0e27]/80 hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-all duration-300 border border-white/5 backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="text-3xl min-w-[35px] text-center group-hover/device:scale-110 transition-transform duration-300">
                                        {getDeviceIcon(device.icon)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white font-bold text-sm mb-1 tracking-wide">
                                            {device.name}
                                        </div>
                                        <div className="text-[#6366f1]/80 text-xs font-mono">
                                            {device.macAddress}
                                        </div>
                                    </div>
                                </div>
                                {device.battery >= 0 ? (
                                    <BatteryIndicator battery={device.battery} />
                                ) : (
                                    <span className="text-gray-500 text-sm italic font-medium">N/A</span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Card>
    );
}
