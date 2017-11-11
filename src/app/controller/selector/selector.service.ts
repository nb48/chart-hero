import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Model, ModelTrackEvent, ModelTrackNote } from '../../model/model';
import { ModelService } from '../../model/model.service';
import { Track, getTrack } from '../../track/track';
import { TrackService } from '../../track/track.service';

@Injectable()
export class SelectorService {

    private selectedNotesSubject: BehaviorSubject<ModelTrackNote>;
    private selectedEventsSubject: BehaviorSubject<ModelTrackEvent>;
    private model: Model;
    private track: Track;

    constructor(
        private modelService: ModelService,
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
        this.trackService.tracks.subscribe((track) => {
            this.track = track;
        });
    }

    get selectedNotes(): Observable<ModelTrackNote> {
        return this.selectedNotesSubject.asObservable();
    }

    selectNote(id: number): void {
        const note = this.findNote(id);
        if (note) {
            this.newNoteSelection(note);            
        } else {
            this.clearSelection();
        }
    }

    selectNextNote(): void {
        const note = this.findNextNote();
        if (note) {
            this.newNoteSelection(note);            
        }
    }

    selectPreviousNote(): void {
        const note = this.findPreviousNote();
        if (note) {
            this.newNoteSelection(note);            
        }
    }

    selectNearestNote(): void {
        const previous = this.findPreviousNote();
        if (previous) {
            this.newNoteSelection(previous);
            return;
        }
        const next = this.findNextNote();
        if (next) {
            this.newNoteSelection(next);
            return;
        }
        this.clearSelection();
    }

    selectEvent(id: number): void {
        const event = this.findEvent(id);
        if (event) {
            this.newEventSelection(event);            
        } else {
            this.clearSelection();
        }
    }

    clearSelection(): void {
        this.selectedNotesSubject.next(undefined);
        this.selectedEventsSubject.next(undefined);
    }

    private findNote(id: number): ModelTrackNote {
        const chordId = Math.floor(id / 10) * 10;
        return getTrack(this.model, this.track).events
            .find(e => e.id === chordId) as ModelTrackNote;
    }

    private findNextNote(): ModelTrackNote {
        const currentTime = this.selectedNotesSubject.value
            ? this.selectedNotesSubject.value.time
            : -1;
        return getTrack(this.model, this.track).events
            .sort((a, b) => a.time - b.time)
            .find(e => e.time > currentTime) as ModelTrackNote;
    }

    private findPreviousNote(): ModelTrackNote {
        if (!this.selectedNotesSubject.value) {
            return this.findNextNote();
        }
        return getTrack(this.model, this.track).events
            .sort((a, b) => b.time - a.time)
            .find(e => e.time < this.selectedNotesSubject.value.time) as ModelTrackNote;
    }

    private findEvent(id: number): ModelTrackEvent {
        return this.model.syncTrack.events
            .find(e => e.id === id) as ModelTrackEvent;
    }

    private newNoteSelection(note: ModelTrackNote): void {
        this.selectedEventsSubject.next(undefined);
        this.selectedNotesSubject.next(JSON.parse(JSON.stringify(note)));
    }

    private newEventSelection(event: ModelTrackEvent): void {
        this.selectedNotesSubject.next(undefined);
        this.selectedEventsSubject.next(JSON.parse(JSON.stringify(event)));
    }
}
