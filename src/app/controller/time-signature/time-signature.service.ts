import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackEvent, ModelTrackTSChange } from '../../model/model';
import { SelectorService } from '../selector/selector.service';

@Injectable()
export class TimeSignatureService {

    private event: ModelTrackEvent;

    constructor(
        private actionsService: ActionsService,
        private selectorService: SelectorService,
    ) {
        this.selectorService.selectedEvents.subscribe((event) => {
            this.event = event;
        });
    }

    updateTimeSignature(ts: number): void {
        const newEvent = JSON.parse(JSON.stringify(this.event));
        (newEvent as ModelTrackTSChange).ts = ts;
        this.actionsService.syncTrackEventChanged(newEvent);
    }
}
