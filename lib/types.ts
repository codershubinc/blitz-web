export interface MediaInfo {
    Title: string;
    Artist: string;
    Album: string;
    Status: string;
    Player: string;
    Position: string;
    Length: string;
}

export interface BluetoothDevice {
    name: string;
    macAddress: string;
    battery: number;
    connected: boolean;
    icon: string;
}

export interface WiFiInfo {
    ssid: string;
    signalStrength: number; // 0-100
    linkSpeed: number; // Mbps
    frequency: string; // 2.4GHz or 5GHz
    security: string; // WPA2, WPA3, etc.
    ipAddress: string;
    connected: boolean;
    downloadSpeed: number; // Mbps
    uploadSpeed: number; // Mbps
}

export interface WebSocketMessage {
    status: string;
    player?: MediaInfo;
    artwork?: string;
    output?: string | BluetoothDevice[] | WiFiInfo;
    message?: string;
}
