
export interface Chart {
    metadata: Map<string, string>;
    events: ChartEvent[];
}

export interface ChartEvent {
    type: string;
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

