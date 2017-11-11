import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Beat } from '../../fretboard/beat/beat';
import { BeatService } from '../../fretboard/beat/beat.service';
import { ModelTrackNote } from '../../model/model';
import { IncrementService } from '../../time/increment/increment.service';
import { SelectedNoteService } from '../selected/selected.service';

const defaultStep = 1;

@Injectable()
export class TimeService {

    private note: ModelTrackNote;
    private increment: number;
    private beats: Beat[];
    private step: number;

    constructor(
        private beatsService: BeatService,
        private incrementService: IncrementService,
        private selectedNoteService: SelectedNoteService,
    ) {
        this.beatsService.beats.subscribe((beats) => {
            this.beats = beats;
        });
        this.incrementService.increments.subscribe((increment) => {
            this.increment = increment;
        });
        this.selectedNoteService.selectedNotes.subscribe((note) => {
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
        this.selectedNoteService.noteChanged(this.note);
    }
}