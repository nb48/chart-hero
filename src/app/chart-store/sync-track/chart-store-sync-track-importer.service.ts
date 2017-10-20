import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileSyncTrack } from '../../chart-file/chart-file';
import { ChartStoreIdGeneratorService } from '../id-generator/chart-store-id-generator.service';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import {
    ChartStoreTrack,
    ChartStoreTrackEventType,
    ChartStoreTrackBPMChange,
} from '../chart-store';

@Injectable()
export class ChartStoreSyncTrackImporterService {

    constructor(
        private idGenerator: ChartStoreIdGeneratorService,
        private midiTimeService: ChartStoreMidiTimeService,
    ) {
    }

    import(st: ChartFileSyncTrack[], resolution: number, offset: number): ChartStoreTrack {
        if (!st) {
            return {
                events: [this.defaultBPMChange()],
                unsupported: [],
            };
        }
        this.midiTimeService.clearCache();
        return {
            events: [...this.importBPMChanges(st, resolution, offset)],
            unsupported: [...this.importUnsupportedSyncTrack(st)],
        };
    }

    private importBPMChanges(st: ChartFileSyncTrack[], resolution: number, offset: number)
        : ChartStoreTrackBPMChange[] {
        const syncTrack = st.filter(e => e.type === 'B');
        if (syncTrack.length === 0) {
            return [this.defaultBPMChange()];
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

    private importUnsupportedSyncTrack(cf: ChartFileSyncTrack[]): ChartFileSyncTrack[] {
        return cf.filter(st => st.type !== 'B');
    }

    private defaultBPMChange(): ChartStoreTrackBPMChange {
        return {
            id: this.idGenerator.id(),
            event: ChartStoreTrackEventType.BPMChange as ChartStoreTrackEventType.BPMChange,
            time: 0,
            bpm: 120,
        };
    }
}
