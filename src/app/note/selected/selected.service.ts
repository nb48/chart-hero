import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Model, ModelTrackNote } from '../../model/model';
import { ModelService } from '../../model/model.service';
import { Track, getTrack } from '../../track/track';
import { TrackService } from '../../track/track.service';

@Injectable()
export class SelectedNoteService {

    private selectedNotesSubject: BehaviorSubject<ModelTrackNote>;
    private model: Model;
    private track: Track;

    constructor(
        private modelService: ModelService,
        private trackService: TrackService,
    ) {
        this.selectedNotesSubject = new BehaviorSubject<ModelTrackNote>(undefined);
        Observable.combineLatest(
            this.modelService.models,
            this.trackService.tracks,
            (model, track) => {
                this.model = model;
                this.track = track;
            }).subscribe(() => {
                if (this.selectedNotesSubject.value) {
                    this.selectNote(this.selectedNotesSubject.value.id);
                }
            });
    }

    get selectedNotes(): Observable<ModelTrackNote> {
        return this.selectedNotesSubject.asObservable();
    }

    selectNote(id: number): void {
        const note = this.findNote(id);
        this.newSelection(note);
    }

    selectNextNote(): void {
        const note = this.findNextNote();
        if (note) {
            this.newSelection(note);            
        }
    }

    selectPreviousNote(): void {
        const note = this.findPreviousNote();
        if (note) {
            this.newSelection(note);            
        }
    }

    selectNearestNote(): void {
        const previous = this.findPreviousNote();
        if (previous) {
            this.newSelection(previous);
            return;
        }
        const next = this.findNextNote();
        if (next) {
            this.newSelection(next);
            return;
        }
        this.clearSelection();
    }

    clearSelection(): void {
        this.selectedNotesSubject.next(undefined);
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

    private newSelection(note: ModelTrackNote): void {
        this.selectedNotesSubject.next(JSON.parse(JSON.stringify(note)));
    }
}
