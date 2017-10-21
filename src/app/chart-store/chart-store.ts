import { ChartFileSyncTrack, ChartFileTrack } from './../chart-file/chart-file';

export interface ChartStore {
    metadata: ChartStoreMetadata[];
    syncTrack: ChartStoreTrack;
    guitar: {
        expert: ChartStoreTrack;
        hard: ChartStoreTrack;
        medium: ChartStoreTrack;
        easy: ChartStoreTrack;
    };
    ghlGuitar: {
        expert: ChartStoreTrack;
        hard: ChartStoreTrack;
        medium: ChartStoreTrack;
        easy: ChartStoreTrack;
    };
    events: ChartStoreTrack;
    vocals: ChartStoreTrack;
    venue: ChartStoreTrack;
}

export interface ChartStoreMetadata {
    name: string;
    value: string;
}

export interface ChartStoreTrack {
    events: ChartStoreTrackEvent[];
    unsupported: ChartFileTrack[];
}

export type ChartStoreTrackEvent = 
    ChartStoreTrackBPMChange |
    ChartStoreTrackNote;

export enum ChartStoreTrackEventType {
    BPMChange,
    GuitarNote,
    GHLNote,
}

export interface ChartStoreTrackBPMChange {
    id: number;
    event: ChartStoreTrackEventType.BPMChange;
    time: number;
    bpm: number;
}

export interface ChartStoreTrackNote {
    id: number;
    event: ChartStoreTrackEventType.GuitarNote | ChartStoreTrackEventType.GHLNote;
    time: number;
    type: ChartStoreTrackNoteType[];
    length: number;
}

export enum ChartStoreTrackNoteType {
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
