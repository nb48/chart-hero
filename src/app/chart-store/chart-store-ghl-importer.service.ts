import { EventEmitter, Injectable } from '@angular/core';

import {
    ChartFile,
    ChartFileTrack,
} from '../chart-file/chart-file';
import {
    ChartStore,
    ChartStoreEventBPMChange,
    ChartStoreEventNote,
    ChartStoreEventType,
    ChartStoreMetadata,
    ChartStoreNoteType,
    ChartStoreUnsupportedEvent,
    ChartStoreUnsupportedEventType,
} from './chart-store';
import { ChartStoreMidiTimeService } from './chart-store-midi-time.service';

const supportedNotes = [0, 1, 2, 3, 4, 7, 8];

const noteType = (notes: number[]): ChartStoreNoteType[] => {
    if (notes[0] === 7) {
        return [];
    }
    return notes.map((note) => {
        switch (note) {
        case 3:
            return ChartStoreNoteType.GHLBlack1;
        case 4:
            return ChartStoreNoteType.GHLBlack2;
        case 8:
            return ChartStoreNoteType.GHLBlack3;
        case 0:
            return ChartStoreNoteType.GHLWhite1;
        case 1:
            return ChartStoreNoteType.GHLWhite2;
        case 2:
            return ChartStoreNoteType.GHLWhite3;
        }
    });
};

const idIncrement = 10;

@Injectable()
export class ChartStoreGHLImporterService {

    nextId: number;

    constructor(private midiTimeService: ChartStoreMidiTimeService) {
    }

    import(cf: ChartFile): ChartStore {
        this.nextId = 10;
        this.midiTimeService.clearCache();
        return {
            metadata: cf.metadata as ChartStoreMetadata[],
            events: [
                ...this.importBPMChanges(cf),
                ...this.importNotes(cf),
            ],
            unsupported: [
                ...this.importUnsupportedSyncTrack(cf),
                ...this.importUnsupportedEvents(cf),
                ...this.importUnsupportedTrack(cf),
            ],
        };
    }

    private importBPMChanges(cf: ChartFile): ChartStoreEventBPMChange[] {
        const syncTrack = cf.syncTrack.filter(st => st.type === 'B');
        const resolution = this.getResolution(cf);
        const offset = this.getOffset(cf);
        return syncTrack.map((st) => {
            const time = this.midiTimeService.calculateTime(st.midiTime, resolution, syncTrack);
            const id = this.nextId;
            this.nextId += idIncrement;
            return {
                id,
                event: ChartStoreEventType.BPMChange as ChartStoreEventType.BPMChange,
                time: time + offset,
                bpm: st.value / 1000,
            };
        });
    }

    private importNotes(cf: ChartFile): ChartStoreEventNote[] {
        const syncTrack = cf.syncTrack.filter(st => st.type === 'B');
        const resolution = this.getResolution(cf);
        const offset = this.getOffset(cf);
        const groupedNotes = this.groupNotes(cf);
        return this.groupNotes(cf)
            .map((notes: ChartFileTrack[]) => {
                const midiTime = notes[0].midiTime;
                const time = this.midiTimeService.calculateTime(midiTime, resolution, syncTrack);
                const length = notes[0].length !== 0
                    ? this.midiTimeService.calculateTime
                        (midiTime + notes[0].length, resolution, syncTrack) - time
                    : 0;
                const type: ChartStoreNoteType[] = [];
                const id = this.nextId;
                this.nextId += idIncrement;
                return {
                    id,
                    length,
                    event: ChartStoreEventType.Note as ChartStoreEventType.Note,
                    time: time + offset,
                    type: noteType(notes.map(n => n.note)),
                };
            });
    }

    private groupNotes(cf: ChartFile): ChartFileTrack[][] {
        const times = new Map<number, ChartFileTrack[]>();
        cf.track
            .filter(t => t.type === 'N' && supportedNotes.indexOf(t.note) !== -1)
            .forEach((note) => {
                if (times.has(note.midiTime)) {
                    times.get(note.midiTime).push(note);
                } else {
                    times.set(note.midiTime, [note]);
                }
            });
        return [].concat.apply([], Array.from(times.values())
            .map((notes: ChartFileTrack[]) => {
                if (notes.every(note => note.length === notes[0].length) &&
                    notes.every(note => note.note !== 7)) {
                    return [notes];
                } else {
                    return notes.map(note => [note]);
                }
            }));
    }

    private importUnsupportedSyncTrack(cf: ChartFile): ChartStoreUnsupportedEvent[] {
        return cf.syncTrack
            .filter(st => st.type !== 'B')
            .map(original => ({
                original,
                event: ChartStoreUnsupportedEventType.SyncTrack as
                    ChartStoreUnsupportedEventType.SyncTrack,
            }));
    }

    private importUnsupportedEvents(cf: ChartFile): ChartStoreUnsupportedEvent[] {
        return cf.events
            .map(original => ({
                original,
                event: ChartStoreUnsupportedEventType.Event as
                    ChartStoreUnsupportedEventType.Event,
            }));
    }

    private importUnsupportedTrack(cf: ChartFile): ChartStoreUnsupportedEvent[] {
        return cf.track
            .filter(t => t.type !== 'N' || supportedNotes.indexOf(t.note) === -1)        
            .map(original => ({
                original,
                event: ChartStoreUnsupportedEventType.Track as
                    ChartStoreUnsupportedEventType.Track,
            }));
    }

    private getResolution(cf: ChartFile): number {
        const resolution = cf.metadata.find(m => m.name === 'Resolution');
        return resolution ? parseInt(resolution.value, 10) : 192;        
    }
    
    private getOffset(cf: ChartFile): number {
        const offset = cf.metadata.find(m => m.name === 'Offset');
        return offset ? parseFloat(offset.value) : 0;        
    }
}
