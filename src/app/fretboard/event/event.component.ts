import { Component, Input } from '@angular/core';

import { Event } from './event';
import { SelectorService } from '../../controller/selector/selector.service';

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
        return `${this.event.id}, ${Math.floor(this.event.time * 1000) / 1000}`;
    }
}
