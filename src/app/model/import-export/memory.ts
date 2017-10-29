
export interface Memory {
    metadata: MemoryMetadata[];
    syncTrack: MemorySyncTrack[];
    guitar: {
        expert: MemoryTrack[];
        hard: MemoryTrack[];
        medium: MemoryTrack[];
        easy: MemoryTrack[];
    };
    ghlGuitar: {
        expert: MemoryTrack[];
        hard: MemoryTrack[];
        medium: MemoryTrack[];
        easy: MemoryTrack[];
    };
    events: MemoryTrack[];
    vocals: MemoryTrack[];
    venue: MemoryTrack[];
}

export interface MemoryMetadata {
    name: string;
    value: string;
}

export interface MemorySyncTrack {
    midiTime: number;
    type: string;
    value?: number;
    text?: string;
}

export interface MemoryTrack {
    midiTime: number;
    type: string;
    note?: number;
    length?: number;
    text?: string;
}
