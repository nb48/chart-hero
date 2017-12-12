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
        const type = ModelTrackNoteType.GHLWhite3;
        this.flip(type);
    }

    updateNoteType(type: ModelTrackNoteType[]): void {
        const newNote = JSON.parse(JSON.stringify(this.note));
        newNote.type = type;
        this.actionsService.trackEventChanged(newNote);
    }

    updateNoteForceHopo(): void {
        const newNote = JSON.parse(JSON.stringify(this.note));
        newNote.forceHopo = !newNote.forceHopo;
        this.actionsService.trackEventChanged(newNote);
    }

    updateNoteTap(): void {
        const newNote = JSON.parse(JSON.stringify(this.note));
        newNote.tap = !newNote.tap;
        this.actionsService.trackEventChanged(newNote);
    }

    private flip(type: ModelTrackNoteType): void {
        const index = this.note.type.indexOf(type);
        if (index === -1) {
            this.updateNoteType(this.note.type.concat([type]));
        } else {
            this.note.type.splice(index, 1);
            this.updateNoteType(this.note.type);
        }
    }

    private isGhl(): boolean {
        return this.note.event === ModelTrackEventType.GHLNote;
    }
}
