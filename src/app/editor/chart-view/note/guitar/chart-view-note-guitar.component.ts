import { Component, Input } from '@angular/core';

import { ChartViewNoteGuitar, ChartViewNoteGuitarColor } from '../../../../chart-view/chart-view';

@Component({
    selector: '[app-chart-view-note-guitar]',
    templateUrl: './chart-view-note-guitar.component.html',
})
export class ChartViewNoteGuitarComponent {
    @Input() note: ChartViewNoteGuitar;

    get green(): boolean {
        return this.note.color === ChartViewNoteGuitarColor.Green;
    }

    get red(): boolean {
        return this.note.color === ChartViewNoteGuitarColor.Red;
    }

    get yellow(): boolean {
        return this.note.color === ChartViewNoteGuitarColor.Yellow;
    }

    get blue(): boolean {
        return this.note.color === ChartViewNoteGuitarColor.Blue;
    }

    get orange(): boolean {
        return this.note.color === ChartViewNoteGuitarColor.Orange;
    }
}
