import { Component, Input } from '@angular/core';

import { Event } from './event';

@Component({
    selector: '[app-event]',
    templateUrl: './event.component.html',
})
export class EventComponent {
    @Input() event: Event;
}
