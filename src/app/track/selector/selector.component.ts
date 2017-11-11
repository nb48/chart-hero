import { Component } from '@angular/core';

import { Track } from '../track';
import { TrackService } from '../track.service';

const tracks = [{
    model: Track.GuitarExpert,
    view: 'Guitar - Expert',
}, {
    model: Track.GuitarHard,
    view: 'Guitar - Hard',
}, {
    model: Track.GuitarMedium,
    view: 'Guitar - Medium',
}, {
    model: Track.GuitarEasy,
    view: 'Guitar - Easy',
}, {
    model: Track.GHLGuitarExpert,
    view: 'Guitar Hero Live - Expert',
}, {
    model: Track.GHLGuitarHard,
    view: 'Guitar Hero Live - Hard',
}, {
    model: Track.GHLGuitarMedium,
    view: 'Guitar Hero Live - Medium',
}, {
    model: Track.GHLGuitarEasy,
    view: 'Guitar Hero Live - Easy',
}];

@Component({
    selector: 'app-track-selector',
    templateUrl: './selector.component.html',
    styleUrls: ['./selector.component.css'],
})
export class TrackSelectorComponent {

    tracks = tracks;
    track: Track;

    constructor(public trackService: TrackService) {
        this.trackService.tracks.subscribe((track) => {
            this.track = track;
        });
    }

    captureScroll(e: any) {
        e.stopPropagation();
    }
}
