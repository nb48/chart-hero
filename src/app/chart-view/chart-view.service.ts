import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { ChartStoreService } from '../chart-store/chart-store.service';
import { ChartStoreView } from '../chart-store/chart-store-view';
import { ChartViewBuilderService } from './chart-view-builder.service';
import { ChartView, defaultChartView } from './chart-view';

@Injectable()
export class ChartViewService {

    private chartViewSubject: BehaviorSubject<ChartView>;
    private currentChart: ChartStoreView;

    constructor(
        private audioPlayer: AudioPlayerService,
        private chartStore: ChartStoreService,
        private builder: ChartViewBuilderService,
    ) {
        this.chartViewSubject = new BehaviorSubject<ChartView>(defaultChartView());
        this.chartStore.chart.subscribe((chart) => {
            this.currentChart = chart;
        });
        this.audioPlayer.frameEvent.subscribe((time: number) => {
            this.chartViewSubject.next(this.builder.buildView(this.currentChart, time));
        });
    }

    get view(): Observable<ChartView> {
        return this.chartViewSubject.asObservable();
    }
}
