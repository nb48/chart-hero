import { Component } from '@angular/core';

import { AudioPlayerService } from '../audio-player/audio-player.service';

@Component({
    selector: 'app-audio-player-controls',
    templateUrl: './audio-player-controls.component.html',
    styleUrls: ['./audio-player-controls.component.css'],
})
export class AudioPlayerControlsComponent {

    constructor (public audioPlayer: AudioPlayerService) {
    }
}
