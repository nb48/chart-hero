import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ModelTrackNoteType } from '../../../model/model';

@Component({
    selector: 'app-note-controls-guitar',
    templateUrl: './note-controls-guitar.component.html',
    styleUrls: ['./note-controls-guitar.component.css'],
})
export class NoteControlsGuitarComponent {
    @Input() type: ModelTrackNoteType[];
    @Output() changed: EventEmitter<ModelTrackNoteType[]>;

    constructor() {
        this.changed = new EventEmitter<ModelTrackNoteType[]>();
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
        this.flip(ModelTrackNoteType.GuitarGreen);
    }
    
    flipRed(): void {
        this.flip(ModelTrackNoteType.GuitarRed);
    }
    
    flipYellow(): void {
        this.flip(ModelTrackNoteType.GuitarYellow);
    }
    
    flipBlue(): void {
        this.flip(ModelTrackNoteType.GuitarBlue);
    }
    
    flipOrange(): void {
        this.flip(ModelTrackNoteType.GuitarOrange);
    }

    private flip(type: ModelTrackNoteType): void {
        const index = this.type.indexOf(type);
        if (index === -1) {
            this.changed.emit(this.type.concat([type]));
        } else {
            this.type.splice(index, 1);
            this.changed.emit(this.type);
        }
    }
}
