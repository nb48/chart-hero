import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

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

@Injectable()
export class ScrollbarBuilder {

    private scrollbarSubject: ReplaySubject<Scrollbar>;

    constructor(
        private model: ModelService,
        private time: TimeService,
    ) {
        this.scrollbarSubject = new ReplaySubject<Scrollbar>();
        Observable.combineLatest(this.model.models, this.time.times, ((model, time) => {
            this.scrollbarSubject.next(this.buildScrollbar(model, time));            
        })).subscribe(() => {  
        });
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
