import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { TimeService } from '../time/time.service';
import { PreparerService } from './preparer/preparer.service';

@Injectable()
export class RendererService {

    private rendersSubject: ReplaySubject<number>;

    private currentTime: number;
    private selectedId: number;

    constructor(
        private preparerService: PreparerService,
        private timeService: TimeService,
    ) {
        this.currentTime = 0;
        this.rendersSubject = new ReplaySubject<number>();
        this.preparerService.prepareds.subscribe((prepared) => {
            this.renderView(this.currentTime);
        });
        this.timeService.times.subscribe((time: number) => {
            this.currentTime = time;
        });
        Observable.interval(16.666).subscribe(() => {
            this.renderView(this.currentTime);
        });
        this.renderView(0);
    }

    get renders(): Observable<number> {
        return this.rendersSubject.asObservable();
    }

    private renderView(time: number): void {
        this.rendersSubject.next(time);
    }
}
