
export interface ChartFile {
    metadata: ChartFileMetadata[];
    syncTrack: ChartFileSyncTrack[];
    guitar: {
        expert: ChartFileTrack[];
        hard: ChartFileTrack[];
        medium: ChartFileTrack[];
        easy: ChartFileTrack[];
    };
    ghlGuitar: {
        expert: ChartFileTrack[];
        hard: ChartFileTrack[];
        medium: ChartFileTrack[];
        easy: ChartFileTrack[];
    };
    events: ChartFileTrack[];
    vocals: ChartFileTrack[];
    venue: ChartFileTrack[];
}

export interface ChartFileMetadata {
    name: string;
    value: string;
}

export interface ChartFileSyncTrack {
    midiTime: number;
    type: string;
    value?: number;
    text?: string;
}

export interface ChartFileTrack {
    midiTime: number;
    type: string;
    note?: number;
    length?: number;
    text?: string;
}
