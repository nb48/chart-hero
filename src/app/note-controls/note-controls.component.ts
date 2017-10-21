import { Component } from '@angular/core';

import {
    ChartStoreTrackNote,
    ChartStoreTrackEventType,
    ChartStoreTrackNoteType,
} from '../chart-store/chart-store';
import { ChartViewNoteControllerService }
from '../chart-view/note-controller/chart-view-note-controller.service';
import { ChartViewTimeControllerService }
from '../chart-view/time-controller/chart-view-time-controller.service';

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
    type: ChartStoreTrackNoteType[];

    constructor(
        private noteController: ChartViewNoteControllerService,
        private timeController: ChartViewTimeControllerService,
    ) {
        this.selected = false;
        this.noteController.selectedNote.subscribe((note) => {
            if (!note) {
                this.selected = false;
                return;
            }
            this.selected = true;
            this.id = note.id;
            this.time = Math.floor(note.time * 1000) / 1000;
            this.isGuitarNote = note.event === ChartStoreTrackEventType.GuitarNote;
            this.isGHLNote = note.event === ChartStoreTrackEventType.GHLNote;
            this.type = note.type;
        });
        this.timeController.newStep(1, 3);
    }

    typeChanged(type: ChartStoreTrackNoteType[]): void {
        this.noteController.updateNoteType(this.id, type);
    }

    moveForwards(): void {
        this.move(this.timeController.moveForwardsTime(this.time));
    }

    moveBackwards(): void {
        this.move(this.timeController.moveBackwardsTime(this.time));
    }

    snapForwards(): void {
        this.move(this.timeController.snapForwardsTime(this.time));
    }

    snapBackwards(): void {
        this.move(this.timeController.snapBackwardsTime(this.time));
    }

    private move(time: number): void {
        this.noteController.moveNote(this.id, time);
    }
}
