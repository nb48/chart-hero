import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileSyncTrack, ChartFileTrack } from '../../chart-file/chart-file';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import {
    ChartStoreTrack,
    ChartStoreTrackEventType,
    ChartStoreTrackNote,
    ChartStoreTrackNoteType,
} from '../chart-store';

const supportedGHLNotes = [0, 1, 2, 3, 4, 7, 8];

const ghlNoteType = (notes: number[]): ChartStoreTrackNoteType[] => {
    if (notes[0] === 7) {
        return [];
    }
    return notes.map((note) => {
        switch (note) {
        case 3:
            return ChartStoreTrackNoteType.GHLBlack1;
        case 4:
            return ChartStoreTrackNoteType.GHLBlack2;
        case 8:
            return ChartStoreTrackNoteType.GHLBlack3;
        case 0:
            return ChartStoreTrackNoteType.GHLWhite1;
        case 1:
            return ChartStoreTrackNoteType.GHLWhite2;
        case 2:
            return ChartStoreTrackNoteType.GHLWhite3;
        }
    });
};

const idIncrement = 10;

@Injectable()
export class ChartStoreGHLImporterService {

    nextId: number;

    constructor(private midiTimeService: ChartStoreMidiTimeService) {
    }

    import(
        track: ChartFileTrack[],
        syncTrack: ChartFileSyncTrack[],
        resolution: number,
        offset: number,
    ): ChartStoreTrack {
        this.nextId = 10;
        this.midiTimeService.clearCache();
        return {
            events: [
                ...this.importNotes(track, syncTrack, resolution, offset),
            ],
            unsupported: [
                ...this.importUnsupportedTrack(track),
            ],
        };
    }

    private importNotes(
        track: ChartFileTrack[],
        st: ChartFileSyncTrack[],
        resolution: number,
        offset: number,
    ): ChartStoreTrackNote[] {
        const syncTrack = st.filter(e => e.type === 'B');
        const groupedNotes = this.groupNotes(track);
        return groupedNotes
            .map((notes: ChartFileTrack[]) => {
                const midiTime = notes[0].midiTime;
                const time = this.midiTimeService.calculateTime(midiTime, resolution, syncTrack);
                const length = notes[0].length !== 0
                    ? this.midiTimeService.calculateTime
                        (midiTime + notes[0].length, resolution, syncTrack) - time
                    : 0;
                const type: ChartStoreTrackNoteType[] = [];
                const id = this.nextId;
                this.nextId += idIncrement;
                return {
                    id,
                    length,
                    event: ChartStoreTrackEventType.Note as ChartStoreTrackEventType.Note,
                    time: time + offset,
                    type: ghlNoteType(notes.map(n => n.note)),
                };
            });
    }

    private groupNotes(track: ChartFileTrack[]): ChartFileTrack[][] {
        const times = new Map<number, ChartFileTrack[]>();
        track
            .filter(t => t.type === 'N' && supportedGHLNotes.indexOf(t.note) !== -1)
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

    private importUnsupportedTrack(track: ChartFileTrack[]): ChartFileTrack[] {
        return track.filter(t => t.type !== 'N' || supportedGHLNotes.indexOf(t.note) === -1);
    }
}
