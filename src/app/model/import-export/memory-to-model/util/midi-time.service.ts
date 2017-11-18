import { Injectable } from '@angular/core';

import { roundTime } from '../../../actions/actions.service';
import { ModelTrackBPMChange } from '../../../model';
import { MemorySyncTrack } from '../../memory';

const conversionFactor = (bpm: number, resolution: number): number => {
    return bpm * resolution / 60;
};

@Injectable()
export class MidiTimeService {

    private timeCache: Map<number, number>;
    private midiTimeCache: Map<number, number>;

    constructor() {
        this.clearCache();
    }

    clearCache(): void {
        this.timeCache = new Map<number, number>();
        this.midiTimeCache = new Map<number, number>();
    }

    calculateTime(midiTime: number, resolution: number, syncTrack: MemorySyncTrack[]): number {
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
            const result = roundTime(timeUntilLatestChange + timeAfterLatestChange);
            this.timeCache.set(midiTime, result);
            return result;
        } else {
            const bpm: number = earlierChanges.length === 1 ? earlierChanges[0].value / 1000 : 1;
            const result = roundTime(midiTime / conversionFactor(bpm, resolution));
            this.timeCache.set(midiTime, result);
            return result;
        }
    }

    calculateMidiTime(time: number, resolution: number, bpmChanges: ModelTrackBPMChange[])
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
