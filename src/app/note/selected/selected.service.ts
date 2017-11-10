import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ChartViewTrack, getTrack } from '../../chart-view/chart-view-track';
import { Model, ModelTrackNote } from '../../model/model';
import { ModelService } from '../../model/model.service';
import { TrackService } from '../../track/track.service';

@Injectable()
export class SelectedService {

    private model: Model;
    private track: ChartViewTrack;
    private selectedNoteSubject: ReplaySubject<ModelTrackNote>;

    constructor(
        private modelService: ModelService,
        private trackService: TrackService,
    ) {
        this.selectedNoteSubject = new ReplaySubject<ModelTrackNote>();
        Observable.combineLatest(
            this.modelService.models,
            this.trackService.track,
            (model, track) => {
                this.model = model;
                this.track = track;
            }).subscribe(() => {
                this.clearSelection();
            });
    }

    get selectedNote(): Observable<ModelTrackNote> {
        return this.selectedNoteSubject.asObservable();
    }

    selectNote(id: number): void {
        const note = this.findNote(id);
        this.newSelection(note);
    }

    noteChanged(note: ModelTrackNote): void {
        const modelNote = this.findNote(note.id);
        Object.keys(note).forEach((key) => {
            modelNote[key] = note[key];
        });
        this.modelService.model = this.model;
    }

    clearSelection(): void {
        this.selectedNoteSubject.next(undefined);
    }

    private findNote(id: number): ModelTrackNote {
        const chordId = Math.floor(id / 10) * 10;
        return getTrack(this.model, this.track).events
            .find(e => e.id === chordId) as ModelTrackNote;
    }

    private newSelection(note: ModelTrackNote): void {
        this.selectedNoteSubject.next(JSON.parse(JSON.stringify(note)));
    }
}
