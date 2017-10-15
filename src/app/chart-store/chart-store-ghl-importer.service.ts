import { EventEmitter, Injectable } from '@angular/core';

import { ChartFile } from '../chart-file/chart-file';
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

const noteType = (note: number): ChartStoreNoteType => {
    switch (note) {
    case 7:
        return ChartStoreNoteType.GHLBlack1;
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
};

@Injectable()
export class ChartStoreGHLImporterService {

    constructor(private midiTimeService: ChartStoreMidiTimeService) {
    }

    import(cf: ChartFile): ChartStore {
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
            return {
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
        return cf.track
            .filter(t => t.type === 'N' && supportedNotes.indexOf(t.note) !== -1)
            .map((t) => {
                const time = this.midiTimeService.calculateTime(t.midiTime, resolution, syncTrack);
                const length = t.length !== 0
                    ? this.midiTimeService.calculateTime
                        (t.midiTime + t.length, resolution, syncTrack) - time
                    : 0;
                return {
                    length,
                    event: ChartStoreEventType.Note as ChartStoreEventType.Note,
                    time: time + offset,
                    type: [noteType(t.note)],
                };
            });
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
