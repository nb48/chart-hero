import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ChartViewBeat } from '../../chart-view/chart-view';
import { ChartViewService } from '../../chart-view/chart-view.service';
import { ModelTrackNote } from '../../model/model';
import { IncrementService } from '../../time/increment/increment.service';
import { SelectedService } from '../selected/selected.service';

const defaultStep = 1;

@Injectable()
export class TimeService {

    private note: ModelTrackNote;
    private increment: number;
    private beats: ChartViewBeat[];
    private step: number;

    constructor(
        private beatsService: ChartViewService,
        private incrementService: IncrementService,
        private selectedService: SelectedService,
    ) {
        this.beatsService.view.subscribe((view) => {
            this.beats = view.beats;
        });
        this.incrementService.increments.subscribe((increment) => {
            this.increment = increment;
        });
        this.selectedService.selectedNote.subscribe((note) => {
            this.note = note;
        });
        this.step = defaultStep;
    }

    newStep(top: number, bottom: number): void {
        this.step = top / bottom;
        if (isNaN(this.step)) {
            this.step = defaultStep;
        }
    }

    moveForwardsTime(): void {
        this.updateNoteTime(this.increment * this.step);
    }

    moveBackwardsTime(): void {
        this.updateNoteTime(-this.increment * this.step);
    }

    snapForwardsTime(): void {
        const time = this.note.time;
        const nextBeat = this.beats
            .find(e => e.time - 0.001 > time);
        if (!nextBeat) {
            return;
        }
        this.updateNoteTime(nextBeat.time - time);
    }

    snapBackwardsTime(): void {
        const time = this.note.time;
        const previousBeat = this.beats
            .sort((a, b) => b.time - a.time)
            .find(e => e.time + 0.001 < time);
        if (!previousBeat) {
            return;
        }
        this.updateNoteTime(previousBeat.time - time);
    }

    private updateNoteTime(change: number): void {
        this.note.time += change;
        this.selectedService.noteChanged(this.note);
    }
}
