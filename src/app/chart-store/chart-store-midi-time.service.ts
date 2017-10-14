import { Injectable } from '@angular/core';

import { ChartFileSyncTrack } from '../chart-file/chart-file';
import { ChartStoreEventBPMChange, ChartStoreEventType } from './chart-store';

const conversionFactor = (bpm: number, resolution: number): number => {
    return bpm * resolution / 60;
};

@Injectable()
export class ChartStoreMidiTimeService {

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

    calculateMidiTime(time: number, resolution: number, bpmChanges: ChartStoreEventBPMChange[])
        : number {
        const earlierChanges = bpmChanges.filter(bc => bc.time < time);
        if (earlierChanges.length > 1) {
            const latestChange = earlierChanges.pop();
            const bpm = latestChange.bpm;
            const midiTimeUntilLatestChange =
                this.calculateMidiTime(latestChange.time, resolution, earlierChanges);
            const midiTimeAfterLatestChange =
                (time - latestChange.time) * conversionFactor(bpm, resolution);
            return midiTimeUntilLatestChange + midiTimeAfterLatestChange;
        } else {
            const bpm: number = earlierChanges.length === 1 ? earlierChanges[0].bpm : 1;
            return time * conversionFactor(bpm, resolution);
        }
    }
}
