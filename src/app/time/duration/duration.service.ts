import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Track, getTrack } from '../../track/track';
import { ModelService } from '../../model/model.service';
import { Model, ModelTrackEvent } from '../../model/model';

const minDuration = 5;

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
        Object.keys(Track)
            .map(k => Track[k])
            .filter(v => typeof v === 'number')
            .forEach((track: Track) => {
                events.push(...getTrack(model, track).events);                
            });
        const lastEvent = events.sort((a, b) => b.time - a.time)[0];
        const lastLength = lastEvent && (lastEvent as any).length ? (lastEvent as any).length : 0;
        const duration = lastEvent ? lastEvent.time + lastLength : minDuration;
        return duration < minDuration ? minDuration : duration;
    }
}
