
export interface Chart {
    metadata: Map<string, string>;
    events: ChartEvent[];
}

export type ChartEventType = 'note' | 'time-signature-change' | 'bpm-change';
export interface ChartEvent {
    type: ChartEventType;
    time: number;
    event: Note | TimeSignatureChange | BPMChange;
}

export type NoteColor = 'green' | 'red' | 'yellow' | 'blue' | 'orange';
export interface Note {
    color: NoteColor[];
}

export interface TimeSignatureChange {
    timeSignature: number;
}

export interface BPMChange {
    bpm: number;
}

