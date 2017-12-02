import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { SpeedService } from '../../fretboard/speed/speed.service';
import { Model, ModelTrackEvent, ModelTrackEventType, ModelTrackNote } from '../../model/model';
import { ModelService } from '../../model/model.service';
import { TimeService } from '../../time/time.service';
import { Track, getTrack } from '../../track/track';
import { TrackService } from '../../track/track.service';

@Injectable()
export class SelectorService {

    private selectedNotesSubject: BehaviorSubject<ModelTrackNote>;
    private selectedEventsSubject: BehaviorSubject<ModelTrackEvent>;
    private model: Model;
    private time: number;
    private track: Track;

    constructor(
        private speedService: SpeedService,
        private modelService: ModelService,
        private timeService: TimeService,
        private trackService: TrackService,
    ) {
        this.selectedNotesSubject = new BehaviorSubject<ModelTrackNote>(undefined);
        this.selectedEventsSubject = new BehaviorSubject<ModelTrackEvent>(undefined);
        this.modelService.models.subscribe((model) => {
            this.model = model;
            if (this.selectedNotesSubject.value) {
                this.selectNote(this.selectedNotesSubject.value.id);
            }
            if (this.selectedEventsSubject.value) {
                this.selectEvent(this.selectedEventsSubject.value.id);
            }
        });
        this.timeService.times.subscribe((time) => {
            this.time = time;
        });
        this.trackService.tracks.subscribe((track) => {
            this.track = track;
        });
    }

    get selectedNotes(): Observable<ModelTrackNote> {
        return this.selectedNotesSubject.asObservable();
    }

    get selectedEvents(): Observable<ModelTrackEvent> {
        return this.selectedEventsSubject.asObservable();
    }

    selectNote(id: number): void {
        const note = this.findNote(id);
        if (note) {
            this.newNoteSelection(note);            
        } else {
            this.clearSelection();
        }
    }

    selectEvent(id: number): void {
        const event = this.findEvent(id);
        if (event) {
            this.newEventSelection(event);            
        } else {
            this.clearSelection();
        }
    }

    selectNext(): void {
        const event = this.findNext();
        if (event) {
            this.newSelection(event);            
        }
    }

    selectPrevious(): void {
        const event = this.findPrevious();
        if (event) {
            this.newSelection(event);            
        }
    }

    selectNearest(): void {
        const previous = this.findPrevious();
        if (previous) {
            this.newSelection(previous);
            return;
        }
        const next = this.findNext();
        if (next) {
            this.newSelection(next);
            return;
        }
        this.clearSelection();
    }

    clearSelection(): void {
        this.selectedNotesSubject.next(undefined);
        this.selectedEventsSubject.next(undefined);
    }

    adjustTime(event: ModelTrackEvent): void {
        if (!this.speedService.timeInTightView(event.time, this.time)) {
            const currentTime = this.currentTime();
            if (!currentTime) {
                this.timeService.time = event.time;
                return;
            }
            const oldDifference = currentTime - this.time;
            const after = this.speedService.after;
            const before = this.speedService.before;
            const difference = Math.max(after, Math.min(before, oldDifference));
            const newTime = event.time - difference;
            this.timeService.time = newTime;
        }
    }

    private findNote(id: number): ModelTrackNote {
        const chordId = Math.floor(id / 10) * 10;
        return this.combineAllTracks()
            .find(e => e.id === chordId) as ModelTrackNote;
    }

    private findEvent(id: number): ModelTrackEvent {
        return this.combineAllTracks()
            .find(e => e.id === id) as ModelTrackEvent;
    }

    private findNext(): ModelTrackEvent {
        const currentTime = this.currentTime();
        const events = this.currentIsEvent() ? this.combineEventTracks() : this.combineNoteTracks();
        const sortedForwards = events
            .sort((a, b) => a.time - b.time);
        return sortedForwards
            .find(e => e.time > currentTime);
    }

    private findPrevious(): ModelTrackEvent {
        const currentTime = this.currentTime();
        const events = this.currentIsEvent() ? this.combineEventTracks() : this.combineNoteTracks();
        const sortedBackwards = events
            .sort((a, b) => a.time - b.time)
            .reverse();
        return sortedBackwards
            .find(e => e.time < currentTime);
    }

    private currentTime(): number {
        return this.selectedNotesSubject.value
            ? this.selectedNotesSubject.value.time
            : this.selectedEventsSubject.value
            ? this.selectedEventsSubject.value.time
            : this.time;
    }

    private combineAllTracks(): ModelTrackEvent[] {
        return [
            ...this.combineNoteTracks(),
            ...this.combineEventTracks(),
        ];
    }

    private combineNoteTracks(): ModelTrackEvent[] {
        return getTrack(this.model, this.track).events;
    }

    private combineEventTracks(): ModelTrackEvent[] {
        return [
            ...this.model.syncTrack.events,
            ...this.model.events.events,
        ];
    }

    private newSelection(event: ModelTrackEvent): void {
        if (this.isNote(event)) {
            this.newNoteSelection(event as ModelTrackNote);
            return;
        }
        if (this.isEvent(event)) {
            this.newEventSelection(event);
            return;
        }
        throw new Error('newSelection failed');
    }

    private isNote(event: ModelTrackEvent): boolean {
        return event.event === ModelTrackEventType.GHLNote ||
            event.event === ModelTrackEventType.GuitarNote;
    }

    private isEvent(event: ModelTrackEvent): boolean {
        return event.event === ModelTrackEventType.BPMChange ||
            event.event === ModelTrackEventType.TSChange ||
            event.event === ModelTrackEventType.PracticeSection ||
            event.event === ModelTrackEventType.SoloToggle ||
            event.event === ModelTrackEventType.StarPowerToggle;
    }

    private currentIsNote(): boolean {
        return this.selectedEventsSubject.value === undefined &&
            this.selectedNotesSubject.value !== undefined;
    }

    private currentIsEvent(): boolean {
        return this.selectedEventsSubject.value !== undefined &&
            this.selectedNotesSubject.value === undefined;
    }

    private newNoteSelection(note: ModelTrackNote): void {
        this.adjustTime(note);
        this.selectedEventsSubject.next(undefined);
        this.selectedNotesSubject.next(note);
    }

    private newEventSelection(event: ModelTrackEvent): void {
        this.adjustTime(event);
        this.selectedNotesSubject.next(undefined);
        this.selectedEventsSubject.next(event);
    }
}
