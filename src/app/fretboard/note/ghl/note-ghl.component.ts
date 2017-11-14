import { Component, Input } from '@angular/core';

import { NoteGHL, NoteGHLColor } from '../note';

@Component({
    selector: '[app-note-ghl]',
    templateUrl: './note-ghl.component.html',
})
export class NoteGHLComponent {
    @Input() note: NoteGHL;
    @Input() drawSustain: boolean;

    get black(): boolean {
        return this.note.color === NoteGHLColor.Black;
    }

    get white(): boolean {
        return this.note.color === NoteGHLColor.White;
    }

    get chord(): boolean {
        return this.note.color === NoteGHLColor.Chord;
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
