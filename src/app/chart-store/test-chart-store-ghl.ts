import { ChartFile } from '../chart-file/chart-file';
import {
    ChartStore,
    ChartStoreEventType,
    ChartStoreNoteType,
    ChartStoreUnsupportedEventType,
} from './chart-store';

export const TEST_GHL_FILE: ChartFile = {
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
        midiTime: 700,
        type: 'B',
        value: 30000,
    }, {
        midiTime: 9979,
        type: 'UNSUPPORTED',
        text: 'UNSUPPORTED',
    }],
    events: [{
        midiTime: 9989,
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
            note: 3,
            length: 0,
        }, {
            midiTime: 400,
            type: 'N',
            note: 4,
            length: 150,
        }, {
            midiTime: 600,
            type: 'N',
            note: 8,
            length: 150,
        }, {
            midiTime: 800,
            type: 'N',
            note: 0,
            length: 0,
        }, {
            midiTime: 1000,
            type: 'N',
            note: 1,
            length: 0,
        }, {
            midiTime: 1200,
            type: 'N',
            note: 2,
            length: 0,
        }, {
            midiTime: 1400,
            type: 'N',
            note: 7,
            length: 0,
        }, {
            midiTime: 1600,
            type: 'N',
            note: 3,
            length: 0,
        }, {
            midiTime: 1600,
            type: 'N',
            note: 0,
            length: 0,
        }, {
            midiTime: 1800,
            type: 'N',
            note: 0,
            length: 100,
        }, {
            midiTime: 1800,
            type: 'N',
            note: 1,
            length: 50,
        }, {
            midiTime: 2000,
            type: 'N',
            note: 2,
            length: 100,
        }, {
            midiTime: 2000,
            type: 'N',
            note: 7,
            length: 100,
        }, {
            midiTime: 9998,
            type: 'N',
            note: 9,
            length: 0, 
        }, {
            midiTime: 9999,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        }],
        hard: null,
        medium: null,
        easy: null,
    },
    vocals: null,
    venue: null,
};

export const TEST_GHL_STORE: ChartStore = {
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
    events: [{
        id: 10,
        event: ChartStoreEventType.BPMChange as ChartStoreEventType.BPMChange,
        time: -0.1,
        bpm: 60,
    }, {
        id: 20,
        event: ChartStoreEventType.BPMChange as ChartStoreEventType.BPMChange,
        time: 3.4,
        bpm: 30,
    }, {
        id: 30,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 0.9,
        type: [ChartStoreNoteType.GHLBlack1],
        length: 0,
    }, {
        id: 40,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 1.9,
        type: [ChartStoreNoteType.GHLBlack2],
        length: 0.75,
    }, {
        id: 50,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 2.9,
        type: [ChartStoreNoteType.GHLBlack3],
        length: 1,
    }, {
        id: 60,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 4.4,
        type: [ChartStoreNoteType.GHLWhite1],
        length: 0,
    }, {
        id: 70,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 6.4,
        type: [ChartStoreNoteType.GHLWhite2],
        length: 0,
    }, {
        id: 80,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 8.4,
        type: [ChartStoreNoteType.GHLWhite3],
        length: 0,
    }, {
        id: 90,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 10.4,
        type: [],
        length: 0,
    }, {
        id: 100,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 12.4,
        type: [ChartStoreNoteType.GHLBlack1, ChartStoreNoteType.GHLWhite1],
        length: 0,
    }, {
        id: 110,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 14.4,
        type: [ChartStoreNoteType.GHLWhite1],
        length: 1,
    }, {
        id: 120,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 14.4,
        type: [ChartStoreNoteType.GHLWhite2],
        length: 0.5,
    }, {
        id: 130,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 16.4,
        type: [ChartStoreNoteType.GHLWhite3],
        length: 1,
    }, {
        id: 140,
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 16.4,
        type: [],
        length: 1,
    }],
    unsupported: [{
        event: ChartStoreUnsupportedEventType.SyncTrack as ChartStoreUnsupportedEventType.SyncTrack,
        original: {
            midiTime: 9979,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        },
    }, {
        event: ChartStoreUnsupportedEventType.Event as ChartStoreUnsupportedEventType.Event,
        original: {
            midiTime: 9989,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        },
    }, {
        event: ChartStoreUnsupportedEventType.Track as ChartStoreUnsupportedEventType.Track,
        original: {
            midiTime: 9998,
            type: 'N',
            note: 9,
            length: 0,
        },
    }, {
        event: ChartStoreUnsupportedEventType.Track as ChartStoreUnsupportedEventType.Track,
        original: {
            midiTime: 9999,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        },
    }],
};
