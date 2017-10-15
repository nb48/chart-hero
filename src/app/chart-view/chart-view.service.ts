import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { ChartStoreService } from '../chart-store/chart-store.service';
import { ChartStoreView } from '../chart-store/chart-store-view';
import { ChartViewBuilderService } from './chart-view-builder.service';
import { ChartView } from './chart-view';

@Injectable()
export class ChartViewService {

    private chartViewSubject: ReplaySubject<ChartView>;
    private currentChart: ChartStoreView;
    private currentView: ChartView;
    private renderedCurrentView: boolean;

    constructor(
        private audioPlayer: AudioPlayerService,
        private chartStore: ChartStoreService,
        private builder: ChartViewBuilderService,
    ) {
        this.renderedCurrentView = true;
        this.chartViewSubject = new ReplaySubject<ChartView>();
        this.chartStore.chart.subscribe((chart) => {
            this.currentChart = chart;
            this.updateView(0);
        });
        this.audioPlayer.frameEvent.subscribe((time: number) => {
            this.updateView(time);
        });
        this.renderView();
        Observable.interval(16).subscribe((n) => {
            this.renderView();
        });
    }

    get view(): Observable<ChartView> {
        return this.chartViewSubject.asObservable();
    }

    private updateView(time: number): void {
        this.currentView = this.builder.buildView(this.currentChart, time);
        this.renderedCurrentView = false;
    }

    private renderView(): void {
        if (!this.renderedCurrentView) {
            this.renderedCurrentView = true;
            this.chartViewSubject.next(this.currentView);            
        }
    }
}
