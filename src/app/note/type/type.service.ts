import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ActionsService } from '../../model/actions/actions.service';
import { ModelTrackNote, ModelTrackNoteType } from '../../model/model';
import { SelectedNoteService } from '../selected/selected.service';

@Injectable()
export class TypeService {

    private note: ModelTrackNote;

    constructor(
        private actionsService: ActionsService,
        private selectedNoteService: SelectedNoteService,
    ) {
        this.selectedNoteService.selectedNotes.subscribe((note) => {
            this.note = note;
        });
    }

    updateNoteType(type: ModelTrackNoteType[]): void {
        this.note.type = type;
        this.actionsService.noteChanged(this.note);
    }
}
