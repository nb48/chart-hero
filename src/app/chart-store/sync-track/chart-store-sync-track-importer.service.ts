import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileSyncTrack } from '../../chart-file/chart-file';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import {
    ChartStoreTrack,
    ChartStoreTrackEventType,
    ChartStoreTrackBPMChange,
} from '../chart-store';

const idIncrement = 10;

@Injectable()
export class ChartStoreSyncTrackImporterService {

    nextId: number;

    constructor(private midiTimeService: ChartStoreMidiTimeService) {
    }

    import(st: ChartFileSyncTrack[], resolution: number, offset: number): ChartStoreTrack {
        this.nextId = 10;
        this.midiTimeService.clearCache();
        return {
            events: [...this.importBPMChanges(st, resolution, offset)],
            unsupported: [...this.importUnsupportedSyncTrack(st)],
        };
    }

    private importBPMChanges(st: ChartFileSyncTrack[], resolution: number, offset: number)
        : ChartStoreTrackBPMChange[] {
        const syncTrack = st.filter(e => e.type === 'B');
        return syncTrack.map((e) => {
            const time = this.midiTimeService.calculateTime(e.midiTime, resolution, syncTrack);
            const id = this.nextId;
            this.nextId += idIncrement;
            return {    
                id,
                event: ChartStoreTrackEventType.BPMChange as
                    ChartStoreTrackEventType.BPMChange,
                time: time + offset,
                bpm: e.value / 1000,
            };
        });
    }

    private importUnsupportedSyncTrack(cf: ChartFileSyncTrack[]): ChartFileSyncTrack[] {
        return cf.filter(st => st.type !== 'B');
    }
}
