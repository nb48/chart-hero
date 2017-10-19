import { Component, Input } from '@angular/core';

import { ChartViewNoteOpen } from '../../../../chart-view/chart-view';

@Component({
    selector: '[app-chart-view-note-open]',
    templateUrl: './chart-view-note-open.component.html',
})
export class ChartViewNoteOpenComponent {
    @Input() note: ChartViewNoteOpen;
}
