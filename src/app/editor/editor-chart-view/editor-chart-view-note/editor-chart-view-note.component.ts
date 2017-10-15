import { Component, Input } from '@angular/core';

import { ChartViewNote, ChartViewNoteColor } from '../../../chart-view/chart-view';

@Component({
    selector: '[app-editor-chart-view-note]',
    templateUrl: './editor-chart-view-note.component.html',
    styleUrls: ['./editor-chart-view-note.component.css'],
})
export class EditorChartViewNoteComponent {
    @Input() note: ChartViewNote;

    get open(): boolean {
        return this.note.open;
    }

    get xPos(): number {
        return this.note.x;
    }

    get yPos(): number {
        return this.note.y;
    }

    get blackNote(): boolean {
        return this.note.color === ChartViewNoteColor.Black;
    }
    
    get whiteNote(): boolean {
        return this.note.color === ChartViewNoteColor.White;
    }

    get blackWhiteNote(): boolean {
        return this.note.color === ChartViewNoteColor.BlackWhite;
    }

    get blackNotePath(): string {
        return `M ${this.xPos + 1.8} ${this.yPos - 3.5}
                l 2.8 4.7
                s 1.3 3 -1.82 3.22
                l -5.4 0
                s -3.28 -0.14 -1.74 -3.26
                l 2.76 -4.7
                s 1.7 -2.3 3.4 0
                z`;
    }

    get whiteNotePath(): string {
        return `M ${this.xPos + 1.8} ${this.yPos + 3.5}
            l 2.8 -4.7
            s 1.3 -3 -1.82 -3.22
            l -5.4 0
            s -3.28 0.14 -1.74 3.26
            l 2.76 4.7
            s 1.7 2.3 3.4 0
            Z`;
    }

    get halfBlackNotePath(): string {
        return `
            M ${this.xPos} ${this.yPos}
            ${this.roundedCorner(-4.5, 4)}
            ${this.roundedCorner(4.5, 4)}
            Z
        `;
    }

    get halfWhiteNotePath(): string {
        return `
            M ${this.xPos} ${this.yPos}
            ${this.roundedCorner(-4.5, -4)}
            ${this.roundedCorner(4.5, -4)}
            Z
        `;
    }

    private roundedCorner(x: number, y: number): string {
        return `
            l ${x} 0
            l 0 ${0.5 * y}
            s 0 ${0.5 * y} ${-0.7 * x} ${0.5 * y}
            l ${-0.3 * x} 0
            l 0 ${-y}
        `;     
    }
}
