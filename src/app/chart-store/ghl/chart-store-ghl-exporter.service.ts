
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

const ghlNoteValue = (note: ChartStoreTrackNoteType): number => {
    switch (note) {
    case ChartStoreTrackNoteType.GHLBlack1:
        return 3;
    case ChartStoreTrackNoteType.GHLBlack2:
        return 4;
    case ChartStoreTrackNoteType.GHLBlack3:
        return 8;
    case ChartStoreTrackNoteType.GHLWhite1:
        return 0;
    case ChartStoreTrackNoteType.GHLWhite2:
        return 1;
    case ChartStoreTrackNoteType.GHLWhite3:
        return 2;
    }
};

@Injectable()
export class ChartStoreGHLExporterService {

    constructor(private midiTimeService: ChartStoreMidiTimeService) {
    }

    export(
        track: ChartStoreTrack,
        syncTrack: ChartStoreTrack,
        resolution: number,
        offset: number,
    ): ChartFileTrack[] {
        this.midiTimeService.clearCache();
        return [
            ...this.exportNotes(track, syncTrack, resolution, offset),
            ...track.unsupported,
        ].sort((a, b) => a.midiTime - b.midiTime);
    }

    private exportNotes(
        track: ChartStoreTrack,
        st: ChartStoreTrack,
        resolution: number,
        offset: number,
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
            .filter(e => e.event === ChartStoreTrackEventType.Note)
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
                        note: ghlNoteValue(type),
                    };
                });
            }));
    }
}
