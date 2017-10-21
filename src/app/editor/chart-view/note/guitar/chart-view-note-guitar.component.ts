import { Component, Input } from '@angular/core';

import { ChartViewNoteGuitar, ChartViewNoteGuitarColor } from '../../../../chart-view/chart-view';

@Component({
    selector: '[app-chart-view-note-guitar]',
    templateUrl: './chart-view-note-guitar.component.html',
})
export class ChartViewNoteGuitarComponent {
    @Input() note: ChartViewNoteGuitar;

    get color(): string {
        switch (this.note.color) {
        case ChartViewNoteGuitarColor.Green:
            return 'green';
        case ChartViewNoteGuitarColor.Red:
            return 'red';
        case ChartViewNoteGuitarColor.Yellow:
            return 'yellow';
        case ChartViewNoteGuitarColor.Blue:
            return 'blue';
        case ChartViewNoteGuitarColor.Orange:
            return 'orange';
        }
    }
}
