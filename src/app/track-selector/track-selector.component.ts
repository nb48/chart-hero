import { Component } from '@angular/core';

import { ChartViewTrackControllerService }
from '../chart-view/track-controller/chart-view-track-controller.service';
import { ChartViewTrack } from '../chart-view/chart-view-track';

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
    templateUrl: './track-selector.component.html',
    styleUrls: ['./track-selector.component.css'],
})
export class TrackSelectorComponent {

    tracks = tracks;
    track: ChartViewTrack;

    constructor(public trackController: ChartViewTrackControllerService) {
        this.trackController.track.subscribe((track) => {
            this.track = track;
        });
    }

    captureScroll(e: any) {
        e.stopPropagation();
    }
}
