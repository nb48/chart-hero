import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ModelTrackNote } from '../../model/model';
import { TimeService } from '../../time/time.service';
import { Prepared } from '../preparer/prepared';
import { PreparerService } from '../preparer/preparer.service';
import { SpeedService } from '../speed/speed.service';
import { Beat } from './beat';

@Injectable()
export class BeatService {

    private beatsSubject: ReplaySubject<Beat[]>;
    private zeroPositionsSubject: ReplaySubject<number>;
    private prepared: Prepared;
    private time: number;

    constructor(
        private timeService: TimeService,
        private preparerService: PreparerService,
        private speedService: SpeedService,
    ) {
        this.beatsSubject = new ReplaySubject<Beat[]>();
        this.zeroPositionsSubject = new ReplaySubject<number>();
        Observable.combineLatest(
            this.timeService.times,
            this.preparerService.prepareds,
            (time, prepared) => {
                this.prepared = prepared;
                this.time = time;
            },
        ).subscribe(() => {
            this.beatsSubject.next(this.buildBeats());
        });
        this.zeroPositionsSubject.next(this.speedService.zeroPosition());
    }

    get beats(): Observable<Beat[]> {
        return this.beatsSubject.asObservable();
    }

    get zeroPositions(): Observable<number> {
        return this.zeroPositionsSubject.asObservable();
    }

    private buildBeats(): Beat[] {
        return this.prepared.beats
            .filter(b => this.speedService.timeInView(b.time, this.time))
            .map(b => ({
                id: b.id,
                time: b.time,
                y: this.speedService.calculateYPos(b.time, this.time),
            }));
    }
}
