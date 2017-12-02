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
            .filter(el => this.speedService.timeInView(el.startTime, this.time) ||
                this.speedService.timeInView(el.endTime, this.time) ||
                this.time > el.startTime && this.time < el.endTime)
            .map(el => ({
                id: el.id,
                type: el.type,
                x: this.buildEventX(el.level),
                y1: this.speedService.calculateYPos(el.startTime, this.time),
                y2: this.speedService.calculateYPos(el.endTime, this.time),
            }));
    }
    
    private buildEventX(level: number): number {
        return 14 - (level * 2.5);
    }
}
