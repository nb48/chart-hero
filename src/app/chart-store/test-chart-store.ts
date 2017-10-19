import { ChartFile } from '../chart-file/chart-file';
import {
    ChartStore,
    ChartStoreTrackEventType,
    ChartStoreTrackNoteType,
} from './chart-store';

export const TEST_CHART_FILE: ChartFile = {
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
    events: null,    
    vocals: null,
    venue: null,
};

export const TEST_CHART_STORE: ChartStore = {
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
    syncTrack: {
        events: [{
            id: 10,
            event: ChartStoreTrackEventType.BPMChange as ChartStoreTrackEventType.BPMChange,
            time: -0.1,
            bpm: 60,
        }, {
            id: 20,
            event: ChartStoreTrackEventType.BPMChange as ChartStoreTrackEventType.BPMChange,
            time: 3.4,
            bpm: 30,
        }],
        unsupported: [{
            midiTime: 9979,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        }],
    },
    events: {
        events: [],
        unsupported: [],
    },
    guitar: {
        expert: {
            events: [],
            unsupported: [],
        },
        hard: {
            events: [],
            unsupported: [],
        },
        medium: {
            events: [],
            unsupported: [],
        },
        easy: {
            events: [],
            unsupported: [],
        },
    },
    bass: {
        expert: {
            events: [],
            unsupported: [],
        },
        hard: {
            events: [],
            unsupported: [],
        },
        medium: {
            events: [],
            unsupported: [],
        },
        easy: {
            events: [],
            unsupported: [],
        },
    },
    drums: {
        expert: {
            events: [],
            unsupported: [],
        },
        hard: {
            events: [],
            unsupported: [],
        },
        medium: {
            events: [],
            unsupported: [],
        },
        easy: {
            events: [],
            unsupported: [],
        },
    },
    ghlGuitar: {
        expert: {
            events: [{
                id: 10,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 0.9,
                type: [ChartStoreTrackNoteType.GHLBlack1],
                length: 0,
            }, {
                id: 20,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 1.9,
                type: [ChartStoreTrackNoteType.GHLBlack2],
                length: 0.75,
            }, {
                id: 30,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 2.9,
                type: [ChartStoreTrackNoteType.GHLBlack3],
                length: 1,
            }, {
                id: 40,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 4.4,
                type: [ChartStoreTrackNoteType.GHLWhite1],
                length: 0,
            }, {
                id: 50,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 6.4,
                type: [ChartStoreTrackNoteType.GHLWhite2],
                length: 0,
            }, {
                id: 60,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 8.4,
                type: [ChartStoreTrackNoteType.GHLWhite3],
                length: 0,
            }, {
                id: 70,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 10.4,
                type: [],
                length: 0,
            }, {
                id: 80,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 12.4,
                type: [ChartStoreTrackNoteType.GHLBlack1, ChartStoreTrackNoteType.GHLWhite1],
                length: 0,
            }, {
                id: 90,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 14.4,
                type: [ChartStoreTrackNoteType.GHLWhite1],
                length: 1,
            }, {
                id: 100,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 14.4,
                type: [ChartStoreTrackNoteType.GHLWhite2],
                length: 0.5,
            }, {
                id: 110,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 16.4,
                type: [ChartStoreTrackNoteType.GHLWhite3],
                length: 1,
            }, {
                id: 120,
                event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                time: 16.4,
                type: [],
                length: 1,
            }],
            unsupported: [{
                midiTime: 9998,
                type: 'N',
                note: 9,
                length: 0,
            }, {
                midiTime: 9999,
                type: 'UNSUPPORTED',
                text: 'UNSUPPORTED',
            }],
        },
        hard: {
            events: [],
            unsupported: [],
        },
        medium: {
            events: [],
            unsupported: [],
        },
        easy: {
            events: [],
            unsupported: [],
        },
    },
    vocals: {
        events: [],
        unsupported: [],
    },
    venue: {
        events: [],
        unsupported: [],
    },
};
