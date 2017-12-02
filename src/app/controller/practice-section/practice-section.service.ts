import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackEvent, ModelTrackPracticeSection } from '../../model/model';
import { SelectorService } from '../selector/selector.service';

@Injectable()
export class PracticeSectionService {

    private event: ModelTrackEvent;

    constructor(
        private actionsService: ActionsService,
        private selectorService: SelectorService,
    ) {
        this.selectorService.selectedEvents.subscribe((event) => {
            this.event = event;
        });
    }

    updatePracticeSection(name: string): void {
        const newEvent = JSON.parse(JSON.stringify(this.event));
        (newEvent as ModelTrackPracticeSection).name = name;
        this.actionsService.eventEventChanged(newEvent);
    }
}
