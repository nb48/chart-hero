import { Component } from '@angular/core';

import { ChartStoreTrackNote, ChartStoreTrackEventType } from '../chart-store/chart-store';
import { ChartViewNoteControllerService }
from '../chart-view/note-controller/chart-view-note-controller.service';

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

    constructor(private controller: ChartViewNoteControllerService) {
        this.selected = false;
        this.controller.selectedNote.subscribe((note) => {
            if (!note) {
                this.selected = false;
                return;
            }
            this.selected = true;
            this.id = note.id;
            this.time = Math.floor(note.time * 1000) / 1000;
            this.isGuitarNote = note.event === ChartStoreTrackEventType.GuitarNote;
            this.isGHLNote = note.event === ChartStoreTrackEventType.GHLNote;
        });
    }
}
