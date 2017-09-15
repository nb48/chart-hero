
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
    return 1000 / (60000 / (bpm * resolution));
};

const findLastBPMChange = (time: number, bpmChanges: BPMChange[], type: string): BPMChange => {
    if (bpmChanges.length === 0) {
        return defaultBPMChange;
    }
    const nextChangeIndex = bpmChanges.findIndex(change => change[type] > time);
    const lastChangeIndex = nextChangeIndex === -1 ? 0 : nextChangeIndex - 1;
    return bpmChanges[lastChangeIndex];
};

export const convertTimeToMidiTime = (time: number, bpmChanges: BPMChange[]) => {
    const lastChange = findLastBPMChange(time, bpmChanges, 'time');
    const timeSinceLastBPMChange = time - lastChange.time;
    const midiTimeSinceLastBPMChange = timeSinceLastBPMChange *
        conversionFactor(lastChange.bpm, 192);
    return lastChange.midiTime + midiTimeSinceLastBPMChange;
};

export const convertMidiTimeToTime = (midiTime: number, bpmChanges: BPMChange[]) => {
    const lastChange = findLastBPMChange(midiTime, bpmChanges, 'midiTime');
    const midiTimeSinceLastBPMChange = midiTime - lastChange.midiTime;
    const timeSinceLastBPMChange = midiTimeSinceLastBPMChange /
        conversionFactor(lastChange.bpm, 192);
    return lastChange.time + timeSinceLastBPMChange;
};

export const formatMidiTime = (midiTime: number): string => {
    return `${midiTime}`.split('.')[0]; 
};
