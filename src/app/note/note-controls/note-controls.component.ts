import { Component } from '@angular/core';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackNoteType, ModelTrackEventType } from '../../model/model';
import { TimeService } from '../time/time.service';
import { TypeService } from '../type/type.service';
import { SelectedNoteService } from '../selected/selected.service';

@Component({
    selector: 'app-note-controls',
    templateUrl: './note-controls.component.html',
    styleUrls: ['./note-controls.component.css'],
})
export class NoteControlsComponent {

    selected: boolean;
    id: number;
    time: number;
    isGuitarNote: boolean;
    isGHLNote: boolean;
    type: ModelTrackNoteType[];
    stepControl: string = 'one';
    customStepTop: number = 1;
    customStepBottom: number = 1;

    constructor(
        private actionsService: ActionsService,
        private timeService: TimeService,
        private typeService: TypeService,
        private selectedNoteService: SelectedNoteService,
    ) {
        this.selected = false;
        this.selectedNoteService.selectedNotes.subscribe((note) => {
            if (!note) {
                this.selected = false;
                return;
            }
            this.selected = true;
            this.id = note.id;
            this.time = Math.floor(note.time * 1000) / 1000;
            this.isGuitarNote = note.event === ModelTrackEventType.GuitarNote;
            this.isGHLNote = note.event === ModelTrackEventType.GHLNote;
            this.type = note.type;
        });
        this.newStep();
    }

    typeChanged(type: ModelTrackNoteType[]): void {
        this.typeService.updateNoteType(type);
    }

    newStep(): void {
        switch (this.stepControl) {
        case 'one':
            this.timeService.newStep(1, 1);
            return;
        case 'half':
            this.timeService.newStep(1, 2);
            return;
        case 'third':
            this.timeService.newStep(1, 3);
            return;
        case 'quarter':
            this.timeService.newStep(1, 4);
            return;
        case 'custom':
            const top = this.customStepTop !== null && this.customStepTop !== 0
                ? this.customStepTop
                : 1;
            const bottom = this.customStepBottom !== null && this.customStepBottom !== 0
                ? this.customStepBottom
                : 1;
            this.timeService.newStep(top, bottom);
            return;
        }
    }

    moveForwards(): void {
        this.timeService.moveForwardsTime();
    }

    moveBackwards(): void {
        this.timeService.moveBackwardsTime();
    }

    snapForwards(): void {
        this.timeService.snapForwardsTime();
    }

    snapBackwards(): void {
        this.timeService.snapBackwardsTime();
    }

    delete(): void {
        this.actionsService.deleteNote(this.id);
        this.selectedNoteService.selectNearestNote();
    }
}
