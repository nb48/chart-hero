import { EventEmitter, Injectable } from '@angular/core';

import { IdGeneratorService } from '../../../id-generator/id-generator.service';
import {
    ModelTrack,
    ModelTrackEventType,
    ModelTrackNote,
    ModelTrackNoteType,
} from '../../../model';
import { MemorySyncTrack, MemoryTrack } from '../../memory';
import { defaultSyncTrack } from '../common/sync-track-importer.service';
import { MidiTimeService } from '../util/midi-time.service';

export type SupportedNotes = number[];
export type NoteImporter = (notes: SupportedNotes) => ModelTrackNoteType[];

@Injectable()
export class GenericTrackImporterService {

    constructor(
        private idGenerator: IdGeneratorService,
        private midiTimeService: MidiTimeService,
    ) {
    }

    import(
        track: MemoryTrack[],
        syncTrack: MemorySyncTrack[],
        resolution: number,
        offset: number,
        supportedNotes: SupportedNotes,
        noteTransformer: NoteImporter,
        eventType: ModelTrackEventType,
    ): ModelTrack {
        if (!track) {
            return {
                events: [],
                unsupported: [],
            };
        }
        this.midiTimeService.clearCache();
        return {
            events: [
                ...this.importNotes(
                    track,
                    syncTrack,
                    resolution,
                    offset,
                    supportedNotes,
                    noteTransformer,
                    eventType,
                ),
            ],
            unsupported: [
                ...this.importUnsupportedTrack(track, supportedNotes),
            ],
        };
    }

    private importNotes(
        track: MemoryTrack[],
        st: MemorySyncTrack[],
        resolution: number,
        offset: number,
        supportedNotes: SupportedNotes,
        noteTransformer: NoteImporter,
        eventType: ModelTrackEventType,
    ): ModelTrackNote[] {
        let syncTrack = st ? st.filter(e => e.type === 'B') : [defaultSyncTrack()];
        if (syncTrack.length === 0) {
            syncTrack = [defaultSyncTrack()];
        }
        const groupedNotes = this.groupNotes(track, supportedNotes);
        return groupedNotes
            .map((notes: MemoryTrack[]) => {
                const midiTime = notes[0].midiTime;
                const time = this.midiTimeService.calculateTime(midiTime, resolution, syncTrack);
                const length = notes[0].length !== 0
                    ? this.midiTimeService.calculateTime
                        (midiTime + notes[0].length, resolution, syncTrack) - time
                    : 0;
                const type: ModelTrackNoteType[] = [];
                return {
                    length,
                    id: this.idGenerator.id(),
                    event: eventType as
                        ModelTrackEventType.GuitarNote | ModelTrackEventType.GHLNote,
                    time: time + offset,
                    type: noteTransformer(notes
                        .filter(n => n.note !== 5 && n.note !== 6).map(n => n.note)),
                    forceHopo: notes.some(n => n.note === 5),
                    tap: notes.some(n => n.note === 6),
                };
            });
    }

    private groupNotes(track: MemoryTrack[], supportedNotes: SupportedNotes)
        : MemoryTrack[][] {
        const times = new Map<number, MemoryTrack[]>();
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
            .map((notes: MemoryTrack[]) => {
                if (notes.every(note => note.length === notes[0].length
                    || note.note === 5 || notes[0].note === 5
                    || note.note === 6 || notes[0].note === 6) &&
                    notes.every(note => note.note !== 7)) {
                    return [notes];
                }
                const forceHopoIndex = notes.findIndex(n => n.note === 5);
                let forceHopo: string = undefined;
                if (forceHopoIndex !== -1) {
                    forceHopo = JSON.stringify(notes[forceHopoIndex]);
                    notes.splice(forceHopoIndex, 1);
                }
                const forceHopoArray = () => forceHopo ? [JSON.parse(forceHopo)] : [];
                const tapNoteIndex = notes.findIndex(n => n.note === 6);
                let tapNote: string = undefined;
                if (tapNoteIndex !== -1) {
                    tapNote = JSON.stringify(notes[tapNoteIndex]);
                    notes.splice(tapNoteIndex, 1);
                }
                const tapNoteArray = () => tapNote ? [JSON.parse(tapNote)] : [];
                return notes.map(note => [note]
                    .concat(forceHopoArray())
                    .concat(tapNoteArray()));
            }));
    }

    private importUnsupportedTrack(track: MemoryTrack[], supportedNotes: SupportedNotes)
        : MemoryTrack[] {
        return track.filter(t => t.type !== 'N' || supportedNotes.indexOf(t.note) === -1);
    }
}
