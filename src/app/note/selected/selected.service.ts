import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Model, ModelTrackNote } from '../../model/model';
import { ModelService } from '../../model/model.service';
import { Track, getTrack } from '../../track/track';
import { TrackService } from '../../track/track.service';

@Injectable()
export class SelectedNoteService {

    private model: Model;
    private track: Track;
    private selectedNotesSubject: ReplaySubject<ModelTrackNote>;

    constructor(
        private modelService: ModelService,
        private trackService: TrackService,
    ) {
        this.selectedNotesSubject = new ReplaySubject<ModelTrackNote>();
        Observable.combineLatest(
            this.modelService.models,
            this.trackService.tracks,
            (model, track) => {
                this.model = model;
                this.track = track;
            }).subscribe(() => {
                this.clearSelection();
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
        console.log('next');
    }

    selectPreviousNote(): void {
        console.log('previous');
    }

    noteChanged(note: ModelTrackNote): void {
        const modelNote = this.findNote(note.id);
        Object.keys(note).forEach((key) => {
            modelNote[key] = note[key];
        });
        this.modelService.model = this.model;
    }

    clearSelection(): void {
        this.selectedNotesSubject.next(undefined);
    }

    private findNote(id: number): ModelTrackNote {
        const chordId = Math.floor(id / 10) * 10;
        return getTrack(this.model, this.track).events
            .find(e => e.id === chordId) as ModelTrackNote;
    }

    private newSelection(note: ModelTrackNote): void {
        this.selectedNotesSubject.next(JSON.parse(JSON.stringify(note)));
    }
}
