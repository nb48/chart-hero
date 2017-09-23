
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
    Resolution = 200
    Offset = -0.1
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
    200 = N 0 0
    400 = N 1 0
    600 = N 2 0
    800 = N 3 0
    1000 = N 4 0
}`;

export const TEST_CHART_OBJECT = (): Chart => ({
    metadata: (() => {
        const metadata = new Map<string, string>();
        metadata.set('Name', 'Test Name');
        metadata.set('Artist', 'Test Artist');
        metadata.set('Charter', 'Test Charter');
        metadata.set('Resolution', '200');
        metadata.set('Offset', '-0.1');
        return metadata;
    })(),
    events: [{
        time: -0.1,
        type: 'time-signature-change',
        event: {
            timeSignature: 4,
        },
    }, {
        time: -0.1,
        type: 'bpm-change',
        event: {
            bpm: 60,
        },
    }, {
        time: 0.9,
        type: 'note',
        event: {
            color: ['green'],
        },
    }, {
        time: 1.9,
        type: 'note',
        event: {
            color: ['red'],
        },
    }, {
        time: 2.9,
        type: 'note',
        event: {
            color: ['yellow'],
        },
    }, {
        time: 3.9,
        type: 'note',
        event: {
            color: ['blue'],
        },
    }, {
        time: 4.9,
        type: 'note',
        event: {
            color: ['orange'],
        },
    }],
});
