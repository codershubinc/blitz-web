export const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getDeviceIcon = (iconType: string): string => {
    const iconMap: Record<string, string> = {
        'audio-card': '🎧',
        'audio-headset': '🎧',
        'audio-headphones': '🎧',
        'input-keyboard': '⌨️',
        'input-mouse': '🖱️',
        'input-gaming': '🎮',
        'phone': '📱',
        'computer': '💻',
    };
    return iconMap[iconType] || '🔵';
};
