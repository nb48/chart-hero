import { Component } from '@angular/core';

import { ChartViewTrack } from '../../chart-view/chart-view-track';
import { TrackService } from '../track.service';

const tracks = [{
    model: ChartViewTrack.GuitarExpert,
    view: 'Guitar - Expert',
}, {
    model: ChartViewTrack.GuitarHard,
    view: 'Guitar - Hard',
}, {
    model: ChartViewTrack.GuitarMedium,
    view: 'Guitar - Medium',
}, {
    model: ChartViewTrack.GuitarEasy,
    view: 'Guitar - Easy',
}, {
    model: ChartViewTrack.GHLGuitarExpert,
    view: 'Guitar Hero Live - Expert',
}, {
    model: ChartViewTrack.GHLGuitarHard,
    view: 'Guitar Hero Live - Hard',
}, {
    model: ChartViewTrack.GHLGuitarMedium,
    view: 'Guitar Hero Live - Medium',
}, {
    model: ChartViewTrack.GHLGuitarEasy,
    view: 'Guitar Hero Live - Easy',
}];

@Component({
    selector: 'app-track-selector',
    templateUrl: './selector.component.html',
    styleUrls: ['./selector.component.css'],
})
export class TrackSelectorComponent {

    tracks = tracks;
    track: ChartViewTrack;

    constructor(public trackService: TrackService) {
        this.trackService.track.subscribe((track) => {
            this.track = track;
        });
    }

    captureScroll(e: any) {
        e.stopPropagation();
    }
}
