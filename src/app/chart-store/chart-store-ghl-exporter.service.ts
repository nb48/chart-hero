import { EventEmitter, Injectable } from '@angular/core';

import {
    ChartFile,
    ChartFileEvent,
    ChartFileMetadata,
    ChartFileSyncTrack,
    ChartFileTrack,
} from '../chart-file/chart-file';
import {
    ChartStore,
    ChartStoreEventBPMChange,
    ChartStoreEventNote,
    ChartStoreEventType,
    ChartStoreMetadata,
    ChartStoreNoteType,
    ChartStoreUnsupportedEventType,
} from './chart-store';
import { ChartStoreMidiTimeService } from './chart-store-midi-time.service';

const noteValue = (note: ChartStoreNoteType): number => {
    switch (note) {
    case ChartStoreNoteType.GHLBlack1:
        return 3;
    case ChartStoreNoteType.GHLBlack2:
        return 4;
    case ChartStoreNoteType.GHLBlack3:
        return 8;
    case ChartStoreNoteType.GHLWhite1:
        return 0;
    case ChartStoreNoteType.GHLWhite2:
        return 1;
    case ChartStoreNoteType.GHLWhite3:
        return 2;
    }
};

@Injectable()
export class ChartStoreGHLExporterService {

    constructor(private midiTimeService: ChartStoreMidiTimeService) {
    }

    export(cs: ChartStore): ChartFile {
        this.midiTimeService.clearCache();
        return {
            metadata: cs.metadata as ChartFileMetadata[],
            syncTrack: [
                ...this.exportBPMChanges(cs),
                ...this.exportUnsupportedSyncTrack(cs),
            ].sort((a, b) => a.midiTime - b.midiTime),
            events: [
                ...this.exportUnsupportedEvents(cs),
            ].sort((a, b) => a.midiTime - b.midiTime),
            track: [
                ...this.exportNotes(cs),
                ...this.exportUnsupportedTrack(cs),
            ].sort((a, b) => a.midiTime - b.midiTime),
        };
    }

    private exportBPMChanges(cs: ChartStore): ChartFileSyncTrack[] {
        const resolution = this.getResolution(cs);
        const offset = this.getOffset(cs);
        const bpmChanges = this.removeBPMChangeOffset(cs, offset);
        return bpmChanges.map((bc) => {
            const time = bc.time;
            const midiTime = this.midiTimeService.calculateMidiTime(time, resolution, bpmChanges);
            return {
                midiTime,
                type: 'B',
                value: bc.bpm * 1000,
            };
        });
    }

    private exportNotes(cs: ChartStore): ChartFileTrack[] {
        const resolution = this.getResolution(cs);
        const offset = this.getOffset(cs);
        const bpmChanges = this.removeBPMChangeOffset(cs, offset);
        return [].concat.apply([], cs.events
            .filter(e => e.event === ChartStoreEventType.Note)
            .map(e => e as ChartStoreEventNote)
            .map((n) => {
                const time = n.time - offset;
                const midiTime =
                    this.midiTimeService.calculateMidiTime(time, resolution, bpmChanges);
                const length = n.length !== 0
                    ? this.midiTimeService.calculateMidiTime
                        (time + n.length, resolution, bpmChanges) - midiTime
                    : 0;
                if (n.type.length === 0) {
                    return [{
                        length,
                        midiTime,
                        type: 'N',
                        note: 7,
                    }];
                }
                return n.type.map((type) => {
                    return {
                        length,
                        midiTime,
                        type: 'N',
                        note: noteValue(type),
                    };
                });
            }));
    }

    private exportUnsupportedSyncTrack(cs: ChartStore): ChartFileSyncTrack[] {
        return cs.unsupported
            .filter(u => u.event === ChartStoreUnsupportedEventType.SyncTrack)
            .map(u => u.original as ChartFileSyncTrack);
    }

    private exportUnsupportedEvents(cs: ChartStore): ChartFileEvent[] {
        return cs.unsupported
            .filter(u => u.event === ChartStoreUnsupportedEventType.Event)
            .map(u => u.original as ChartFileEvent);
    }

    private exportUnsupportedTrack(cs: ChartStore): ChartFileTrack[] {
        return cs.unsupported
            .filter(u => u.event === ChartStoreUnsupportedEventType.Track)
            .map(u => u.original as ChartFileTrack);
    }

    private removeBPMChangeOffset(cs: ChartStore, offset: number): ChartStoreEventBPMChange[] {
        return cs.events
            .filter(e => e.event === ChartStoreEventType.BPMChange)
            .map(e => e as ChartStoreEventBPMChange)
            .map(e => ({
                id: e.id,
                event: e.event as ChartStoreEventType.BPMChange,
                time: e.time - offset,
                bpm: e.bpm,
            }));
    }

    private getResolution(cs: ChartStore): number {
        const resolution = cs.metadata.find(m => m.name === 'Resolution');
        return resolution ? parseInt(resolution.value, 10) : 192;        
    }
    
    private getOffset(cs: ChartStore): number {
        const offset = cs.metadata.find(m => m.name === 'Offset');
        return offset ? parseFloat(offset.value) : 0;        
    }
}
