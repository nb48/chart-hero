import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackEvent, ModelTrackBPMChange } from '../../model/model';
import { SelectorService } from '../selector/selector.service';

@Injectable()
export class BPMService {

    private event: ModelTrackEvent;

    constructor(
        private actionsService: ActionsService,
        private selectorService: SelectorService,
    ) {
        this.selectorService.selectedEvents.subscribe((event) => {
            this.event = event;
        });
    }

    updateBPM(bpm: number): void {
        const newEvent = JSON.parse(JSON.stringify(this.event));
        (newEvent as ModelTrackBPMChange).bpm = bpm;
        this.actionsService.syncTrackChanged(newEvent);
    }
}
