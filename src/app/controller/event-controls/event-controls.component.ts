import { Component } from '@angular/core';

import { ModelTrackBPMChange } from '../../model/model';
import { SelectorService } from '../selector/selector.service';

@Component({
    selector: 'app-event-controls',
    templateUrl: './event-controls.component.html',
    styleUrls: ['./event-controls.component.css'],
})
export class EventControlsComponent {

    selected: boolean;
    id: number;
    time: number;
    type: string;
    bpm: number;

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
            this.id = event.id;
            this.time = event.time;
            this.type = 'BPM Change';
            this.bpm = (event as ModelTrackBPMChange).bpm;
        });
    }
}
