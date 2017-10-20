import { Component } from '@angular/core';

const tracks = [{
    model: 'ghlGuitar.expert',
    view: 'Guitar Hero Live - Expert',
}, {
    model: 'ghlGuitar.hard',
    view: 'Guitar Hero Live - Hard',
}, {
    model: 'ghlGuitar.medium',
    view: 'Guitar Hero Live - Medium',
}, {
    model: 'ghlGuitar.easy',
    view: 'Guitar Hero Live - Easy',
}];

@Component({
    selector: 'app-track-selector',
    templateUrl: './track-selector.component.html',
    styleUrls: ['./track-selector.component.css'],
})
export class TrackSelectorComponent {

    currentTrack: string;
    tracks = tracks;

    constructor() {
        this.currentTrack = 'ghlGuitar.expert';
    }
}
