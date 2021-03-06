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
            return 'green';
        case ModelTrackEventType.TSChange:
            return 'red';
        case ModelTrackEventType.PracticeSection:
            return 'yellow';
        case ModelTrackEventType.Lyric:
            return 'white';
        case ModelTrackEventType.SoloToggle:
            return 'blue';
        case ModelTrackEventType.StarPowerToggle:
            return 'orange';
        case ModelTrackEventType.LyricToggle:
            return 'black';
        }
        throw new Error('Unsupported event passed to event component');
    }

    get stroke(): string {
        return this.event.type === ModelTrackEventType.LyricToggle ? 'white' : 'black';
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
        const defaultTitle = `${type} - ${showTime(this.event.time)}`;
        if (this.event.type === ModelTrackEventType.Lyric) {
            return `${defaultTitle} - ${this.event.word}`;
        }
        return defaultTitle;
    }

    private type(): string {
        switch (this.event.type) {
        case ModelTrackEventType.BPMChange:
            return 'BPM Change';
        case ModelTrackEventType.TSChange:
            return 'Time Signature Change';
        case ModelTrackEventType.PracticeSection:
            return 'Practice Section';
        case ModelTrackEventType.Lyric:
            return 'Lyric';
        case ModelTrackEventType.SoloToggle:
            return 'Solo Toggle';
        case ModelTrackEventType.StarPowerToggle:
            return 'Star Power Toggle';
        case ModelTrackEventType.LyricToggle:
            return 'Lyric Toggle';
        }
    }
}
