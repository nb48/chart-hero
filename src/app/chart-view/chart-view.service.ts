import { ModelService } from '../model/model.service';
import { Model } from '../model/model';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ChartViewBuilderService } from './builder/chart-view-builder.service';
import { ChartViewNoteControllerService }
from './note-controller/chart-view-note-controller.service';
import { ChartViewTrackControllerService }
from './track-controller/chart-view-track-controller.service';
import { ChartViewPreparerService } from './preparer/chart-view-preparer.service';
import { ChartViewPrepared } from './chart-view-prepared';
import { ChartView } from './chart-view';
import { TimeService } from '../time/time.service';

@Injectable()
export class ChartViewService {

    private chartViewSubject: ReplaySubject<ChartView>;
    private currentPreparedView: ChartViewPrepared;
    private currentView: ChartView;
    private currentTime: number;
    private selectedId: number;

    constructor(
        private modelService: ModelService,
        private builder: ChartViewBuilderService,
        private noteController: ChartViewNoteControllerService,
        private trackController: ChartViewTrackControllerService,
        private preparer: ChartViewPreparerService,
        private timeService: TimeService,
    ) {
        this.currentTime = 0;
        this.chartViewSubject = new ReplaySubject<ChartView>();
        Observable.combineLatest(
            this.modelService.models,
            this.trackController.track,
            this.noteController.selectedNote,
            (model, track, selectedNote) => {
                this.currentPreparedView = this.preparer.buildView(model, track);
                this.selectedId = selectedNote ? selectedNote.id : undefined;
            },
        ).subscribe(() => {
            this.renderView(this.currentTime);            
        });
        this.timeService.times.subscribe((time: number) => {
            this.currentTime = time;
        });
        Observable.interval(16.666).subscribe(() => {
            this.renderView(this.currentTime);
        });
        this.renderView(0);
    }

    get view(): Observable<ChartView> {
        return this.chartViewSubject.asObservable();
    }

    private renderView(time: number): void {
        this.currentView = this.builder.buildView
        (this.currentPreparedView, time, this.timeService.playing, this.selectedId);
        this.chartViewSubject.next(this.currentView); 
    }
}
