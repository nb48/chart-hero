import { Injectable } from '@angular/core';

import { ChartFileSyncTrack } from '../chart-file/chart-file';
import { ChartStoreEventBPMChange, ChartStoreEventType } from './chart-store';

const conversionFactor = (bpm: number, resolution: number): number => {
    return bpm * resolution / 60;
};

@Injectable()
export class ChartStoreMidiTimeService {

    private timeCache: Map<number, number>;
    private midiTimeCache: Map<number, number>;

    constructor() {
        this.clearCache();
    }

    clearCache(): void {
        this.timeCache = new Map<number, number>();
        this.midiTimeCache = new Map<number, number>();
    }

    calculateBPMChanges(syncTrack: ChartFileSyncTrack[], resolution: number)
        : ChartStoreEventBPMChange[] {
        return syncTrack.map(st => ({
            event: ChartStoreEventType.BPMChange as ChartStoreEventType.BPMChange,
            time: this.calculateTime(st.midiTime, resolution, syncTrack),
            bpm: st.value / 1000,
        }));
    }

    calculateSyncTrack(bpmChanges: ChartStoreEventBPMChange[], resolution: number)
        : ChartFileSyncTrack[] {
        return bpmChanges.map(bc => ({
            type: 'B',
            midiTime: this.calculateMidiTime(bc.time, resolution, bpmChanges),
            value: bc.bpm * 1000,
        }));
    }

    calculateTime(midiTime: number, resolution: number, syncTrack: ChartFileSyncTrack[]): number {
        if (this.timeCache.has(midiTime)) {
            return this.timeCache.get(midiTime);
        }
        const earlierChanges = syncTrack.filter(st => st.midiTime < midiTime);
        if (earlierChanges.length > 1) {
            const latestChange = earlierChanges.pop();
            const bpm = latestChange.value / 1000;
            const timeUntilLatestChange =
                    this.calculateTime(latestChange.midiTime, resolution, earlierChanges);
            const timeAfterLatestChange =
                (midiTime - latestChange.midiTime) / conversionFactor(bpm, resolution);
            const result = timeUntilLatestChange + timeAfterLatestChange;
            this.timeCache.set(midiTime, result);
            return result;
        } else {
            const bpm: number = earlierChanges.length === 1 ? earlierChanges[0].value / 1000 : 1;
            const result = midiTime / conversionFactor(bpm, resolution);
            this.timeCache.set(midiTime, result);
            return result;
        }
    }

    calculateMidiTime(time: number, resolution: number, bpmChanges: ChartStoreEventBPMChange[])
        : number {
        if (this.midiTimeCache.has(time)) {
            return this.midiTimeCache.get(time);
        }
        const earlierChanges = bpmChanges.filter(bc => bc.time < time);
        if (earlierChanges.length > 1) {
            const latestChange = earlierChanges.pop();
            const bpm = latestChange.bpm;
            const midiTimeUntilLatestChange =
                    this.calculateMidiTime(latestChange.time, resolution, earlierChanges);
            const midiTimeAfterLatestChange =
                (time - latestChange.time) * conversionFactor(bpm, resolution);
            const result = midiTimeUntilLatestChange + midiTimeAfterLatestChange;
            this.midiTimeCache.set(time, result);
            return result;
        } else {
            const bpm: number = earlierChanges.length === 1 ? earlierChanges[0].bpm : 1;
            const result = time * conversionFactor(bpm, resolution);
            this.midiTimeCache.set(time, result);
            return result;
        }
    }
}
