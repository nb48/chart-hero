import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { ChartStoreService } from '../chart-store/chart-store.service';
import { ChartStore } from '../chart-store/chart-store';
import { ChartViewBuilderService } from './builder/chart-view-builder.service';
import { ChartViewControllerService } from './controller/chart-view-controller.service';
import { ChartViewPreparerService } from './preparer/chart-view-preparer.service';
import { ChartViewPrepared } from './chart-view-prepared';
import { ChartView } from './chart-view';

@Injectable()
export class ChartViewService {

    private chartViewSubject: ReplaySubject<ChartView>;
    private currentPreparedView: ChartViewPrepared;
    private currentView: ChartView;
    private currentTime: number;

    constructor(
        private audioPlayer: AudioPlayerService,
        private chartStore: ChartStoreService,
        private builder: ChartViewBuilderService,
        private controller: ChartViewControllerService,
        private preparer: ChartViewPreparerService,
    ) {
        this.currentTime = 0;
        this.chartViewSubject = new ReplaySubject<ChartView>();
        this.chartStore.chart.combineLatest(this.controller.track, (chart, track) => {
            this.currentPreparedView = this.preparer.buildView(chart, track);
        }).subscribe(() => {
            this.updateView(this.currentTime);  
        });
        this.audioPlayer.frameEvent.subscribe((time: number) => {
            this.currentTime = time;
        });
        Observable.interval(16.666).subscribe((n) => {
            this.updateView(this.currentTime);            
            this.renderView();
        });
    }

    get view(): Observable<ChartView> {
        return this.chartViewSubject.asObservable();
    }

    private updateView(time: number): void {
        this.currentView = this.builder.buildView
            (this.currentPreparedView, time, this.audioPlayer.playing);
    }

    private renderView(): void {
        this.chartViewSubject.next(this.currentView);
    }
}
