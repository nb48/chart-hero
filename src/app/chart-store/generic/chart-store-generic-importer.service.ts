import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileSyncTrack, ChartFileTrack } from '../../chart-file/chart-file';
import { ChartStoreIdGeneratorService } from '../id-generator/chart-store-id-generator.service';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import {
    ChartStoreTrack,
    ChartStoreTrackEventType,
    ChartStoreTrackNote,
    ChartStoreTrackNoteType,
} from '../chart-store';

export type SupportedNotes = number[];
export type NoteImporter = (notes: SupportedNotes) => ChartStoreTrackNoteType[];

@Injectable()
export class ChartStoreGenericImporterService {

    constructor(
        private idGenerator: ChartStoreIdGeneratorService,
        private midiTimeService: ChartStoreMidiTimeService,
    ) {
    }

    import(
        track: ChartFileTrack[],
        syncTrack: ChartFileSyncTrack[],
        resolution: number,
        offset: number,
        supportedNotes: SupportedNotes,
        noteTransformer: NoteImporter,
    ): ChartStoreTrack {
        if (!track) {
            return {
                events: [],
                unsupported: [],
            };
        }
        this.midiTimeService.clearCache();
        return {
            events: [
                ...this.importNotes
                    (track, syncTrack, resolution, offset, supportedNotes, noteTransformer),
            ],
            unsupported: [
                ...this.importUnsupportedTrack(track, supportedNotes),
            ],
        };
    }

    private importNotes(
        track: ChartFileTrack[],
        st: ChartFileSyncTrack[],
        resolution: number,
        offset: number,
        supportedNotes: SupportedNotes,
        noteTransformer: NoteImporter,
    ): ChartStoreTrackNote[] {
        const syncTrack = st.filter(e => e.type === 'B');
        const groupedNotes = this.groupNotes(track, supportedNotes);
        return groupedNotes
            .map((notes: ChartFileTrack[]) => {
                const midiTime = notes[0].midiTime;
                const time = this.midiTimeService.calculateTime(midiTime, resolution, syncTrack);
                const length = notes[0].length !== 0
                    ? this.midiTimeService.calculateTime
                        (midiTime + notes[0].length, resolution, syncTrack) - time
                    : 0;
                const type: ChartStoreTrackNoteType[] = [];
                return {
                    length,
                    id: this.idGenerator.id(),
                    event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                    time: time + offset,
                    type: noteTransformer(notes.map(n => n.note)),
                };
            });
    }

    private groupNotes(track: ChartFileTrack[], supportedNotes: SupportedNotes)
        : ChartFileTrack[][] {
        const times = new Map<number, ChartFileTrack[]>();
        track
            .filter(t => t.type === 'N' && supportedNotes.indexOf(t.note) !== -1)
            .forEach((note) => {
                if (times.has(note.midiTime)) {
                    times.get(note.midiTime).push(note);
                } else {
                    times.set(note.midiTime, [note]);
                }
            });
        return [].concat.apply([], Array.from(times.values())
            .map((notes: ChartFileTrack[]) => {
                if (notes.every(note => note.length === notes[0].length) &&
                    notes.every(note => note.note !== 7)) {
                    return [notes];
                } else {
                    return notes.map(note => [note]);
                }
            }));
    }

    private importUnsupportedTrack(track: ChartFileTrack[], supportedNotes: SupportedNotes)
        : ChartFileTrack[] {
        return track.filter(t => t.type !== 'N' || supportedNotes.indexOf(t.note) === -1);
    }
}
