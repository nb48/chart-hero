import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackNote, ModelTrackNoteType } from '../../model/model';
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
}
