import { Component, Input } from '@angular/core';

@Component({
    selector: '[app-chart-display-note]',
    templateUrl: './chart-display-note.component.html',
    styleUrls: ['./chart-display-note.component.css'],
})
export class ChartDisplayNoteComponent {
    @Input() color: string;
    @Input() position: number;
    @Input() selected: boolean = false;

    xPositions = {
        green: 10,
        red: 30,
        yellow: 50,
        blue: 70,
        orange: 90,
    };

    constructor() {
    }
}
