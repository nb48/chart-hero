import { Component } from '@angular/core';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackBPMChange } from '../../model/model';
import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { BPMService } from '../bpm/bpm.service';
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
    formattedTime: string;
    type: string;
    bpm: number;

    constructor(
        private actionsService: ActionsService,
        private bpmService: BPMService,
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
            this.formattedTime = showTime(event.time);
            this.type = 'BPM Change';
            this.bpm = (event as ModelTrackBPMChange).bpm;
        });
    }

    bpmChanged(bpm: number) {
        if (bpm && bpm > 0) {
            this.bpmService.updateBPM(bpm);            
        }
    }

    delete() {
        this.actionsService.deleteSyncTrackEvent(this.id);
        this.selectorService.selectNearest();
    }
}
