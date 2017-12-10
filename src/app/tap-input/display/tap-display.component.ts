import { Component } from '@angular/core';

import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { TapInputService, TapInputTime } from '../tap-input.service';

@Component({
    selector: 'app-tap-display',
    templateUrl: './tap-display.component.html',
    styleUrls: ['./tap-display.component.css'],
})
export class TapDisplayComponent {

    times: TapInputTime[];

    constructor(private service: TapInputService) {
        this.service.times.subscribe((times) => {
            this.times = times;
        });
    }

    captureScroll(event: Event): void {
        event.stopPropagation();
    }

    showTime(time: TapInputTime): string {
        return showTime(time.time);
    }

    selectAll(): void {
        this.times.forEach(time => time.selected = true);
    }

    deselectAll(): void {
        this.times.forEach(time => time.selected = false);        
    }

    createNotes(): void {
        this.service.createNotes();
    }
}
