import { Component } from '@angular/core';

import { SelectorService } from '../selector/selector.service';

@Component({
    selector: 'app-event-controls',
    templateUrl: './event-controls.component.html',
    styleUrls: ['./event-controls.component.css'],
})
export class EventControlsComponent {

    selected: boolean;

    constructor(
        private selectorService: SelectorService,
    ) {
        this.selected = false;
        this.selectorService.selectedEvents.subscribe((event) => {
            if (!event) {
                this.selected = false;
                return;
            }
            this.selected = true;
        });
    }
}
