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
            const newTime = event.time - oldDifference;
            this.timeService.time = newTime;
        }
    }

    private findNote(id: number): ModelTrackNote {
        const chordId = Math.floor(id / 10) * 10;
        return getTrack(this.model, this.track).events
            .find(e => e.id === chordId) as ModelTrackNote;
    }

    private findEvent(id: number): ModelTrackEvent {
        return this.model.syncTrack.events
            .find(e => e.id === id) as ModelTrackEvent;
    }

    private findNext(): ModelTrackEvent {
        const currentId = this.currentId();
        const sortedForwards = this.combinateEventTracks()
            .sort((a, b) => a.time - b.time);
        if (!currentId) {
            return sortedForwards[0];
        }
        const index = sortedForwards
            .findIndex(e => e.id === currentId);
        return sortedForwards[index + 1];
    }

    private findPrevious(): ModelTrackEvent {
        const currentId = this.currentId();
        if (!currentId) {
            return this.findNext();
        }
        const sortedBackwards = this.combinateEventTracks()
            .sort((a, b) => a.time - b.time)
            .reverse();
        const index = sortedBackwards
            .findIndex(e => e.id === currentId);
        return sortedBackwards[index + 1];
    }

    private currentId(): number {
        return this.selectedNotesSubject.value
            ? this.selectedNotesSubject.value.id
            : this.selectedEventsSubject.value
            ? this.selectedEventsSubject.value.id
            : null;
    }

    private currentTime(): number {
        return this.selectedNotesSubject.value
            ? this.selectedNotesSubject.value.time
            : this.selectedEventsSubject.value
            ? this.selectedEventsSubject.value.time
            : 0;
    }

    private combinateEventTracks(): ModelTrackEvent[] {
        return this.model.syncTrack.events
            .concat(getTrack(this.model, this.track).events);
    }

    private newSelection(event: ModelTrackEvent): void {
        if (event.event === ModelTrackEventType.GHLNote ||
            event.event === ModelTrackEventType.GuitarNote
        ) {
            this.newNoteSelection(event);
            return;
        }
        if (event.event === ModelTrackEventType.BPMChange) {
            this.newEventSelection(event);
            return;
        }
        throw new Error('newSelection failed');
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
