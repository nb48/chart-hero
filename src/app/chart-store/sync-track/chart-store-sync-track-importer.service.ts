import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileSyncTrack } from '../../chart-file/chart-file';
import { ChartStoreIdGeneratorService } from '../id-generator/chart-store-id-generator.service';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import {
    ChartStoreTrack,
    ChartStoreTrackEventType,
    ChartStoreTrackBPMChange,
} from '../chart-store';

export const defaultSyncTrack = (): ChartFileSyncTrack => ({
    midiTime: 0,
    type: 'B',
    value: 120000,
});

@Injectable()
export class ChartStoreSyncTrackImporterService {

    constructor(
        private idGenerator: ChartStoreIdGeneratorService,
        private midiTimeService: ChartStoreMidiTimeService,
    ) {
    }

    import(st: ChartFileSyncTrack[], resolution: number, offset: number): ChartStoreTrack {
        this.midiTimeService.clearCache();
        return {
            events: [...this.importBPMChanges(st, resolution, offset)],
            unsupported: [...this.importUnsupportedSyncTrack(st)],
        };
    }

    private importBPMChanges(st: ChartFileSyncTrack[], resolution: number, offset: number)
        : ChartStoreTrackBPMChange[] {
        let syncTrack = st ? st.filter(e => e.type === 'B') : [defaultSyncTrack()];
        if (syncTrack.length === 0) {
            syncTrack = [defaultSyncTrack()];
        }
        return syncTrack.map((e) => {
            const time = this.midiTimeService.calculateTime(e.midiTime, resolution, syncTrack);
            return {    
                id: this.idGenerator.id(),
                event: ChartStoreTrackEventType.BPMChange as
                    ChartStoreTrackEventType.BPMChange,
                time: time + offset,
                bpm: e.value / 1000,
            };
        });
    }

    private importUnsupportedSyncTrack(st: ChartFileSyncTrack[]): ChartFileSyncTrack[] {
        return st ? st.filter(st => st.type !== 'B') : [];
    }
}
