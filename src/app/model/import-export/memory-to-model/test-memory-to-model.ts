import { Model, ModelTrackEventType, ModelTrackNoteType } from '../../model';
import { Memory } from '../memory';

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
        midiTime: 700,
        type: 'B',
        value: 30000,
    }, {
        midiTime: 9979,
        type: 'UNSUPPORTED',
        text: 'UNSUPPORTED',
    }],
    guitar: {
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
            type: 'N',
            note: 5,
            length: 0,
        }, {
            midiTime: 600,
            type: 'N',
            note: 2,
            length: 0,
        }],
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
    events: [{
        midiTime: 9989,
        type: 'UNSUPPORTED',
        text: 'UNSUPPORTED',
    }],    
    vocals: null,
    venue: null,
};

export const TEST_MODEL: Model = {
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
            event: ModelTrackEventType.BPMChange as ModelTrackEventType.BPMChange,
            time: -0.1,
            bpm: 60,
        }, {
            id: 20,
            event: ModelTrackEventType.BPMChange as ModelTrackEventType.BPMChange,
            time: 3.4,
            bpm: 30,
        }],
        unsupported: [{
            midiTime: 9979,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        }],
    },
    guitar: {
        expert: {
            events: [{
                id: 30,
                event: ModelTrackEventType.GuitarNote as ModelTrackEventType.GuitarNote,
                time: 0.9,
                type: [ModelTrackNoteType.GuitarGreen],
                length: 0,
                forceHopo: false,
            }, {
                id: 40,
                event: ModelTrackEventType.GuitarNote as ModelTrackEventType.GuitarNote,
                time: 1.9,
                type: [ModelTrackNoteType.GuitarRed],
                length: 0,
                forceHopo: true,
            }, {
                id: 50,
                event: ModelTrackEventType.GuitarNote as ModelTrackEventType.GuitarNote,
                time: 2.9,
                type: [ModelTrackNoteType.GuitarYellow],
                length: 0,
                forceHopo: false,
            }],
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
                id: 60,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 0.9,
                type: [ModelTrackNoteType.GHLBlack1],
                length: 0,
                forceHopo: false,
            }, {
                id: 70,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 1.9,
                type: [ModelTrackNoteType.GHLBlack2],
                length: 0.75,
                forceHopo: false,
            }, {
                id: 80,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 2.9,
                type: [ModelTrackNoteType.GHLBlack3],
                length: 1,
                forceHopo: false,
            }, {
                id: 90,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 4.4,
                type: [ModelTrackNoteType.GHLWhite1],
                length: 0,
                forceHopo: false,
            }, {
                id: 100,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 6.4,
                type: [ModelTrackNoteType.GHLWhite2],
                length: 0,
                forceHopo: false,
            }, {
                id: 110,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 8.4,
                type: [ModelTrackNoteType.GHLWhite3],
                length: 0,
                forceHopo: false,
            }, {
                id: 120,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 10.4,
                type: [],
                length: 0,
                forceHopo: false,
            }, {
                id: 130,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 12.4,
                type: [ModelTrackNoteType.GHLBlack1, ModelTrackNoteType.GHLWhite1],
                length: 0,
                forceHopo: false,
            }, {
                id: 140,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 14.4,
                type: [ModelTrackNoteType.GHLWhite1],
                length: 1,
                forceHopo: false,
            }, {
                id: 150,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 14.4,
                type: [ModelTrackNoteType.GHLWhite2],
                length: 0.5,
                forceHopo: false,
            }, {
                id: 160,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 16.4,
                type: [ModelTrackNoteType.GHLWhite3],
                length: 1,
                forceHopo: false,
            }, {
                id: 170,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 16.4,
                type: [],
                length: 1,
                forceHopo: false,
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
    events: {
        events: [],
        unsupported: [{
            midiTime: 9989,
            type: 'UNSUPPORTED',
            text: 'UNSUPPORTED',
        }],
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
