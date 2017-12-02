import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { TimeService } from '../../time/time.service';
import { Prepared } from '../preparer/prepared';
import { PreparerService } from '../preparer/preparer.service';
import { SpeedService } from '../speed/speed.service';
import { EventLink } from './event-link';

@Injectable()
export class EventLinkService {

    private eventLinksSubject = new ReplaySubject<EventLink[]>();
    private time: number;
    private prepared: Prepared;

    constructor(
        private timeService: TimeService,
        private preparerService: PreparerService,
        private speedService: SpeedService,
    ) {
        this.eventLinksSubject = new ReplaySubject<EventLink[]>();
        Observable.combineLatest(
            this.timeService.times,
            this.preparerService.prepareds,
            (time, prepared) => {
                this.time = time;
                this.prepared = prepared;
            },
        ).subscribe(() => {
            this.eventLinksSubject.next(this.buildEventLinks());
        });
    }

    get eventLinks(): Observable<EventLink[]> {
        return this.eventLinksSubject.asObservable();
    }

    private buildEventLinks(): EventLink[] {
        return this.prepared.eventLinks
            .filter(b => this.speedService.timeInView(b.startTime, this.time) ||
                this.speedService.timeInView(b.endTime, this.time))
            .map(b => ({
                type: b.type,
                x: 14,
                y1: this.speedService.calculateYPos(b.startTime, this.time),
                y2: this.speedService.calculateYPos(b.endTime, this.time),
            }));
    }
}
