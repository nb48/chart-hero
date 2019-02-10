import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';

import { SelectorService } from '../../controller/selector/selector.service';
import { TimeService } from '../../time/time.service';
import { ModelTrackEventType } from '../../model/model';
import { Prepared } from '../preparer/prepared';
import { PreparerService } from '../preparer/preparer.service';
import { SpeedService } from '../speed/speed.service';
import { Event } from './event';

@Injectable()
export class EventService {

    private eventsSubject = new ReplaySubject<Event[]>();
    private time: number;
    private prepared: Prepared;
    private selectedId: number;

    constructor(
        private timeService: TimeService,
        private selectorService: SelectorService,
        private preparerService: PreparerService,
        private speedService: SpeedService,
    ) {
        this.eventsSubject = new ReplaySubject<Event[]>();
        combineLatest(
            this.timeService.times,
            this.preparerService.prepareds,
            this.selectorService.selectedEvents,
            (time, prepared, selectedEvent) => {
                this.time = time;
                this.prepared = prepared;
                this.selectedId = selectedEvent ? selectedEvent.id : null;
            },
        ).subscribe(() => {
            this.eventsSubject.next(this.buildEvents());
        });
    }

    get events(): Observable<Event[]> {
        return this.eventsSubject.asObservable();
    }

    private buildEvents(): Event[] {
        return this.prepared.events
            .filter(b => this.speedService.timeInView(b.time, this.time))
            .map(b => ({
                id: b.id,
                time: b.time,
                x: this.buildEventX(b.type),
                y: this.speedService.calculateYPos(b.time, this.time),
                type: b.type,
                selected: b.id === this.selectedId,
                word: b.word,
            }))
            .sort((a, b) => a.type - b.type);
    }

    private buildEventX(type: ModelTrackEventType): number {
        const x = (n: number) => 5 + 10 * n / 6;
        switch (type) {
        case ModelTrackEventType.BPMChange:
            return x(0);
        case ModelTrackEventType.TSChange:
            return x(1);
        case ModelTrackEventType.PracticeSection:
            return x(2);
        case ModelTrackEventType.Lyric:
            return x(3);
        case ModelTrackEventType.SoloToggle:
            return x(4);
        case ModelTrackEventType.StarPowerToggle:
            return x(5);
        case ModelTrackEventType.LyricToggle:
            return x(6);
        }
    }
}
