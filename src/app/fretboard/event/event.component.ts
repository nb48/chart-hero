import { Component, Input } from '@angular/core';

import { Event } from './event';

@Component({
    selector: '[app-event]',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
})
export class EventComponent {
    @Input() event: Event;

    select(): void {
    }

    get tooltip(): string {
        return `${this.event.id}, ${Math.floor(this.event.time * 1000) / 1000}`;
    }
}
