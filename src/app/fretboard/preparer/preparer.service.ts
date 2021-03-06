import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';

import {
    Model,
    ModelTrack,
    ModelTrackEvent,
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
    PreparedEventLink,
} from './prepared';

@Injectable()
export class PreparerService {

    private preparedSubject: ReplaySubject<Prepared>;
    private model: Model;
    private track: Track;
    private duration: number;
    private currentIncrement: number;
    private typeCache: Map<number, Set<ModelTrackNoteType>>;
    private times: number[];
    private timeIndex: number;
    private previousTime: number;

    constructor(
        private modelService: ModelService,
        private trackService: TrackService,
        private durationService: DurationService,
    ) {
        this.preparedSubject = new ReplaySubject<Prepared>();
        combineLatest(
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
            eventLinks: this.buildEventLinks(),
        };
    }

    private buildBeats()
        : PreparedBeat[] {
        const bpmChangesArray = this.model.syncTrack.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .sort((a, b) => a.time - b.time);
        const beatTimes: PreparedBeat[] = [];
        const addBeat = (time: number) => {
            beatTimes.push({ time, id: beatTimes.length + 1 });
        };
        const bpmChanges = bpmChangesArray.entries();
        let bpmChange = bpmChanges.next().value[1];
        while (bpmChange) {
            const nextResult = bpmChanges.next();
            const nextBpmChange = nextResult.done ? undefined : nextResult.value[1];
            const startTime = beatTimes.length === 0 ? 0 : beatTimes[beatTimes.length - 1].time;
            const endTime = nextBpmChange ? nextBpmChange.time : this.duration;
            const currentIncrement = 60 / bpmChange.bpm;
            let timeCounter = startTime + currentIncrement;
            while (timeCounter <= endTime + 0.01) {
                addBeat(timeCounter);
                timeCounter += currentIncrement;
            }
            bpmChange = nextBpmChange;
        }
        return beatTimes;
    }

    private buildNotes(): PreparedNote[] {
        this.typeCache = new Map<number, Set<ModelTrackNoteType>>();
        this.times = [];
        this.timeIndex = 0;
        this.previousTime = undefined;
        const bpmChanges = this.model.syncTrack.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .sort((a, b) => a.time - b.time)
            .entries();
        this.currentIncrement = 60 / bpmChanges.next().value[1].bpm;
        const next = bpmChanges.next();
        let nextBPMChange = next.done ? undefined : next.value[1];
        const t: ModelTrack = getTrack(this.model, this.track);
        return t.events
            .filter(e => e.event === ModelTrackEventType.GuitarNote
                || e.event === ModelTrackEventType.GHLNote)
            .sort((a, b) => a.time - b.time)
            .map(e => e as ModelTrackNote)
            .map((e) => {
                if (this.typeCache.has(e.time)) {
                    e.type.forEach(t => this.typeCache.get(e.time).add(t));
                } else {
                    this.typeCache.set(e.time, new Set<ModelTrackNoteType>(e.type));
                }
                if (this.times[this.times.length - 1] !== e.time) {
                    this.times.push(e.time);
                }
                return e;
            })
            .map((e) => {
                this.previousTime = this.timeIndex !== 0
                    ? this.times[this.timeIndex - 1]
                    : undefined;
                if (nextBPMChange && e.time > nextBPMChange.time) {
                    this.currentIncrement = 60 / nextBPMChange.bpm;
                    const next = bpmChanges.next();
                    nextBPMChange = next.done ? undefined : next.value[1];
                }
                const note = this.buildNote(e);
                if (e.time !== this.previousTime) {
                    this.timeIndex += 1;
                }
                return note;
            });
    }

    private buildNote(note: ModelTrackNote): PreparedNote {
        const time = note.time;
        const length = note.length;
        const originalHopo = this.calculateHopo(note);
        const hopo = note.tap ? false : note.forceHopo ? !originalHopo : originalHopo;
        const tap = note.tap;
        const open = note.type.length === 0;
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
            hopo,
            tap,
            open,
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

    private calculateHopo(note: ModelTrackNote): boolean {
        if (!this.previousTime) {
            return false;
        }
        if (note.time - this.previousTime < this.currentIncrement * 0.33855) {
            const noteType = Array.from(this.typeCache.get(note.time));
            const previousType = Array.from(this.typeCache.get(this.previousTime));
            if (JSON.stringify(noteType) === JSON.stringify(Array.from(previousType))) {
                return false;
            }
            if (noteType.length > 1) {
                return false;
            }
            return true;
        }
        return false;
    }

    private buildEvents(): PreparedEvent[] {
        const allEvents = [
            ...this.model.syncTrack.events,
            ...getTrack(this.model, this.track).events,
            ...this.model.events.events,
        ];
        const eventTypes = [
            ModelTrackEventType.BPMChange,
            ModelTrackEventType.TSChange,
            ModelTrackEventType.PracticeSection,
            ModelTrackEventType.SoloToggle,
            ModelTrackEventType.StarPowerToggle,
            ModelTrackEventType.LyricToggle,
            ModelTrackEventType.Lyric,
        ];
        return allEvents
            .filter(e => eventTypes.indexOf(e.event) !== -1)
            .map(e => ({
                id: e.id,
                time: e.time,
                type: e.event,
                word: e.event === ModelTrackEventType.Lyric ? e.word : undefined,
            }));
    }

    private buildEventLinks(): PreparedEventLink[] {
        const allEvents = [
            ...this.model.syncTrack.events,
            ...getTrack(this.model, this.track).events,
            ...this.model.events.events,
        ];
        return [
            ...this.buildEventLinksForType(allEvents, ModelTrackEventType.SoloToggle),
            ...this.buildEventLinksForType(allEvents, ModelTrackEventType.StarPowerToggle),
            ...this.buildEventLinksForType(allEvents, ModelTrackEventType.LyricToggle),
        ];
    }

    private buildEventLinksForType(events: ModelTrackEvent[], type: ModelTrackEventType)
        : PreparedEventLink[] {
        const toggles = events
            .filter(e => e.event === type)
            .sort((a, b) => a.time - b.time);
        let active = false;
        const links: PreparedEventLink[] = [];
        toggles.forEach((toggle) => {
            if (!active) {
                links.push({
                    type,
                    id: toggle.id + 1,
                    startTime: toggle.time,
                    endTime: this.duration,
                });
                active = true;
            } else {
                links[links.length - 1].endTime = toggle.time;
                active = false;
            }
        });
        return links;
    }
}
