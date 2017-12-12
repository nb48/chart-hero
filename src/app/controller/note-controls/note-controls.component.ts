import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackNoteType, ModelTrackEventType } from '../../model/model';
import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { StepService } from '../step/step.service';
import { TypeService } from '../type/type.service';
import { SelectorService } from '../selector/selector.service';

@Component({
    selector: 'app-note-controls',
    templateUrl: './note-controls.component.html',
    styleUrls: ['./note-controls.component.css'],
})
export class NoteControlsComponent implements OnDestroy {

    subscription: Subscription;
    selected: boolean;
    id: number;
    time: number;
    formattedTime: string;
    length: number;
    formattedLength: string;
    forceHopo: boolean;
    tap: boolean;
    isGuitarNote: boolean;
    isGHLNote: boolean;
    type: ModelTrackNoteType[];
    stepControl: string;
    customStepTop: number;
    customStepBottom: number;

    constructor(
        private actionsService: ActionsService,
        private stepService: StepService,
        private typeService: TypeService,
        private selectorService: SelectorService,
    ) {
        this.selected = false;
        this.stepControl =
            this.stepService.stepControl ? this.stepService.stepControl : 'one';
        this.customStepTop =
            this.stepService.customStepTop ? this.stepService.customStepTop : 1;
        this.customStepBottom =
            this.stepService.customStepBottom ? this.stepService.customStepBottom : 1;
        this.subscription = this.selectorService.selectedNotes.subscribe((note) => {
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
            this.tap = note.tap;
            this.isGuitarNote = note.event === ModelTrackEventType.GuitarNote;
            this.isGHLNote = note.event === ModelTrackEventType.GHLNote;
            this.type = note.type;
        });
        this.newStep();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    forceHopoChanged(): void {
        this.typeService.flipForceHOPO();
    }

    tapChanged(): void {
        this.typeService.flipTap();
    }

    newStep(): void {
        this.stepService.newStep(this.stepControl, this.customStepTop, this.customStepBottom);
    }

    moveForwards(): void {
        this.stepService.moveForwardsTime();
    }

    moveBackwards(): void {
        this.stepService.moveBackwardsTime();
    }

    snapForwards(): void {
        this.stepService.snapForwardsTime();
    }

    snapBackwards(): void {
        this.stepService.snapBackwardsTime();
    }

    increaseSustain(): void {
        this.stepService.increaseSustain();
    }

    decreaseSustain(): void {
        this.stepService.decreaseSustain();
    }

    delete(): void {
        const idToDelete = this.id;
        this.selectorService.selectNearest();
        this.actionsService.deleteTrackEvent(idToDelete);
    }

    clickStepControl(): void {
        this.stepControl = 'custom';
        this.newStep();
    }
}
