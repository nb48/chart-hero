import { ModelService } from '../model/model.service';
import { Model } from '../model/model';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { ChartViewBuilderService } from './builder/chart-view-builder.service';
import { ChartViewNoteControllerService }
from './note-controller/chart-view-note-controller.service';
import { ChartViewTrackControllerService }
from './track-controller/chart-view-track-controller.service';
import { ChartViewPreparerService } from './preparer/chart-view-preparer.service';
import { ChartViewPrepared } from './chart-view-prepared';
import { ChartView } from './chart-view';

@Injectable()
export class ChartViewService {

    private chartViewSubject: ReplaySubject<ChartView>;
    private currentPreparedView: ChartViewPrepared;
    private currentView: ChartView;
    private currentTime: number;
    private selectedId: number;

    constructor(
        private audioPlayer: AudioPlayerService,
        private modelService: ModelService,
        private builder: ChartViewBuilderService,
        private noteController: ChartViewNoteControllerService,
        private trackController: ChartViewTrackControllerService,
        private preparer: ChartViewPreparerService,
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
            this.updateView(this.currentTime);            
        });
        this.audioPlayer.frameEvent.subscribe((time: number) => {
            this.currentTime = time;
            this.updateView(this.currentTime);            
        });
        this.renderView();                            
        Observable.interval(16.666).subscribe(() => {
            this.renderView();
        });
    }

    get view(): Observable<ChartView> {
        return this.chartViewSubject.asObservable();
    }

    private updateView(time: number): void {
        this.currentView = this.builder.buildView
            (this.currentPreparedView, time, this.audioPlayer.playing, this.selectedId);
    }

    private renderView(): void {
        this.chartViewSubject.next(this.currentView); 
    }
}
