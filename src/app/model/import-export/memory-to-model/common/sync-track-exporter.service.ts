import { EventEmitter, Injectable } from '@angular/core';

import { ModelTrack, ModelTrackEventType, ModelTrackBPMChange } from '../../../model';
import { MemorySyncTrack } from '../../memory';
import { MidiTimeService } from '../util/midi-time.service';

@Injectable()
export class SyncTrackExporterService {

    constructor(private midiTimeService: MidiTimeService) {
    }

    export(st: ModelTrack, resolution: number, offset: number): MemorySyncTrack[] {
        this.midiTimeService.clearCache();
        return [
            ...this.exportBPMChanges(st, resolution, offset),
            ...st.unsupported,
        ].sort((a, b) => a.midiTime - b.midiTime);
    }

    private exportBPMChanges(st: ModelTrack, resolution: number, offset: number)
        : MemorySyncTrack[] {
        const bpmChanges = st.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .map(e => ({
                id: e.id,
                event: e.event,
                time: e.time - offset,
                bpm: e.bpm,
            } as ModelTrackBPMChange));
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
