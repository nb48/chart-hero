import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import { ChartViewTrack, getTrack } from '../../../chart-view/chart-view-track';
import { ModelService } from '../../../model/model.service';
import {
    Model,
    ModelTrackEvent,
    ModelTrackEventType,
    ModelTrackBPMChange,
} from '../../../model/model';
import { showTime } from '../../audio-player-controls/audio-player-controls.component';
import { TimeService } from '../../time.service';
import { Scrollbar } from './scrollbar';
const durationWhenNoEvents = 1;

@Injectable()
export class ScrollbarBuilder {

    private durationSubject: ReplaySubject<number>;
    private scrollbarSubject: ReplaySubject<Scrollbar>;

    constructor(
        private model: ModelService,
        private time: TimeService,
    ) {
        this.durationSubject = new ReplaySubject<number>();
        this.scrollbarSubject = new ReplaySubject<Scrollbar>();
        this.model.models.subscribe((model) => {
            this.durationSubject.next(this.buildDuration(model));
        });
        Observable.combineLatest(this.model.models, this.time.times, ((model, time) => {
            this.scrollbarSubject.next(this.buildScrollbar(model, time));            
        })).subscribe(() => {  
        });
    }

    get duration(): Observable<number> {
        return this.durationSubject.asObservable();
    }

    get scrollbar(): Observable<Scrollbar> {
        return this.scrollbarSubject.asObservable();
    }

    buildScrollbar(model: Model, time: number): Scrollbar {
        return {
            currentIncrement: this.buildCurrentIncrement(model, time),
            currentTime: time,
            formattedTime: showTime(time),
        };
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

    private buildCurrentIncrement(model: Model, time: number): number {
        if (this.time.playing) {
            return 0;
        }
        const currentBPM = model.syncTrack.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .sort((a, b) => b.time - a.time)
            .find(e => e.time <= time + 0.005).bpm;
        return 60 / currentBPM;
    }
}
