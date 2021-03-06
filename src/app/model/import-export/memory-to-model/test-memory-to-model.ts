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
        midiTime: 0,
        type: 'TS',
        value: 4,
    }, {
        midiTime: 700,
        type: 'B',
        value: 30000,
    }, {
        midiTime: 1000,
        type: 'TS',
        value: 8, 
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
            midiTime: 400,
            type: 'E',
            text: 'solo',
        },  {
            midiTime: 400,
            type: 'S',
            note: 2,
            length: 100,
        },{
            midiTime: 600,
            type: 'N',
            note: 2,
            length: 0,
        }, {
            midiTime: 600,
            type: 'N',
            note: 6,
            length: 0,
        }, {
            midiTime: 600,
            type: 'E',
            text: 'soloend',
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
            midiTime: 9996,
            type: 'E',
            text: 'invalid',
        }, {
            midiTime: 9997,
            type: 'S',
            note: 1,
            length: 0,
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
        midiTime: 200,
        type: 'E',
        text: '"section Section 1"',
    }, {
        midiTime: 400,
        type: 'E',
        text: '"invalid Section 2"',
    }, {
        midiTime: 600,
        type: 'E',
        text: '"phrase_start"'
    }, {
        midiTime: 800,
        type: 'E',
        text: '"lyric A"'
    }, {
        midiTime: 1000,
        type: 'E',
        text: '"lyric B="'
    }, {
        midiTime: 1200,
        type: 'E',
        text: '"lyric C"'
    }, {
        midiTime: 1400,
        type: 'E',
        text: '"phrase_end"'
    }, {
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
            event: ModelTrackEventType.TSChange as ModelTrackEventType.TSChange,
            time: -0.1,
            ts: 4,
        }, {
            id: 30,
            event: ModelTrackEventType.BPMChange as ModelTrackEventType.BPMChange,
            time: 3.4,
            bpm: 30,
        }, {
            id: 40,
            event: ModelTrackEventType.TSChange as ModelTrackEventType.TSChange,
            time: 6.4,
            ts: 8,
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
                id: 50,
                event: ModelTrackEventType.GuitarNote as ModelTrackEventType.GuitarNote,
                time: 0.9,
                type: [ModelTrackNoteType.GuitarGreen],
                length: 0,
                forceHopo: false,
                tap: false,
            }, {
                id: 60,
                event: ModelTrackEventType.GuitarNote as ModelTrackEventType.GuitarNote,
                time: 1.9,
                type: [ModelTrackNoteType.GuitarRed],
                length: 0,
                forceHopo: true,
                tap: false,
            }, {
                id: 70,
                event: ModelTrackEventType.GuitarNote as ModelTrackEventType.GuitarNote,
                time: 2.9,
                type: [ModelTrackNoteType.GuitarYellow],
                length: 0,
                forceHopo: false,
                tap: true,
            }, {
                id: 80,
                event: ModelTrackEventType.SoloToggle as ModelTrackEventType.SoloToggle,
                time: 1.9,
            }, {
                id: 90,
                event: ModelTrackEventType.SoloToggle as ModelTrackEventType.SoloToggle,
                time: 2.9,
            }, {
                id: 100,
                event: ModelTrackEventType.StarPowerToggle as ModelTrackEventType.StarPowerToggle,
                time: 1.9,
            }, {
                id: 110,
                event: ModelTrackEventType.StarPowerToggle as ModelTrackEventType.StarPowerToggle,
                time: 2.4,
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
                id: 120,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 0.9,
                type: [ModelTrackNoteType.GHLBlack1],
                length: 0,
                forceHopo: false,
                tap: false,
            }, {
                id: 130,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 1.9,
                type: [ModelTrackNoteType.GHLBlack2],
                length: 0.75,
                forceHopo: false,
                tap: false,
            }, {
                id: 140,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 2.9,
                type: [ModelTrackNoteType.GHLBlack3],
                length: 1,
                forceHopo: false,
                tap: false,
            }, {
                id: 150,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 4.4,
                type: [ModelTrackNoteType.GHLWhite1],
                length: 0,
                forceHopo: false,
                tap: false,
            }, {
                id: 160,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 6.4,
                type: [ModelTrackNoteType.GHLWhite2],
                length: 0,
                forceHopo: false,
                tap: false,
            }, {
                id: 170,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 8.4,
                type: [ModelTrackNoteType.GHLWhite3],
                length: 0,
                forceHopo: false,
                tap: false,
            }, {
                id: 180,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 10.4,
                type: [],
                length: 0,
                forceHopo: false,
                tap: false,
            }, {
                id: 190,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 12.4,
                type: [ModelTrackNoteType.GHLBlack1, ModelTrackNoteType.GHLWhite1],
                length: 0,
                forceHopo: false,
                tap: false,
            }, {
                id: 200,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 14.4,
                type: [ModelTrackNoteType.GHLWhite1],
                length: 1,
                forceHopo: false,
                tap: false,
            }, {
                id: 210,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 14.4,
                type: [ModelTrackNoteType.GHLWhite2],
                length: 0.5,
                forceHopo: false,
                tap: false,
            }, {
                id: 220,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 16.4,
                type: [ModelTrackNoteType.GHLWhite3],
                length: 1,
                forceHopo: false,
                tap: false,
            }, {
                id: 230,
                event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                time: 16.4,
                type: [],
                length: 1,
                forceHopo: false,
                tap: false,
            }],
            unsupported: [{
                midiTime: 9996,
                type: 'E',
                text: 'invalid',
            }, {
                midiTime: 9997,
                type: 'S',
                note: 1,
                length: 0,
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
        events: [{
            id: 240,
            event: ModelTrackEventType.PracticeSection as ModelTrackEventType.PracticeSection,
            time: 0.9,
            name: 'Section 1',
        }, {
            id: 250,
            event: ModelTrackEventType.LyricToggle as ModelTrackEventType.LyricToggle,
            time: 2.9,
        }, {
            id: 260,
            event: ModelTrackEventType.LyricToggle as ModelTrackEventType.LyricToggle,
            time: 10.4,
        }, {
            id: 270,
            event: ModelTrackEventType.Lyric as ModelTrackEventType.Lyric,
            time: 4.4,
            word: 'A',
            multiSyllable: false,
        }, {
            id: 280,
            event: ModelTrackEventType.Lyric as ModelTrackEventType.Lyric,
            time: 6.4,
            word: 'B',
            multiSyllable: true,
        }, {
            id: 290,
            event: ModelTrackEventType.Lyric as ModelTrackEventType.Lyric,
            time: 8.4,
            word: 'C',
            multiSyllable: false,
        }],
        unsupported: [{
            midiTime: 400,
            type: 'E',
            text: '"invalid Section 2"',
        }, {
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
