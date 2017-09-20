import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: '[app-chart-display-beat]',
    templateUrl: './chart-display-beat.component.html',
    styleUrls: ['./chart-display-beat.component.css'],
})
export class ChartDisplayBeatComponent {
    @Input() position: number;

    constructor() {
    }
}
