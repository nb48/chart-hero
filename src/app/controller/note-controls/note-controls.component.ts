import { Component } from '@angular/core';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackNoteType, ModelTrackEventType } from '../../model/model';
import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { TimeService } from '../time/time.service';
import { TypeService } from '../type/type.service';
import { SelectorService } from '../selector/selector.service';

@Component({
    selector: 'app-note-controls',
    templateUrl: './note-controls.component.html',
    styleUrls: ['./note-controls.component.css'],
})
export class NoteControlsComponent {

    selected: boolean;
    id: number;
    time: number;
    formattedTime: string;
    length: number;
    formattedLength: string;
    forceHopo: boolean;
    isGuitarNote: boolean;
    isGHLNote: boolean;
    type: ModelTrackNoteType[];
    stepControl: string;
    customStepTop: number;
    customStepBottom: number;

    constructor(
        private actionsService: ActionsService,
        private timeService: TimeService,
        private typeService: TypeService,
        private selectorService: SelectorService,
    ) {
        this.selected = false;
        this.stepControl =
            this.timeService.stepControl ? this.timeService.stepControl : 'one';
        this.customStepTop =
            this.timeService.customStepTop ? this.timeService.customStepTop : 1;
        this.customStepBottom =
            this.timeService.customStepBottom ? this.timeService.customStepBottom : 1;
        this.selectorService.selectedNotes.subscribe((note) => {
            if (!note) {
                this.selected = false;
                return;
            }
            this.selected = true;
            this.id = note.id;
            this.time = note.time;
            this.formattedTime = showTime(note.time);
            this.length = note.length;
            this.formattedLength = showTime(note.length);
            this.forceHopo = note.forceHopo;
            this.isGuitarNote = note.event === ModelTrackEventType.GuitarNote;
            this.isGHLNote = note.event === ModelTrackEventType.GHLNote;
            this.type = note.type;
        });
        this.newStep();
    }

    forceHopoChanged(): void {
        this.typeService.updateNoteForceHopo();
    }

    typeChanged(type: ModelTrackNoteType[]): void {
        this.typeService.updateNoteType(type);
    }

    newStep(): void {
        switch (this.stepControl) {
        case 'one':
            this.timeService.newStep(1, 1, 'one');
            return;
        case 'half':
            this.timeService.newStep(1, 2, 'half');
            return;
        case 'third':
            this.timeService.newStep(1, 3, 'third');
            return;
        case 'quarter':
            this.timeService.newStep(1, 4, 'quarter');
            return;
        case 'custom':
            const top = this.customStepTop !== null && this.customStepTop !== 0
                ? this.customStepTop
                : 1;
            const bottom = this.customStepBottom !== null && this.customStepBottom !== 0
                ? this.customStepBottom
                : 1;
            this.timeService.newStep(top, bottom, 'custom');
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

    increaseSustain(): void {
        this.timeService.increaseSustain();
    }

    decreaseSustain(): void {
        this.timeService.decreaseSustain();
    }

    delete(): void {
        const idToDelete = this.id;
        this.selectorService.selectNearest();
        this.actionsService.deleteTrackEvent(idToDelete);
    }

    clickStepControl(): void {
        this.stepControl = 'custom';
        this.timeService.newStep(this.customStepTop, this.customStepBottom, 'custom');
    }
}
