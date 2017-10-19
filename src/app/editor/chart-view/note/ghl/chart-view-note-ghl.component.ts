import { Component, Input } from '@angular/core';

import { ChartViewNoteGHL, ChartViewNoteGHLColor } from '../../../../chart-view/chart-view';

@Component({
    selector: '[app-chart-view-note-ghl]',
    templateUrl: './chart-view-note-ghl.component.html',
})
export class ChartViewNoteGHLComponent {
    @Input() note: ChartViewNoteGHL;

    get black(): boolean {
        return this.note.color === ChartViewNoteGHLColor.Black;
    }

    get white(): boolean {
        return this.note.color === ChartViewNoteGHLColor.White;
    }

    get chord(): boolean {
        return this.note.color === ChartViewNoteGHLColor.Chord;
    }

    get blackNotePath(): string {
        return `M 1.5 -4
                l 2.8 4.7
                s 1.3 3 -1.82 3.22
                l -5.4 0
                s -3.28 -0.14 -1.74 -3.26
                l 2.76 -4.7
                s 1.7 -2.3 3.4 0
                z`;
    }

    get whiteNotePath(): string {
        return `M 1.5 4
                l 2.8 -4.7
                s 1.3 -3 -1.82 -3.22
                l -5.4 0
                s -3.28 0.14 -1.74 3.26
                l 2.76 4.7
                s 1.7 2.3 3.4 0
                Z`;
    }

    get halfWhiteNotePath(): string {
        return `M 0 0
                ${this.roundedCorner(-4.5, 4)}
                ${this.roundedCorner(4.5, 4)}
                Z`;
    }

    get halfBlackNotePath(): string {
        return `M 0 0
                ${this.roundedCorner(-4.5, -4)}
                ${this.roundedCorner(4.5, -4)}
                Z`;
    }

    noteTransform(scale: number, x: number, y: number): string {
        const translateX = (this.note.x + x) / scale;
        const translateY = (this.note.y + y) / scale;
        return `scale(${scale}) translate(${translateX},${translateY})`;
    }

    private roundedCorner(x: number, y: number): string {
        return `l ${x} 0
                l 0 ${0.5 * y}
                s 0 ${0.5 * y} ${-0.7 * x} ${0.5 * y}
                l ${-0.3 * x} 0
                l 0 ${-y}`;     
    }
}
