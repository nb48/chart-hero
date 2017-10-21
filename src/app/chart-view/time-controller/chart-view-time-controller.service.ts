import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ChartViewService } from '../chart-view.service';
import { ChartViewTrack } from '../chart-view-track';
import { ChartView } from '../chart-view';

const defaultStep = 1;

@Injectable()
export class ChartViewTimeControllerService {

    private currentView: ChartView;
    private step: number;

    constructor(private view: ChartViewService) {
        this.step = defaultStep;
        this.view.view.subscribe((view) => {
            this.currentView = view;
        });
    }

    newStep(top: number, bottom: number): void {
        this.step = top / bottom;
        if (isNaN(this.step)) {
            this.step = defaultStep;
        }
    }

    moveForwardsTime(time: number): number {
        return this.currentView.currentIncrement * this.step;
    }

    moveBackwardsTime(time: number): number {
        return -this.currentView.currentIncrement * this.step;
    }

    snapForwardsTime(time: number): number {
        const nextBeat = this.currentView.beats
            .find(e => e.time - 0.001 > time);
        if (!nextBeat) {
            return 0;
        }
        return nextBeat.time - time;
    }

    snapBackwardsTime(time: number): number {
        const previousBeat = this.currentView.beats
            .sort((a, b) => b.time - a.time)
            .find(e => e.time + 0.001 < time);
        if (!previousBeat) {
            return 0;
        }
        return previousBeat.time - time;
    }
}
