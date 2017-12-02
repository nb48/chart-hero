import { Component, Input } from '@angular/core';

import { SelectorService } from '../../controller/selector/selector.service';
import { ModelTrackEventType } from '../../model/model';
import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { TimeService } from '../../time/time.service';
import { Event } from './event';

@Component({
    selector: '[app-event]',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
})
export class EventComponent {
    @Input() event: Event;

    constructor(
        private selectorService: SelectorService,
        private timeService: TimeService,
    ) {
    }

    get color(): string {
        switch (this.event.type) {
        case ModelTrackEventType.BPMChange:
            return 'white';
        case ModelTrackEventType.TSChange:
            return 'gold';
        case ModelTrackEventType.StarPowerToggle:
            return 'red';
        }
        throw new Error('Unsupported event passed to event component');
    }

    get playing(): boolean {
        return this.timeService.playing;
    }

    select(event: any): void {
        if (!this.timeService.playing) {
            this.selectorService.selectEvent(this.event.id);
        }
        event.stopPropagation();
    }

    selectAndSnap(event: any): void {
        if (!this.timeService.playing) {
            this.selectorService.selectEvent(this.event.id);
            this.timeService.time = this.event.time;            
        }
        event.stopPropagation();
    }

    get tooltip(): string {
        const type = this.type();
        return `${type} - ${showTime(this.event.time)}`;
    }

    private type(): string {
        switch (this.event.type) {
        case ModelTrackEventType.BPMChange:
            return 'BPM';
        case ModelTrackEventType.TSChange:
            return 'TS';
        case ModelTrackEventType.StarPowerToggle:
            return 'SP';
        }
    }
}
