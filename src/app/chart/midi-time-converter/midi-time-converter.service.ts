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

const conversionFactor = (bpm: number, resolution: number): number => {
    return bpm * resolution / 60;
};

@Injectable()
export class MidiTimeConverterService {

    private $bpmChanges: BPMChange[];
    private $resolution: number;

    constructor() {
        this.$bpmChanges = [];
        this.$resolution = 192;
    }

    setup(metadata: Map<string, string>): void {
        this.$bpmChanges = [];
        this.$resolution = metadata.has('Resolution')
            ? parseInt(metadata.get('Resolution'), 10)
            : 192;
    }

    addBPMChange(time: number, midiTime: number, bpm: number): void {
        this.$bpmChanges.push({ time, midiTime, bpm });
    }

    calculateTime(midiTime: number): number {
        const lastChange = this.findLastBPMChange(midiTime, 'midiTime');
        const midiTimeSinceLastBPMChange = midiTime - lastChange.midiTime;
        const timeSinceLastBPMChange = midiTimeSinceLastBPMChange /
            conversionFactor(lastChange.bpm, this.$resolution);
        return lastChange.time + timeSinceLastBPMChange;
    }

    calculateMidiTime(time: number): number {
        const lastChange = this.findLastBPMChange(time, 'time');
        const timeSinceLastBPMChange = time - lastChange.time;
        const midiTimeSinceLastBPMChange = timeSinceLastBPMChange *
            conversionFactor(lastChange.bpm, this.$resolution);
        return lastChange.midiTime + midiTimeSinceLastBPMChange;
    }

    formatMidiTime(midiTime: number): string {
        return `${midiTime}`.split('.')[0]; 
    }

    private findLastBPMChange (time: number, type: string): BPMChange {
        if (this.$bpmChanges.length === 0) {
            return defaultBPMChange;
        }
        const nextChangeIndex = this.$bpmChanges.findIndex(change => change[type] > time);
        const lastChangeIndex = nextChangeIndex === -1 ? 0 : nextChangeIndex - 1;
        return this.$bpmChanges[lastChangeIndex];
    }
}
