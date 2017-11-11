import { Component, Input } from '@angular/core';

import { ChartViewNoteGuitar, ChartViewNoteGuitarColor } from '../../../chart-view/chart-view';

@Component({
    selector: '[app-note-guitar]',
    templateUrl: './note-guitar.component.html',
})
export class NoteGuitarComponent {
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
