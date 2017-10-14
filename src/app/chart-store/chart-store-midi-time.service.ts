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
        const earlierChanges = syncTrack.filter(st => st.midiTime < midiTime);
        if (earlierChanges.length > 1) {
            const latestChange = earlierChanges.pop();
            const bpm = latestChange.value / 1000;
            let timeUntilLatestChange;
            if (this.timeCache.has(latestChange.midiTime)) {
                timeUntilLatestChange = this.timeCache.get(latestChange.midiTime);
            } else {
                timeUntilLatestChange =
                    this.calculateTime(latestChange.midiTime, resolution, earlierChanges);
                this.timeCache.set(latestChange.midiTime, timeUntilLatestChange);
            }
            const timeAfterLatestChange =
                (midiTime - latestChange.midiTime) / conversionFactor(bpm, resolution);
            return timeUntilLatestChange + timeAfterLatestChange;            
        } else {
            const bpm: number = earlierChanges.length === 1 ? earlierChanges[0].value / 1000 : 1;
            return midiTime / conversionFactor(bpm, resolution);
        }
    }

    calculateMidiTime(time: number, resolution: number, bpmChanges: ChartStoreEventBPMChange[])
        : number {
        const earlierChanges = bpmChanges.filter(bc => bc.time < time);
        if (earlierChanges.length > 1) {
            const latestChange = earlierChanges.pop();
            const bpm = latestChange.bpm;
            let midiTimeUntilLatestChange;
            if (this.midiTimeCache.has(latestChange.time)) {
                midiTimeUntilLatestChange = this.midiTimeCache.get(latestChange.time);
            } else {
                midiTimeUntilLatestChange =
                    this.calculateMidiTime(latestChange.time, resolution, earlierChanges);
                this.midiTimeCache.set(latestChange.time, midiTimeUntilLatestChange);
            }
            const midiTimeAfterLatestChange =
                (time - latestChange.time) * conversionFactor(bpm, resolution);
            return midiTimeUntilLatestChange + midiTimeAfterLatestChange;
        } else {
            const bpm: number = earlierChanges.length === 1 ? earlierChanges[0].bpm : 1;
            return time * conversionFactor(bpm, resolution);
        }
    }
}
