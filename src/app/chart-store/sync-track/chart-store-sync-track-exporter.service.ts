import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileSyncTrack } from '../../chart-file/chart-file';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import {
    ChartStoreTrack,
    ChartStoreTrackEventType,
    ChartStoreTrackBPMChange,
} from '../chart-store';

@Injectable()
export class ChartStoreSyncTrackExporterService {

    constructor(private midiTimeService: ChartStoreMidiTimeService) {
    }

    export(st: ChartStoreTrack, resolution: number, offset: number): ChartFileSyncTrack[] {
        this.midiTimeService.clearCache();
        return [
            ...this.exportBPMChanges(st, resolution, offset),
            ...st.unsupported,
        ].sort((a, b) => a.midiTime - b.midiTime);
    }

    private exportBPMChanges(st: ChartStoreTrack, resolution: number, offset: number)
        : ChartFileSyncTrack[] {
        const bpmChanges = st.events
            .filter(e => e.event === ChartStoreTrackEventType.BPMChange)
            .map(e => e as ChartStoreTrackBPMChange)
            .map(e => ({
                id: e.id,
                event: e.event,
                time: e.time - offset,
                bpm: e.bpm,
            } as ChartStoreTrackBPMChange));
        return bpmChanges.map((e) => {
            const time = e.time;
            const midiTime = this.midiTimeService.calculateMidiTime(time, resolution, bpmChanges);
            return {
                midiTime,
                type: 'B',
                value: e.bpm * 1000,
            };
        });
    }
}
