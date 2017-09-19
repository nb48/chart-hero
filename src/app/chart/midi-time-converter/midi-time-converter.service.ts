import { Injectable } from '@angular/core';

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

const conversionFactor = (bpm: number): number => {
    return bpm * 192 / 60;
};

@Injectable()
export class MidiTimeConverterService {

    private $bpmChanges: BPMChange[];

    constructor() {
        this.$bpmChanges = [];
    }

    clearBPMChanges(): void {
        this.$bpmChanges = [];
    }

    addBPMChange(time: number, midiTime: number, bpm: number): void {
        this.$bpmChanges.push({ time, midiTime, bpm });
    }

    calculateTime(midiTime: number): number {
        const lastChange = this.findLastBPMChange(midiTime, this.$bpmChanges, 'midiTime');
        const midiTimeSinceLastBPMChange = midiTime - lastChange.midiTime;
        const timeSinceLastBPMChange = midiTimeSinceLastBPMChange /
            conversionFactor(lastChange.bpm);
        return lastChange.time + timeSinceLastBPMChange;
    }

    calculateMidiTime(time: number): number {
        const lastChange = this.findLastBPMChange(time, this.$bpmChanges, 'time');
        const timeSinceLastBPMChange = time - lastChange.time;
        const midiTimeSinceLastBPMChange = timeSinceLastBPMChange *
            conversionFactor(lastChange.bpm);
        return lastChange.midiTime + midiTimeSinceLastBPMChange;
    }

    formatMidiTime(midiTime: number): string {
        return `${midiTime}`.split('.')[0]; 
    }

    private findLastBPMChange (time: number, bpmChanges: BPMChange[], type: string): BPMChange {
        if (bpmChanges.length === 0) {
            return defaultBPMChange;
        }
        const nextChangeIndex = bpmChanges.findIndex(change => change[type] > time);
        const lastChangeIndex = nextChangeIndex === -1 ? 0 : nextChangeIndex - 1;
        return bpmChanges[lastChangeIndex];
    }
}
