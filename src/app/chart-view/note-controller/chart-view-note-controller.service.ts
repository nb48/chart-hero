import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ChartStoreService } from '../../chart-store/chart-store.service';
import {
    ChartStore,
    ChartStoreTrackNote,
    ChartStoreTrackNoteType,
} from '../../chart-store/chart-store';
import { ChartViewTrackControllerService }
from '../track-controller/chart-view-track-controller.service';
import { ChartViewTrack, getTrack } from '../chart-view-track';

@Injectable()
export class ChartViewNoteControllerService {

    private currentChart: ChartStore;
    private currentTrack: ChartViewTrack;
    private selectedNoteSubject: ReplaySubject<ChartStoreTrackNote>;

    constructor(
        private chartStore: ChartStoreService,
        private trackController: ChartViewTrackControllerService,
    ) {
        this.selectedNoteSubject = new ReplaySubject<ChartStoreTrackNote>();        
        this.chartStore.chart.subscribe((chart) => {
            this.currentChart = chart;
        });
        this.trackController.track.subscribe((track) => {
            this.currentTrack = track;
            this.selectedNoteSubject.next(undefined);
        });
    }

    get selectedNote(): Observable<ChartStoreTrackNote> {
        return this.selectedNoteSubject.asObservable();
    }

    selectNote(id: number): void {
        const chordId = Math.floor(id / 10) * 10;
        const note = this.findNote(chordId);
        this.selectedNoteSubject.next(JSON.parse(JSON.stringify(note)));
    }

    updateNoteType(id: number, type: ChartStoreTrackNoteType[]): void {
        const note = this.findNote(id);
        note.type = type;
        this.chartStore.newChart(this.currentChart);
        this.selectedNoteSubject.next(note);
    }

    private findNote(id: number): ChartStoreTrackNote {
        return getTrack(this.currentChart, this.currentTrack).events
            .find(e => e.id === id) as ChartStoreTrackNote;
    }
}
