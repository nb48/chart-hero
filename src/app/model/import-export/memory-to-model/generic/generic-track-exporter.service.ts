import { EventEmitter, Injectable } from '@angular/core';

import {
    ModelTrack,
    ModelTrackEventType,
    ModelTrackBPMChange,
    ModelTrackNote,
    ModelTrackNoteType,
} from '../../../model';
import { MemoryTrack } from '../../memory';
import { MidiTimeService } from '../util/midi-time.service';

export type NoteExporter = (note: ModelTrackNoteType) => number;

@Injectable()
export class GenericTrackExporterService {

    constructor(private midiTimeService: MidiTimeService) {
    }

    export(
        track: ModelTrack,
        syncTrack: ModelTrack,
        resolution: number,
        offset: number,
        noteExporter: NoteExporter,
    ): MemoryTrack[] {
        if (track.events.length === 0 && track.unsupported.length === 0) {
            return null;
        }
        this.midiTimeService.clearCache();
        return [
            ...this.exportNotes(track, syncTrack, resolution, offset, noteExporter),
            ...track.unsupported,
        ].sort((a, b) => a.midiTime - b.midiTime);
    }

    private exportNotes(
        track: ModelTrack,
        st: ModelTrack,
        resolution: number,
        offset: number,
        noteExporter: NoteExporter,
    ): MemoryTrack[] {
        const bpmChanges = st.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .map(e => ({
                id: e.id,
                event: e.event,
                time: e.time - offset,
                bpm: e.bpm,
            } as ModelTrackBPMChange));
        return [].concat.apply([], track.events
            .filter(e => e.event === ModelTrackEventType.GuitarNote
                || e.event === ModelTrackEventType.GHLNote)
            .map(e => e as ModelTrackNote)
            .map((n) => {
                const time = n.time - offset;
                const midiTime =
                    this.midiTimeService.calculateMidiTime(time, resolution, bpmChanges);
                const length = n.length !== 0
                    ? this.midiTimeService.calculateMidiTime
                        (time + n.length, resolution, bpmChanges) - midiTime
                    : 0;
                if (n.type.length === 0) {
                    return [{
                        length,
                        midiTime,
                        type: 'N',
                        note: 7,
                    }];
                }
                return n.type.map((type) => {
                    return {
                        length,
                        midiTime,
                        type: 'N',
                        note: noteExporter(type),
                    };
                });
            }));
    }
}
