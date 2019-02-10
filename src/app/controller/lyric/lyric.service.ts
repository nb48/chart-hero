import { Injectable } from '@angular/core';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackEvent, ModelTrackLyric } from '../../model/model';
import { SelectorService } from '../selector/selector.service';

@Injectable()
export class LyricService {

    private event: ModelTrackEvent;

    constructor(
        private actionsService: ActionsService,
        private selectorService: SelectorService,
    ) {
        this.selectorService.selectedEvents.subscribe((event) => {
            this.event = event;
        });
    }

    updateWord(word: string): void {
        if (!this.event) {
            return;
        }
        const newEvent = JSON.parse(JSON.stringify(this.event)) as ModelTrackLyric;
        newEvent.word = word;
        this.actionsService.eventEventChanged(newEvent);
    }

    flipMultiSyllable(): void {
        if (!this.event) {
            return;
        }
        const newEvent = JSON.parse(JSON.stringify(this.event)) as ModelTrackLyric;
        newEvent.multiSyllable = !newEvent.multiSyllable;
        this.actionsService.eventEventChanged(newEvent);
    }
}
