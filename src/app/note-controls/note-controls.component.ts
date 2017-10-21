import { Component } from '@angular/core';

import { ChartStoreTrackNote } from '../chart-store/chart-store';
import { ChartViewNoteControllerService }
from '../chart-view/note-controller/chart-view-note-controller.service';

@Component({
    selector: 'app-note-controls',
    templateUrl: './note-controls.component.html',
    styleUrls: ['./note-controls.component.css'],
})
export class NoteControlsComponent {

    note: ChartStoreTrackNote;

    constructor(private controller: ChartViewNoteControllerService) {
        this.controller.selectedNote.subscribe((note) => {
            this.note = note;
        });
    }
}
