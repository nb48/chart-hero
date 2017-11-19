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

const forceHopoModifier = 5;
const tapModifier = 6;
const noteModifiers = [forceHopoModifier, tapModifier];
const openNote = 7;

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
                const notesToTransform = notes
                    .map(n => n.note) 
                    .filter(n => noteModifiers.indexOf(n) === -1);
                const type = noteTransformer(notesToTransform);
                const forceHopo = notes.some(n => n.note === forceHopoModifier);
                const tap = notes.some(n => n.note === tapModifier);
                return {
                    length,
                    type,
                    forceHopo,
                    tap,
                    id: this.idGenerator.id(),
                    event: eventType as
                        ModelTrackEventType.GuitarNote | ModelTrackEventType.GHLNote,
                    time: time + offset,
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
                const notesHaveSameLength =
                    notes.every(note => note.length === notes[0].length);
                const notesContainModifier =
                    notes.some(note => noteModifiers.indexOf(note.note) !== -1);
                const notesDontContainOpen =
                    notes.every(note => note.note !== openNote);
                if ((notesHaveSameLength || notesContainModifier) && notesDontContainOpen) {
                    return [notes];
                }
                const getNoteModifier = (modifier: number): () => MemoryTrack[] => {
                    const modifierIndex = notes.findIndex(n => n.note === modifier);
                    let noteModifier: string = undefined;
                    if (modifierIndex !== -1) {
                        noteModifier = JSON.stringify(notes[modifierIndex]);
                        notes.splice(modifierIndex, 1);
                    }
                    return () => noteModifier ? [JSON.parse(noteModifier)] : [];
                };
                const modifierFunctions = noteModifiers.map(getNoteModifier);
                return notes.map((note) => {
                    const group = [note];
                    modifierFunctions.forEach(f => group.concat(f()));
                    return group;
                });
            }));
    }

    private importUnsupportedTrack(track: MemoryTrack[], supportedNotes: SupportedNotes)
        : MemoryTrack[] {
        return track.filter(t => t.type !== 'N' || supportedNotes.indexOf(t.note) === -1);
    }
}
