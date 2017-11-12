import { Component, Input } from '@angular/core';

import { SelectorService } from '../../controller/selector/selector.service';
import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { Event } from './event';

@Component({
    selector: '[app-event]',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
})
export class EventComponent {
    @Input() event: Event;

    constructor(private selectorService: SelectorService) {
    }

    select(event: any): void {
        this.selectorService.selectEvent(this.event.id);
        event.stopPropagation();
    }

    get tooltip(): string {
        return `${this.event.id}, ${showTime(this.event.time)}`;
    }
}
