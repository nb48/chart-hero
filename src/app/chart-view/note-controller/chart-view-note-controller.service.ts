import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ModelService } from '../../model/model.service';
import {
    Model,
    ModelTrackNote,
    ModelTrackNoteType,
} from '../../model/model';
import { ChartViewTrackControllerService }
from '../track-controller/chart-view-track-controller.service';
import { ChartViewTrack, getTrack } from '../chart-view-track';

@Injectable()
export class ChartViewNoteControllerService {

    private currentChart: Model;
    private currentTrack: ChartViewTrack;
    private selectedNoteSubject: ReplaySubject<ModelTrackNote>;

    constructor(
        private chartStore: ModelService,
        private trackController: ChartViewTrackControllerService,
    ) {
        this.selectedNoteSubject = new ReplaySubject<ModelTrackNote>();        
        this.chartStore.models.subscribe((model) => {
            this.currentChart = model;
        });
        this.trackController.track.subscribe((track) => {
            this.currentTrack = track;
            this.selectedNoteSubject.next(undefined);
        });
    }

    get selectedNote(): Observable<ModelTrackNote> {
        return this.selectedNoteSubject.asObservable();
    }

    selectNote(id: number): void {
        const chordId = Math.floor(id / 10) * 10;
        const note = this.findNote(chordId);
        this.selectedNoteSubject.next(JSON.parse(JSON.stringify(note)));
    }

    updateNoteType(id: number, type: ModelTrackNoteType[]): void {
        const note = this.findNote(id);
        note.type = type;
        this.chartStore.model = this.currentChart;
        this.selectedNoteSubject.next(note);
    }

    moveNote(id: number, time: number): void {
        const note = this.findNote(id);
        note.time += time;
        this.chartStore.model = this.currentChart;
        this.selectedNoteSubject.next(note);
    }

    private findNote(id: number): ModelTrackNote {
        return getTrack(this.currentChart, this.currentTrack).events
            .find(e => e.id === id) as ModelTrackNote;
    }
}
