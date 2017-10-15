import { ChartFileEvent, ChartFileSyncTrack, ChartFileTrack } from './../chart-file/chart-file';

export interface ChartStore {
    metadata: ChartStoreMetadata[];
    events: ChartStoreEvent[];
    unsupported: ChartStoreUnsupportedEvent[];
}

export interface ChartStoreMetadata {
    name: string;
    value: string;
}

export type ChartStoreEvent =
    ChartStoreEventBPMChange |
    ChartStoreEventNote;

export enum ChartStoreEventType {
    BPMChange,
    Note,
}

export interface ChartStoreEventBPMChange {
    event: ChartStoreEventType.BPMChange;
    time: number;
    bpm: number;
}

export interface ChartStoreEventNote {
    event: ChartStoreEventType.Note;
    time: number;
    type: ChartStoreNoteType[];
    length: number;
}

export enum ChartStoreNoteType {
    GHLBlack1,
    GHLBlack2,
    GHLBlack3,
    GHLWhite1,
    GHLWhite2,
    GHLWhite3,
}

export enum ChartStoreUnsupportedEventType {
    SyncTrack,
    Event,
    Track,
}

export interface ChartStoreUnsupportedEvent {
    event: ChartStoreUnsupportedEventType;
    original: ChartFileSyncTrack | ChartFileEvent | ChartFileTrack;
}
