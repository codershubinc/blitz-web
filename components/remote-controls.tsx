'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RemoteControlsProps {
    output: string;
    onCommand: (command: string) => void;
}

const commands = [
    { id: 'update', label: '🚀 System Update' },
    { id: 'list_home', label: '📂 List Home' },
    { id: 'status', label: 'Git Status' },
    { id: 'open_firefox', label: '🔥 Open Firefox' },
    { id: 'open_vscode', label: '🖥️ Open VSCode' },
    { id: 'open_edge', label: '🌐 Open Edge' },
    { id: 'open_postman', label: '📬 Open Postman' },
];

export function RemoteControls({ output, onCommand }: RemoteControlsProps) {
    return (
        <div className="flex-1 space-y-5">
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-linear-to-b from-[#6366f1] to-[#8b5cf6] rounded-full" />
                    <h3 className="text-sm font-black tracking-wider text-white/80 uppercase">
                        Quick Actions
                    </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {commands.map((cmd) => (
                        <Button
                            key={cmd.id}
                            onClick={() => onCommand(cmd.id)}
                            className="relative h-auto py-3 px-3 text-xs sm:text-sm font-bold tracking-tight bg-gradient-to-br from-[#1a1d3a]/90 to-[#0f1223]/90 hover:from-[#6366f1] hover:to-[#8b5cf6] text-white border border-[#6366f1]/30 hover:border-[#ec4899]/50 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(99,102,241,0.4)] transition-all duration-300 active:scale-95 backdrop-blur-sm overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 truncate">{cmd.label}</span>
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-gradient-to-b from-[#6366f1] to-[#8b5cf6] rounded-full" />
                    <h3 className="text-sm font-black tracking-wider text-white/80 uppercase">
                        System Output
                    </h3>
                </div>
                <Card className="relative bg-black/60 border-2 border-white/10 p-4 sm:p-5 min-h-[120px] max-h-[250px] sm:max-h-[300px] overflow-y-auto backdrop-blur-xl shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5 pointer-events-none" />
                    <pre className="relative z-10 whitespace-pre-wrap break-words font-mono text-xs sm:text-sm text-[#10b981] leading-relaxed">
                        {output}
                    </pre>
                </Card>
            </div>
        </div>
    );
}
