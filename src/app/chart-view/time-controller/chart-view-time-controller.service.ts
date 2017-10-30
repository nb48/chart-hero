import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { IncrementService } from '../../time/increment/increment.service';
import { ChartViewService } from '../chart-view.service';
import { ChartView } from '../chart-view';

const defaultStep = 1;

@Injectable()
export class ChartViewTimeControllerService {

    private increment: number;
    private step: number;
    private view: ChartView;

    constructor(private incrementService: IncrementService, private viewService: ChartViewService) {
        this.incrementService.increments.subscribe((increment) => {
            this.increment = increment;
        });
        this.step = defaultStep;
        this.viewService.view.subscribe((view) => {
            this.view = view;
        });
    }

    newStep(top: number, bottom: number): void {
        this.step = top / bottom;
        if (isNaN(this.step)) {
            this.step = defaultStep;
        }
    }

    moveForwardsTime(time: number): number {
        return this.increment * this.step;
    }

    moveBackwardsTime(time: number): number {
        return -this.increment * this.step;
    }

    snapForwardsTime(time: number): number {
        const nextBeat = this.view.beats
            .find(e => e.time - 0.001 > time);
        if (!nextBeat) {
            return 0;
        }
        return nextBeat.time - time;
    }

    snapBackwardsTime(time: number): number {
        const previousBeat = this.view.beats
            .sort((a, b) => b.time - a.time)
            .find(e => e.time + 0.001 < time);
        if (!previousBeat) {
            return 0;
        }
        return previousBeat.time - time;
    }
}
