import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ChartViewTrack, getTrack } from '../../chart-view/chart-view-track';
import { ModelService } from '../../model/model.service';
import { Model, ModelTrackEvent } from '../../model/model';

const durationWhenNoEvents = 1;

@Injectable()
export class DurationService {

    private durationSubject: ReplaySubject<number>;

    constructor(private model: ModelService) {
        this.durationSubject = new ReplaySubject<number>();
        this.model.models.subscribe((model) => {
            this.durationSubject.next(this.buildDuration(model));
        });
    }

    get durations(): Observable<number> {
        return this.durationSubject.asObservable();
    }

    private buildDuration(model: Model): number {
        const events: ModelTrackEvent[] = [];
        Object.keys(ChartViewTrack)
            .map(k => ChartViewTrack[k])
            .filter(v => typeof v === 'number')
            .forEach((track: ChartViewTrack) => {
                events.push(...getTrack(model, track).events);                
            });
        const lastEvent = events.sort((a, b) => b.time - a.time)[0];
        return lastEvent ? lastEvent.time : durationWhenNoEvents;
    }
}
