import { Injectable } from '@angular/core';

import { ChartFileSyncTrack } from '../chart-file/chart-file';
import { ChartStoreBPMChangeEvent, ChartStoreEventType } from './chart-store';

export interface BPMChange {
    time: number;
    midiTime: number;
    bpm: number;
}

const defaultBPMChange: BPMChange = {
    time: 0,
    midiTime: 0,
    bpm: 1,
};

const conversionFactor = (bpm: number, resolution: number): number => {
    return bpm * resolution / 60;
};

@Injectable()
export class ChartStoreMidiTimeService {

    private $bpmChanges: BPMChange[];

    constructor() {
        this.$bpmChanges = [];
    }

    calculateBPMChanges(syncTrack: ChartFileSyncTrack[], resolution: number)
        : ChartStoreBPMChangeEvent[] {
        return syncTrack.map(st => ({
            event: ChartStoreEventType.BPMChange as ChartStoreEventType.BPMChange,
            time: this.calculateTime(st.midiTime, resolution, syncTrack),
            bpm: st.value / 1000,
        }));
    }

    calculateSyncTrack(bpmChangeEvents: ChartStoreBPMChangeEvent[], resolution: number)
        : ChartFileSyncTrack[] {
        return [];
    }

    calculateTime(midiTime: number, resolution: number, syncTrack: ChartFileSyncTrack[]): number {
        const earlierChanges = syncTrack.filter(st => st.midiTime < midiTime);
        if (earlierChanges.length > 1) {
            const latestChange = earlierChanges.pop();
            const bpm = latestChange.value / 1000;
            const timeUntilLatestChange =
                this.calculateTime(latestChange.midiTime, resolution, earlierChanges);
            const timeAfterLatestChange =
                (midiTime - latestChange.midiTime) / conversionFactor(bpm, resolution);
            return timeUntilLatestChange + timeAfterLatestChange;            
        } else {
            const bpm: number = earlierChanges.length === 1 ? earlierChanges[0].value / 1000 : 1;
            return midiTime / conversionFactor(bpm, resolution);
        }
    }

    calculateMidiTime(time: number, resolution: number, bpmChanges: ChartStoreBPMChangeEvent[])
        : number {
        return 0;
    }

    // calculateMidiTime(time: number, resolution: number): number {
    //     const lastChange = this.findLastBPMChange(time, 'time');
    //     const timeSinceLastBPMChange = time - lastChange.time;
    //     const midiTimeSinceLastBPMChange = timeSinceLastBPMChange *
    //         conversionFactor(lastChange.bpm, resolution);
    //     return lastChange.midiTime + midiTimeSinceLastBPMChange;
    // }

    // private findLastBPMChange(time: number, type: string): BPMChange {
    //     if (this.$bpmChanges.length === 0) {
    //         return defaultBPMChange;
    //     }
    //     const nextChangeIndex = this.$bpmChanges.findIndex(change => change[type] > time);
    //     const lastChangeIndex = nextChangeIndex === -1 ? 0 : nextChangeIndex - 1;
    //     return this.$bpmChanges[lastChangeIndex];
    // }
}
