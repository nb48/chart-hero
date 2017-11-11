import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Prepared } from '../preparer/prepared';
import { PreparerService } from '../preparer/preparer.service';
import { RendererService } from '../renderer/renderer.service';

@Injectable()
export class EventService {

    private eventsSubject = new ReplaySubject<any[]>();
    private prepared: Prepared;
    private time: number;

    constructor(
        private preparerService: PreparerService,
        private rendererService: RendererService,
    ) {
        this.eventsSubject = new ReplaySubject<any[]>();
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

    get events(): Observable<any[]> {
        return this.eventsSubject.asObservable();
    }

    private buildEvents(): any[] {
        return [];
    }
}
