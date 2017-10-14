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
        midiTime: 0,
        type: 'UNSUPPORTED',
        text: 'UNSUPPORTED',
    }],
    events: [{
        midiTime: 0,
        type: 'UNSUPPORTED',
        text: 'UNSUPPORTED',
    }],
    track: [{
        midiTime: 200,
        type: 'N',
        note: 3,
        length: 152,
    }, {
        midiTime: 400,
        type: 'N',
        note: 4,
        length: 0,
    }, {
        midiTime: 600,
        type: 'N',
        note: 8,
        length: 0,
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
        midiTime: 0,
        type: 'UNSUPPORTED',
        text: 'UNSUPPORTED',
    }],
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
        event: ChartStoreEventType.BPMChange as ChartStoreEventType.BPMChange,
        time: -0.1,
        bpm: 60,
    }, {
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 0.9,
        type: [ChartStoreNoteType.GHLBlack1],
        length: 152,
    }, {
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 1.9,
        type: [ChartStoreNoteType.GHLBlack2],
        length: 0,
    }, {
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 2.9,
        type: [ChartStoreNoteType.GHLBlack3],
        length: 0,
    }, {
        event: ChartStoreEventType.BPMChange as ChartStoreEventType.BPMChange,
        time: 3.4,
        bpm: 30,
    }, {
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 4.4,
        type: [ChartStoreNoteType.GHLWhite1],
        length: 0,
    }, {
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 6.4,
        type: [ChartStoreNoteType.GHLWhite2],
        length: 0,
    }, {
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 8.4,
        type: [ChartStoreNoteType.GHLWhite3],
        length: 0,
    }, {
        event: ChartStoreEventType.Note as ChartStoreEventType.Note,
        time: 10.4,
        type: [ChartStoreNoteType.GHLOpen],
        length: 0,
    }],
    unsupported: [{
        event: ChartStoreUnsupportedEventType.SyncTrack as ChartStoreUnsupportedEventType.SyncTrack,
        original: {
            midiTime: 0,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        },
    }, {
        event: ChartStoreUnsupportedEventType.Event as ChartStoreUnsupportedEventType.Event,
        original: {
            midiTime: 0,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        },
    }, {
        event: ChartStoreUnsupportedEventType.Track as ChartStoreUnsupportedEventType.Track,
        original: {
            midiTime: 0,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        },
    }],
};
