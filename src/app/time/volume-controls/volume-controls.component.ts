import { Component } from '@angular/core';

import { AudioPlayerService } from '../audio-player/audio-player.service';

const defaultVolume = 25;

@Component({
    selector: 'app-volume-controls',
    templateUrl: './volume-controls.component.html',
    styleUrls: ['./volume-controls.component.css'],
})
export class VolumeControlsComponent {

    private $volume: number;

    constructor(private audioPlayer: AudioPlayerService) {
        this.volume = defaultVolume;
    }

    get volume(): number {
        return this.$volume;
    }

    set volume(volume: number) {
        this.$volume = volume;
        this.audioPlayer.setVolume(this.$volume / 100);
    }

    captureEvent(event: any) {
        event.stopPropagation();
    }
}
