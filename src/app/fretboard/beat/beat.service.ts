import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ModelTrackNote } from '../../model/model';
import { Prepared } from '../../renderer/preparer/prepared';
import { PreparerService } from '../../renderer/preparer/preparer.service';
import { RendererService } from '../../renderer/renderer.service';
import { Beat } from './beat';

const speed = 1;
const timeBefore = (1 / speed) * 1.2;
const timeAfter = (1 / speed) * -0.3;
const spacer = 0.2;

const zeroPosition = (): number => {
    return timeBefore / (timeBefore - timeAfter) * 100;
};

@Injectable()
export class BeatService {

    private beatsSubject: ReplaySubject<Beat[]>;
    private zeroPositionsSubject: ReplaySubject<number>;
    private prepared: Prepared;
    private time: number;

    constructor(
        private preparerService: PreparerService,
        private rendererService: RendererService,
    ) {
        this.beatsSubject = new ReplaySubject<Beat[]>();
        this.zeroPositionsSubject = new ReplaySubject<number>();
        Observable.combineLatest(
            this.preparerService.prepareds,
            this.rendererService.renders,
            (prepared, time) => {
                this.prepared = prepared;
                this.time = time;
            },
        ).subscribe(() => {
            this.beatsSubject.next(this.buildBeats());
        });
        this.zeroPositionsSubject.next(zeroPosition());
    }

    get beats(): Observable<Beat[]> {
        return this.beatsSubject.asObservable();
    }

    get zeroPositions(): Observable<number> {
        return this.zeroPositionsSubject.asObservable();
    }

    private buildBeats(): Beat[] {
        return this.prepared.beats
            .filter(b => this.timeInView(b.time, this.time))
            .map(b => ({
                id: b.id,
                time: b.time,
                y: this.calculateYPos(b.time, this.time),
            }));
    }

    private timeInView(eventTime: number, currentTime: number): boolean {
        return eventTime > (currentTime + timeAfter - spacer) &&
            eventTime < (currentTime + timeBefore + spacer);
    }

    private calculateYPos(eventTime: number, currentTime: number): number {
        const bottom = currentTime + timeAfter;
        const top = currentTime + timeBefore;
        return (1 - (eventTime - bottom) / (top - bottom)) * 100;
    }
}
