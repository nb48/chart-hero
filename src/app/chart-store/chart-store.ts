
export interface ChartStore {
    metadata: ChartStoreMetadata[];
    events: ChartStoreEvent[];
}

export interface ChartStoreMetadata {
    name: string;
    value: string;
}

export type ChartStoreEvent =
    ChartStoreBPMChangeEvent |
    ChartStoreTimeSignatureChangeEvent |
    ChartStoreNoteEvent;

export enum ChartStoreEventType {
    BPMChange,
    TimeSignatureChange,
    Note,
}

export interface ChartStoreBPMChangeEvent {
    event: ChartStoreEventType.BPMChange;
    time: number;
    bpm: number;
}

export interface ChartStoreTimeSignatureChangeEvent {
    event: ChartStoreEventType.TimeSignatureChange;
    time: number;
    timeSignature: number;
}

export interface ChartStoreNoteEvent {
    event: ChartStoreEventType.Note;
    time: number;
    type: ChartStoreNoteType[];
}

export enum ChartStoreNoteType {
    FBGreen,
    FBRed,
    FBYellow,
    FBBlue,
    FBOrange,
    FBOpen,
}
