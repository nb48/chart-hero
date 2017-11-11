import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ModelTrackNote, ModelTrackNoteType } from '../../model/model';
import { SelectedNoteService } from '../selected/selected.service';

@Injectable()
export class TypeService {

    private note: ModelTrackNote;

    constructor(private selectedNoteService: SelectedNoteService) {
        this.selectedNoteService.selectedNotes.subscribe((note) => {
            this.note = note;
        });
    }

    updateNoteType(type: ModelTrackNoteType[]): void {
        this.note.type = type;
        this.selectedNoteService.noteChanged(this.note);
    }
}
