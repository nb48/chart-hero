import { Component, Input } from '@angular/core';

import { ModelTrackEventType } from '../../model/model';
import { EventLink } from './event-link';

@Component({
    selector: '[app-event-link]',
    templateUrl: './event-link.component.html',
    styleUrls: ['./event-link.component.css'],
})
export class EventLinkComponent {
    @Input() eventLink: EventLink;

    get color(): string {
        switch (this.eventLink.type) {
        case ModelTrackEventType.SoloToggle:
            return 'blue';
        case ModelTrackEventType.StarPowerToggle:
            return 'orange';
        }
        throw new Error('Unsupported event link passed to event link component');
    }
}
