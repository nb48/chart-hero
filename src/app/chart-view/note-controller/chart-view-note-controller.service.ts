import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ChartStoreService } from '../../chart-store/chart-store.service';
import { ChartStore, ChartStoreTrackNote } from '../../chart-store/chart-store';
import { ChartViewTrackControllerService }
from '../track-controller/chart-view-track-controller.service';
import { ChartViewTrack, getTrack } from '../chart-view-track';

@Injectable()
export class ChartViewNoteControllerService {

    private currentChart: ChartStore;
    private currentTrack: ChartViewTrack;
    private selectedNoteSubject: ReplaySubject<number>;

    constructor(
        private chartStore: ChartStoreService,
        private trackController: ChartViewTrackControllerService,
    ) {
        this.chartStore.chart.subscribe((chart) => {
            this.currentChart = chart;
        });
        this.trackController.track.subscribe((track) => {
            this.currentTrack = track;
        });
        this.selectedNoteSubject = new ReplaySubject<number>();
    }

    get selectedNote(): Observable<number> {
        return this.selectedNoteSubject.asObservable();
    }

    selectNote(id: number) {
        const chordId = Math.floor(id / 10) * 10;
        const note = getTrack(this.currentChart, this.currentTrack).events
            .find(e => e.id === chordId);
        this.selectedNoteSubject.next(JSON.parse(JSON.stringify(note)));
    }
}
