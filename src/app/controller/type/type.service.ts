import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackNote, ModelTrackEventType, ModelTrackNoteType } from '../../model/model';
import { SelectorService } from '../selector/selector.service';

@Injectable()
export class TypeService {

    private note: ModelTrackNote;

    constructor(
        private actionsService: ActionsService,
        private selectorService: SelectorService,
    ) {
        this.selectorService.selectedNotes.subscribe((note) => {
            this.note = note;
        });
    }

    flip1(): void {
        if (!this.note) {
            return;
        }
        const type = this.isGhl() ? ModelTrackNoteType.GHLBlack1 : ModelTrackNoteType.GuitarGreen;
        this.flip(type);
    }

    flip2(): void {
        if (!this.note) {
            return;
        }
        const type = this.isGhl() ? ModelTrackNoteType.GHLBlack2 : ModelTrackNoteType.GuitarRed;
        this.flip(type);
    }

    flip3(): void {
        if (!this.note) {
            return;
        }
        const type = this.isGhl() ? ModelTrackNoteType.GHLBlack3 : ModelTrackNoteType.GuitarYellow;
        this.flip(type);
    }

    flip4(): void {
        if (!this.note) {
            return;
        }
        const type = this.isGhl() ? ModelTrackNoteType.GHLWhite1 : ModelTrackNoteType.GuitarBlue;
        this.flip(type);
    }

    flip5(): void {
        if (!this.note) {
            return;
        }
        const type = this.isGhl() ? ModelTrackNoteType.GHLWhite2 : ModelTrackNoteType.GuitarOrange;
        this.flip(type);
    }

    flip6(): void {
        if (!this.note) {
            return;
        }
        if (!this.isGhl()) {
            return;
        }
        const type = ModelTrackNoteType.GHLWhite3;
        this.flip(type);
    }

    flipForceHOPO(): void {
        if (!this.note) {
            return;
        }
        this.note.forceHopo = !this.note.forceHopo;
        this.updateNote();
    }

    flipTap(): void {
        if (!this.note) {
            return;
        }
        this.note.tap = !this.note.tap;
        this.updateNote();
    }

    private flip(type: ModelTrackNoteType): void {
        const index = this.note.type.indexOf(type);
        if (index === -1) {
            this.note.type = this.note.type.concat([type]);
            this.updateNote();
        } else {
            this.note.type.splice(index, 1);
            this.updateNote();
        }
    }

    private updateNote(): void {
        const newNote = JSON.parse(JSON.stringify(this.note));
        this.actionsService.trackEventChanged(newNote);
    }

    private isGhl(): boolean {
        return this.note.event === ModelTrackEventType.GHLNote;
    }
}
