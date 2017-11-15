import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import {
    Model,
    ModelTrack,
    ModelTrackEventType,
    ModelTrackBPMChange,
    ModelTrackNote,
    ModelTrackNoteType,
} from '../../model/model';
import { ModelService } from '../../model/model.service';
import { DurationService } from '../../time/duration/duration.service';
import { Track, getTrack } from '../../track/track';
import { TrackService } from '../../track/track.service';
import {
    Prepared,
    PreparedBeat,
    PreparedNote,
    PreparedNoteGuitarColor,
    PreparedNoteGHLColor,
    PreparedEvent,
} from './prepared';

@Injectable()
export class PreparerService {
    
    private preparedSubject: ReplaySubject<Prepared>;
    private model: Model;
    private track: Track;
    private duration: number;
    private previousNote: ModelTrackNote;
    private currentIncrement: number;

    constructor(
        private modelService: ModelService,
        private trackService: TrackService,
        private durationService: DurationService,
    ) {
        this.preparedSubject = new ReplaySubject<Prepared>();
        Observable.combineLatest(
            this.modelService.models,
            this.trackService.tracks,
            this.durationService.durations,
            (model, track, duration) => {
                this.model = model;
                this.track = track;
                this.duration = duration;
            },
        ).subscribe(() => {
            const prepared = this.prepareView();
            this.preparedSubject.next(prepared);
        });
    }

    get prepareds(): Observable<Prepared> {
        return this.preparedSubject.asObservable();
    }

    private prepareView(): Prepared {
        return {
            beats: this.buildBeats(),
            notes: this.buildNotes(),
            events: this.buildEvents(),
        };
    }

    private buildBeats()
        : PreparedBeat[] {
        const beatTimes: PreparedBeat[] = [];
        const sortedSyncTrack = this.model.syncTrack.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .sort((a, b) => a.time - b.time);
        let currentIncrement = 0;
        let timeCounter = sortedSyncTrack[0].time;
        sortedSyncTrack
            .forEach((e) => {
                while (timeCounter < e.time) {
                    beatTimes.push({ id: beatTimes.length + 1, time: timeCounter });
                    timeCounter += currentIncrement;
                }
                currentIncrement = 60 / e.bpm;
                timeCounter = e.time;
            });
        while (timeCounter <= this.duration) {
            beatTimes.push({ id: beatTimes.length + 1, time: timeCounter });
            timeCounter += currentIncrement;
        }
        return beatTimes;
    }

    private buildNotes(): PreparedNote[] {
        const bpmChanges = this.model.syncTrack.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .sort((a, b) => a.time - b.time)
            .entries();
        this.previousNote = undefined;
        this.currentIncrement = 60 / bpmChanges.next().value[1].bpm;
        const next = bpmChanges.next();
        let nextBPMChange = next.done ? undefined : next.value[1];
        const t: ModelTrack = getTrack(this.model, this.track);
        return t.events
            .filter(e => e.event === ModelTrackEventType.GuitarNote
                || e.event === ModelTrackEventType.GHLNote)
            .map(e => e as ModelTrackNote)
            .map((e) => {
                if (nextBPMChange && e.time > nextBPMChange.time) {
                    this.currentIncrement = 60 / nextBPMChange.bpm;
                    const next = bpmChanges.next();
                    nextBPMChange = next.done ? undefined : next.value[1];
                }
                const note = this.buildNote(e);
                this.previousNote = e;
                return note;
            });
    }

    private buildNote(note: ModelTrackNote): PreparedNote {
        const time = note.time;
        const length = note.length;
        const open = note.type.length === 0;
        const hopo = this.calculateHopo(note);
        const guitarLane1 = this.buildGuitarColor(note.type, ModelTrackNoteType.GuitarGreen);
        const guitarLane2 = this.buildGuitarColor(note.type, ModelTrackNoteType.GuitarRed);
        const guitarLane3 = this.buildGuitarColor(note.type, ModelTrackNoteType.GuitarYellow);
        const guitarLane4 = this.buildGuitarColor(note.type, ModelTrackNoteType.GuitarBlue);
        const guitarLane5 = this.buildGuitarColor(note.type, ModelTrackNoteType.GuitarOrange);
        const ghlLane1 = this.buildGHLColor(
            note.type, ModelTrackNoteType.GHLBlack1, ModelTrackNoteType.GHLWhite1);
        const ghlLane2 = this.buildGHLColor(
            note.type, ModelTrackNoteType.GHLBlack2, ModelTrackNoteType.GHLWhite2);
        const ghlLane3 = this.buildGHLColor(
            note.type, ModelTrackNoteType.GHLBlack3, ModelTrackNoteType.GHLWhite3);
        return {
            time,
            length,
            open,
            hopo,
            guitarLane1,
            guitarLane2,
            guitarLane3,
            guitarLane4,
            guitarLane5,
            ghlLane1,
            ghlLane2,
            ghlLane3,
            id: note.id,
        };
    }

    private buildGuitarColor(
        types: ModelTrackNoteType[],
        color: ModelTrackNoteType,
    ): PreparedNoteGuitarColor {
        if (types.indexOf(color) !== -1) {
            switch (color) {
            case ModelTrackNoteType.GuitarGreen:
                return PreparedNoteGuitarColor.Green;
            case ModelTrackNoteType.GuitarRed:
                return PreparedNoteGuitarColor.Red;
            case ModelTrackNoteType.GuitarYellow:
                return PreparedNoteGuitarColor.Yellow;
            case ModelTrackNoteType.GuitarBlue:
                return PreparedNoteGuitarColor.Blue;
            case ModelTrackNoteType.GuitarOrange:
                return PreparedNoteGuitarColor.Orange;
            }
        }
        return PreparedNoteGuitarColor.None;
    }

    private buildGHLColor(
        types: ModelTrackNoteType[],
        black: ModelTrackNoteType,
        white: ModelTrackNoteType,
    ): PreparedNoteGHLColor {
        if (types.indexOf(black) !== -1 && types.indexOf(white) !== -1) {
            return PreparedNoteGHLColor.Chord;
        }
        if (types.indexOf(black) !== -1) {
            return PreparedNoteGHLColor.Black;
        }
        if (types.indexOf(white) !== -1) {
            return PreparedNoteGHLColor.White;
        }
        return PreparedNoteGHLColor.None;
    }

    private buildEvents(): PreparedEvent[] {
        return this.model.syncTrack.events
            .filter(e => e.event === ModelTrackEventType.BPMChange);
    }

    private calculateHopo(note: ModelTrackNote): boolean {
        if (!this.previousNote) {
            return false;
        }
        if (note.time - this.previousNote.time < this.currentIncrement * 0.33855) {
            if (JSON.stringify(note.type) === JSON.stringify(this.previousNote.type)) {
                return false;
            }
            if (note.type.length > 1) {
                return false;
            }
            return true;
        }
        return false;
    }
}
