import { ChartFile } from '../chart-file/chart-file';
import { ChartStore, ChartStoreEventType, ChartStoreNoteType } from './chart-store';

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
        type: 'TS',
        value: 4,
    }, {
        midiTime: 0,
        type: 'B',
        value: 60000,
    }],
    events: [],
    track: [{
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
        event: ChartStoreEventType.BPMChange,
        time: -0.1,
        bpm: 60,
    }, {
        event: ChartStoreEventType.TimeSignatureChange,
        time: -0.1,
        timeSignature: 4,
    }, {
        event: ChartStoreEventType.Note,
        time: 0.9,
        type: [ChartStoreNoteType.FBGreen],
    }, {
        event: ChartStoreEventType.Note,
        time: 1.9,
        type: [ChartStoreNoteType.FBRed],
    }, {
        event: ChartStoreEventType.Note,
        time: 2.9,
        type: [ChartStoreNoteType.FBYellow],
    }, {
        event: ChartStoreEventType.Note,
        time: 3.9,
        type: [ChartStoreNoteType.FBBlue],
    }, {
        event: ChartStoreEventType.Note,
        time: 4.9,
        type: [ChartStoreNoteType.FBOrange],
    }, {
        event: ChartStoreEventType.Note,
        time: 5.9,
        type: [ChartStoreNoteType.FBOpen],
    }],
};
