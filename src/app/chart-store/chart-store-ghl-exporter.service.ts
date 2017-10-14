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
    ChartStoreUnsupportedEventEvent,
    ChartStoreUnsupportedEventSyncTrack,
    ChartStoreUnsupportedEventTrack,
    ChartStoreUnsupportedEventType,
} from './chart-store';
import { ChartStoreMidiTimeService } from './chart-store-midi-time.service';

@Injectable()
export class ChartStoreGHLExporterService {

    constructor(private midiTimeService: ChartStoreMidiTimeService) {
    }

    export(cs: ChartStore): ChartFile {
        return {
            metadata: cs.metadata as ChartFileMetadata[],
            syncTrack: [
                ...this.exportBPMChanges(cs),
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
        return [];
    }

    private exportNotes(cs: ChartStore): ChartFileTrack[] {
        return [];
    }

    private exportUnsupportedSyncTrack(cs: ChartStore): ChartFileSyncTrack[] {
        return [];
    }

    private exportUnsupportedEvents(cs: ChartStore): ChartFileEvent[] {
        return [];
    }

    private exportUnsupportedTrack(cs: ChartStore): ChartFileTrack[] {
        return [];
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
