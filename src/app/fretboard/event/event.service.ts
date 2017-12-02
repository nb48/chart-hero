import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { SelectorService } from '../../controller/selector/selector.service';
import { TimeService } from '../../time/time.service';
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
        Observable.combineLatest(
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
                x: 14,
                y: this.speedService.calculateYPos(b.time, this.time),
                type: b.type,
                selected: b.id === this.selectedId,
            }));
    }
}
