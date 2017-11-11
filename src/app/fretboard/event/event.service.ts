import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Prepared } from '../preparer/prepared';
import { PreparerService } from '../preparer/preparer.service';
import { RendererService } from '../renderer/renderer.service';
import { SpeedService } from '../speed/speed.service';
import { Event } from './event';

@Injectable()
export class EventService {

    private eventsSubject = new ReplaySubject<Event[]>();
    private prepared: Prepared;
    private time: number;

    constructor(
        private preparerService: PreparerService,
        private rendererService: RendererService,
        private speedService: SpeedService,
    ) {
        this.eventsSubject = new ReplaySubject<Event[]>();
        Observable.combineLatest(
            this.preparerService.prepareds,
            this.rendererService.renders,
            (prepared, time) => {
                this.prepared = prepared;
                this.time = time;
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
                x: 10,
                y: this.speedService.calculateYPos(b.time, this.time),
                type: b.event,
            }));
    }
}
