import { Component, Input } from '@angular/core';

import { ChartViewNoteOpen } from '../../../chart-view/chart-view';

@Component({
    selector: '[app-note-open]',
    templateUrl: './note-open.component.html',
})
export class NoteOpenComponent {
    @Input() note: ChartViewNoteOpen;
}
