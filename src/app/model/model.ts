
export interface Model {
    metadata: ModelMetadata[];
    syncTrack: ModelTrack;
    guitar: {
        expert: ModelTrack;
        hard: ModelTrack;
        medium: ModelTrack;
        easy: ModelTrack;
    };
    ghlGuitar: {
        expert: ModelTrack;
        hard: ModelTrack;
        medium: ModelTrack;
        easy: ModelTrack;
    };
    events: ModelTrack;
    vocals: ModelTrack;
    venue: ModelTrack;
}

export interface ModelMetadata {
    name: string;
    value: string;
}

export interface ModelTrack {
    events: ModelTrackEvent[];
    unsupported: any[];
}

export type ModelTrackEvent = 
    ModelTrackBPMChange |
    ModelTrackTSChange |
    ModelTrackNote;

export enum ModelTrackEventType {
    BPMChange,
    TSChange,
    GuitarNote,
    GHLNote,
}

export interface ModelTrackBPMChange {
    id: number;
    event: ModelTrackEventType.BPMChange;
    time: number;
    bpm: number;
}

export interface ModelTrackTSChange {
    id: number;
    event: ModelTrackEventType.TSChange;
    time: number;
    ts: number;
}

export interface ModelTrackNote {
    id: number;
    event: ModelTrackEventType.GuitarNote | ModelTrackEventType.GHLNote;
    time: number;
    type: ModelTrackNoteType[];
    length: number;
    forceHopo: boolean;
    tap: boolean;
}

export enum ModelTrackNoteType {
    GuitarGreen,
    GuitarRed,
    GuitarYellow,
    GuitarBlue,
    GuitarOrange,
    GHLBlack1,
    GHLBlack2,
    GHLBlack3,
    GHLWhite1,
    GHLWhite2,
    GHLWhite3,
}
