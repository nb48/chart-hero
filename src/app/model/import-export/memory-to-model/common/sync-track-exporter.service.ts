import { EventEmitter, Injectable } from '@angular/core';

import {
    ModelTrack,
    ModelTrackEventType,
    ModelTrackBPMChange,
    ModelTrackTSChange,
} from '../../../model';
import { MemorySyncTrack } from '../../memory';
import { MidiTimeService } from '../util/midi-time.service';

@Injectable()
export class SyncTrackExporterService {

    constructor(private midiTimeService: MidiTimeService) {
    }

    export(st: ModelTrack, resolution: number, offset: number): MemorySyncTrack[] {
        this.midiTimeService.clearCache();
        const bpmChanges = this.filterBPMChanges(st, offset);
        const tsChanges = this.filterTSChanges(st, offset);
        return [
            ...this.exportBPMChanges(st, bpmChanges, resolution),
            ...this.exportTSChanges(st, tsChanges, bpmChanges, resolution),
            ...st.unsupported,
        ].sort((a, b) => a.midiTime - b.midiTime);
    }

    private filterBPMChanges(st: ModelTrack, offset: number): ModelTrackBPMChange[] {
        return st.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .map(e => ({
                id: e.id,
                event: e.event,
                time: e.time - offset,
                bpm: e.bpm,
            } as ModelTrackBPMChange));
    }

    private filterTSChanges(st: ModelTrack, offset: number): ModelTrackTSChange[] {
        return st.events
            .filter(e => e.event === ModelTrackEventType.TSChange)
            .map(e => e as ModelTrackTSChange)
            .map(e => ({
                id: e.id,
                event: e.event,
                time: e.time - offset,
                ts: e.ts,
            } as ModelTrackTSChange));
    }

    private exportBPMChanges(
        st: ModelTrack,
        bpmChanges: ModelTrackBPMChange[],
        resolution: number,
    ) : MemorySyncTrack[] {
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

    private exportTSChanges(
        st: ModelTrack,
        tsChanges: ModelTrackTSChange[],
        bpmChanges: ModelTrackBPMChange[],
        resolution: number,
    ) : MemorySyncTrack[] {
        return tsChanges.map((e) => {
            const time = e.time;
            const midiTime = this.midiTimeService.calculateMidiTime(time, resolution, bpmChanges);
            return {
                midiTime,
                type: 'TS',
                value: e.ts,
            };
        });
    }
}
