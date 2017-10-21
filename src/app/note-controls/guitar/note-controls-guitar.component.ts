import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ChartStoreTrackNoteType } from '../../chart-store/chart-store';

@Component({
    selector: 'app-note-controls-guitar',
    templateUrl: './note-controls-guitar.component.html',
    styleUrls: ['./note-controls-guitar.component.css'],
})
export class NoteControlsGuitarComponent {
    @Input() type: ChartStoreTrackNoteType[];
    @Output() changed: EventEmitter<ChartStoreTrackNoteType[]>;

    constructor() {
        this.changed = new EventEmitter<ChartStoreTrackNoteType[]>();
    }

    get green(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GuitarGreen) !== -1;
    }
    
    get red(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GuitarRed) !== -1;
    }
    
    get yellow(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GuitarYellow) !== -1;
    }
    
    get blue(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GuitarBlue) !== -1;
    }
    
    get orange(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GuitarOrange) !== -1;
    }

    flipGreen(): void {
        this.flip(ChartStoreTrackNoteType.GuitarGreen);
    }
    
    flipRed(): void {
        this.flip(ChartStoreTrackNoteType.GuitarRed);
    }
    
    flipYellow(): void {
        this.flip(ChartStoreTrackNoteType.GuitarYellow);
    }
    
    flipBlue(): void {
        this.flip(ChartStoreTrackNoteType.GuitarBlue);
    }
    
    flipOrange(): void {
        this.flip(ChartStoreTrackNoteType.GuitarOrange);
    }

    private flip(type: ChartStoreTrackNoteType): void {
        const index = this.type.indexOf(type);
        if (index === -1) {
            this.changed.emit(this.type.concat([type]));
        } else {
            this.type.splice(index, 1);
            this.changed.emit(this.type);
        }
    }
}
