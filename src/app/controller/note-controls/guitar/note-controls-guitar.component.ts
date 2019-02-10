import { Component, Input } from '@angular/core';

import { ModelTrackNoteType } from '../../../model/model';
import { TypeService } from '../../type/type.service';

@Component({
    selector: 'app-note-controls-guitar',
    templateUrl: './note-controls-guitar.component.html',
    styleUrls: ['./note-controls-guitar.component.css'],
})
export class NoteControlsGuitarComponent {
    @Input() type: ModelTrackNoteType[];

    constructor(private typeService: TypeService) {
    }

    get green(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GuitarGreen) !== -1;
    }

    get red(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GuitarRed) !== -1;
    }

    get yellow(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GuitarYellow) !== -1;
    }

    get blue(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GuitarBlue) !== -1;
    }

    get orange(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GuitarOrange) !== -1;
    }

    flipGreen(): void {
        this.typeService.flip1();
    }

    flipRed(): void {
        this.typeService.flip2();
    }

    flipYellow(): void {
        this.typeService.flip3();
    }

    flipBlue(): void {
        this.typeService.flip4();
    }

    flipOrange(): void {
        this.typeService.flip5();
    }
}
