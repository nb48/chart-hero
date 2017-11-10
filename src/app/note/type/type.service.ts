import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ModelTrackNote, ModelTrackNoteType } from '../../model/model';
import { SelectedService } from '../selected/selected.service';

@Injectable()
export class TypeService {

    private note: ModelTrackNote;

    constructor(private selectedService: SelectedService) {
        this.selectedService.selectedNote.subscribe((note) => {
            this.note = note;
        });
    }

    updateNoteType(type: ModelTrackNoteType[]): void {
        this.note.type = type;
        this.selectedService.noteChanged(this.note);
    }
}
