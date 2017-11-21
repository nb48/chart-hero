import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Beat } from '../../fretboard/beat/beat';
import { BeatService } from '../../fretboard/beat/beat.service';
import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackNote } from '../../model/model';
import { IncrementService } from '../../time/increment/increment.service';
import { SelectorService } from '../selector/selector.service';

const defaultStep = 1;

export interface StepInfo {
    stepControl: string;
    customStepTop: number;
    customStepBottom: number;
}

@Injectable()
export class StepService {

    private note: ModelTrackNote;
    private increment: number;
    private beats: Beat[];
    private step: number;
    private $stepControl: string;
    private $customStepTop: number;
    private $customStepBottom: number;
    private stepInfoSubject: ReplaySubject<StepInfo>;

    constructor(
        private beatsService: BeatService,
        private actionsService: ActionsService,
        private incrementService: IncrementService,
        private selectorService: SelectorService,
    ) {
        this.beatsService.beats.subscribe((beats) => {
            this.beats = beats;
        });
        this.incrementService.increments.subscribe((increment) => {
            this.increment = increment;
        });
        this.selectorService.selectedNotes.subscribe((note) => {
            this.note = note;
        });
        this.step = defaultStep;
        this.stepInfoSubject = new ReplaySubject<StepInfo>();
    }

    get stepControl(): string {
        return this.$stepControl;
    }

    get customStepTop(): number {
        return this.$customStepTop;
    }

    get customStepBottom(): number {
        return this.$customStepBottom;
    }

    get stepInfos(): Observable<StepInfo> {
        return this.stepInfoSubject.asObservable();
    }

    newStep(top: number, bottom: number, stepControl: string): void {
        this.step = top / bottom;
        if (isNaN(this.step)) {
            this.step = defaultStep;
        }
        this.$stepControl = stepControl;
        if (stepControl === 'custom') {
            this.$customStepTop = top;
            this.$customStepBottom = bottom;
        }
        this.stepInfoSubject.next({
            stepControl: this.$stepControl,
            customStepTop: this.$customStepTop,
            customStepBottom: this.$customStepBottom,
        });
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

    increaseSustain(): void {
        this.updateNoteLength(this.increment * this.step);
    }

    decreaseSustain(): void {
        this.updateNoteLength(-this.increment * this.step);
    }

    private updateNoteTime(change: number): void {
        const newNote = JSON.parse(JSON.stringify(this.note));
        newNote.time += change;
        if (newNote.time < 0) {
            newNote.time = 0;
        }
        this.selectorService.adjustTime(newNote);
        this.actionsService.trackEventChanged(newNote);
    }

    private updateNoteLength(change: number): void {
        const newNote = JSON.parse(JSON.stringify(this.note));
        newNote.length += change;
        if (newNote.length < 0) {
            newNote.length = 0;
        }
        this.actionsService.trackEventChanged(newNote);
    }
}
