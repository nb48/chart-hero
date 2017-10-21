
import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileTrack } from '../../chart-file/chart-file';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import {
    ChartStoreTrack,
    ChartStoreTrackEventType,
    ChartStoreTrackBPMChange,
    ChartStoreTrackNote,
    ChartStoreTrackNoteType,
} from '../chart-store';

export type NoteExporter = (note: ChartStoreTrackNoteType) => number;

@Injectable()
export class ChartStoreGenericExporterService {

    constructor(private midiTimeService: ChartStoreMidiTimeService) {
    }

    export(
        track: ChartStoreTrack,
        syncTrack: ChartStoreTrack,
        resolution: number,
        offset: number,
        noteExporter: NoteExporter,
    ): ChartFileTrack[] {
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
        track: ChartStoreTrack,
        st: ChartStoreTrack,
        resolution: number,
        offset: number,
        noteExporter: NoteExporter,
    ): ChartFileTrack[] {
        const bpmChanges = st.events
            .filter(e => e.event === ChartStoreTrackEventType.BPMChange)
            .map(e => e as ChartStoreTrackBPMChange)
            .map(e => ({
                id: e.id,
                event: e.event,
                time: e.time - offset,
                bpm: e.bpm,
            } as ChartStoreTrackBPMChange));
        return [].concat.apply([], track.events
            .filter(e => e.event === ChartStoreTrackEventType.GuitarNote
                || e.event === ChartStoreTrackEventType.GHLNote)
            .map(e => e as ChartStoreTrackNote)
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
