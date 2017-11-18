import { Component, Input } from '@angular/core';

import { SelectorService } from '../../controller/selector/selector.service';
import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { TimeService } from '../../time/time.service';
import { Event } from './event';

@Component({
    selector: '[app-event]',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
})
export class EventComponent {
    @Input() event: Event;

    constructor(
        private selectorService: SelectorService,
        private timeService: TimeService,
    ) {
    }

    get playing(): boolean {
        return this.timeService.playing;
    }

    select(event: any): void {
        if (!this.timeService.playing) {
            this.selectorService.selectNote(this.event.id);            
        }
        event.stopPropagation();
    }

    selectAndSnap(event: any): void {
        if (!this.timeService.playing) {
            this.selectorService.selectNote(this.event.id);
            this.timeService.time = this.event.time;            
        }
        event.stopPropagation();
    }

    get tooltip(): string {
        return `${this.event.id}, ${showTime(this.event.time)}`;
    }
}
