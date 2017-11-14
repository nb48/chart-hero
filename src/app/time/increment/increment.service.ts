import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import { ModelService } from '../../model/model.service';
import {
    Model,
    ModelTrackEventType,
    ModelTrackBPMChange,
} from '../../model/model';
import { TimeService } from '../time.service';

@Injectable()
export class IncrementService {

    private incrementSubject: ReplaySubject<number>;

    constructor(private model: ModelService, private time: TimeService) {
        this.incrementSubject = new ReplaySubject<number>();
        Observable.combineLatest(this.model.models, this.time.times, ((model, time) => {
            this.incrementSubject.next(this.buildCurrentIncrement(model, time));            
        })).subscribe(() => {  
        });
    }

    get increments(): Observable<number> {
        return this.incrementSubject.asObservable();
    }

    private buildCurrentIncrement(model: Model, time: number): number {
        if (this.time.playing) {
            return 0;
        }
        const reversedBPMChanges = model.syncTrack.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .sort((a, b) => b.time - a.time);
        const firstBPMChange = reversedBPMChanges[reversedBPMChanges.length - 1];
        if (time < firstBPMChange.time) {
            return 60 / firstBPMChange.bpm;
        }
        const currentBPM = reversedBPMChanges
            .find(e => e.time <= time + 0.005).bpm;
        return 60 / currentBPM;
    }
}
