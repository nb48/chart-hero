import { ChartFile } from './chart-file';

export const TEST_FILE = `[Song]
{
    Name = Test Name
    Artist = Test Artist
    Charter = Test Charter
    Resolution = 200
    Offset = -0.1
}
[SyncTrack]
{
    0 = B 60000
    0 = UNSUPPORTED UNSUPPORTED
}
[ExpertGHLGuitar]
{
    200 = N 0 0
    400 = N 1 0
    600 = N 2 0
    800 = N 3 0
    1000 = N 4 0
    1200 = N 7 0
    0 = UNSUPPORTED UNSUPPORTED
}
[Events]
{
    0 = UNSUPPORTED UNSUPPORTED
}
`;

export const TEST_CHART: ChartFile = {
    metadata: [{
        name: 'Name',
        value: 'Test Name',
    }, {
        name: 'Artist',
        value: 'Test Artist',
    }, {
        name: 'Charter',
        value: 'Test Charter',
    }, {
        name: 'Resolution',
        value: '200',
    }, {
        name: 'Offset',
        value: '-0.1',
    }],
    syncTrack: [{
        midiTime: 0,
        type: 'B',
        value: 60000,
    }, {
        midiTime: 0,
        type: 'UNSUPPORTED',
        text: 'UNSUPPORTED',
    }],
    guitar: {
        expert: null,
        hard: null,
        medium: null,
        easy: null,
    },
    bass: {
        expert: null,
        hard: null,
        medium: null,
        easy: null,
    },
    drums: {
        expert: null,
        hard: null,
        medium: null,
        easy: null,
    },
    ghlGuitar: {
        expert: [{
            midiTime: 200,
            type: 'N',
            note: 0,
            length: 0,
        }, {
            midiTime: 400,
            type: 'N',
            note: 1,
            length: 0,
        }, {
            midiTime: 600,
            type: 'N',
            note: 2,
            length: 0,
        }, {
            midiTime: 800,
            type: 'N',
            note: 3,
            length: 0,
        }, {
            midiTime: 1000,
            type: 'N',
            note: 4,
            length: 0,
        }, {
            midiTime: 1200,
            type: 'N',
            note: 7,
            length: 0,
        }, {
            midiTime: 0,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        }],
        hard: null,
        medium: null,
        easy: null,
    },
    events: [{
        midiTime: 0,
        type: 'UNSUPPORTED',
        text: 'UNSUPPORTED',
    }],
    vocals: null,
    venue: null,
};
