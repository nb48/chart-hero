import { Component, Input } from '@angular/core';

import { ChartViewNoteControllerService }
from '../../../chart-view/note-controller/chart-view-note-controller.service';
import { ChartViewNote, ChartViewNoteType } from '../../../chart-view/chart-view';

@Component({
    selector: '[app-chart-view-note]',
    templateUrl: './chart-view-note.component.html',
})
export class ChartViewNoteComponent {
    @Input() note: ChartViewNote;

    constructor(private noteController: ChartViewNoteControllerService) {
    }

    select(): void {
        this.noteController.selectNote(this.note.id);
    }

    get open(): boolean {
        return this.note.type === ChartViewNoteType.Open;
    }

    get guitar(): boolean {
        return this.note.type === ChartViewNoteType.Guitar;
    }

    get ghl(): boolean {
        return this.note.type === ChartViewNoteType.GHL;
    }
}
