import { Component, Input } from '@angular/core';

import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { TimeService } from '../../time/time.service';
import { Beat } from './beat';

@Component({
    selector: '[app-beat]',
    templateUrl: './beat.component.html',
    styleUrls: ['./beat.component.css'],    
})
export class BeatComponent {
    @Input() beat: Beat;

    constructor(private timeService: TimeService) {
    }

    get playing(): boolean {
        return this.timeService.playing;
    }

    selectAndSnap(event: any): void {
        if (!this.timeService.playing) {
            this.timeService.time = this.beat.time;            
        }
        event.stopPropagation();
    }

    get tooltip(): string {
        return `${showTime(this.beat.time)}`;
    }
}
