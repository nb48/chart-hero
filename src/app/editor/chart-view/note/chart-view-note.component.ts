import { Component, Input } from '@angular/core';

import { ChartViewNote, ChartViewNoteType } from '../../../chart-view/chart-view';

@Component({
    selector: '[app-chart-view-note]',
    templateUrl: './chart-view-note.component.html',
})
export class ChartViewNoteComponent {
    @Input() note: ChartViewNote;

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
