
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

export const TEST_CHART_FILE = `[Song]
{
    Name = Test Name
    Artist = Test Artist
    Charter = Test Charter
    Resolution = 192
}
[SyncTrack]
{
    0 = TS 4
    0 = B 60000
}
[Events]
{
}
[ExpertSingle]
{
    192 = N 0 0
    384 = N 1 0
    576 = N 2 0
    768 = N 3 0
    960 = N 4 0
}`;

const TEST_CHART_OBJECT_METADATA = new Map<string, string>();
TEST_CHART_OBJECT_METADATA.set('Name', 'Test Name');
TEST_CHART_OBJECT_METADATA.set('Artist', 'Test Artist');
TEST_CHART_OBJECT_METADATA.set('Charter', 'Test Charter');
TEST_CHART_OBJECT_METADATA.set('Resolution', '192');

export const TEST_CHART_OBJECT: Chart = {
    metadata: TEST_CHART_OBJECT_METADATA,
    events: [{
        time: 0,
        type: 'time-signature-change',
        event: {
            timeSignature: 4,
        },
    }, {
        time: 0,
        type: 'bpm-change',
        event: {
            bpm: 60,
        },
    }, {
        time: 1,
        type: 'note',
        event: {
            color: ['green'],
        },
    }, {
        time: 2,
        type: 'note',
        event: {
            color: ['red'],
        },
    }, {
        time: 3,
        type: 'note',
        event: {
            color: ['yellow'],
        },
    }, {
        time: 4,
        type: 'note',
        event: {
            color: ['blue'],
        },
    }, {
        time: 5,
        type: 'note',
        event: {
            color: ['orange'],
        },
    }],
};
