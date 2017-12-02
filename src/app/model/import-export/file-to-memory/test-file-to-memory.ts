import { Memory } from '../memory';

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
    0 = TS 4
    0 = UNSUPPORTED UNSUPPORTED
}
[ExpertGHLGuitar]
{
    200 = N 0 0
    400 = N 1 0
    400 = S 2 300
    400 = E solo
    600 = N 2 0
    800 = N 3 0
    800 = E soloend
    1000 = N 4 0
    1200 = N 7 0
    0 = UNSUPPORTED UNSUPPORTED
}
[Events]
{
    200 = E "section Section 1"
    0 = UNSUPPORTED UNSUPPORTED
}
`;

export const TEST_MEMORY: Memory = {
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
        type: 'TS',
        value: 4, 
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
            midiTime: 400,
            type: 'S',
            note: 2,
            length: 300,
        }, {
            midiTime: 400,
            type: 'E',
            text: 'solo',
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
            midiTime: 800,
            type: 'E',
            text: 'soloend',
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
        midiTime: 200,
        type: 'E',
        text: '"section Section 1"',
    }, {
        midiTime: 0,
        type: 'UNSUPPORTED',
        text: 'UNSUPPORTED',
    }],
    vocals: null,
    venue: null,
};
