import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ChartStoreTrackNoteType } from '../../chart-store/chart-store';

@Component({
    selector: 'app-note-controls-ghl',
    templateUrl: './note-controls-ghl.component.html',
    styleUrls: ['./note-controls-ghl.component.css'],
})
export class NoteControlsGHLComponent {
    @Input() type: ChartStoreTrackNoteType[];
    @Output() changed: EventEmitter<ChartStoreTrackNoteType[]>;

    constructor() {
        this.changed = new EventEmitter<ChartStoreTrackNoteType[]>();
    }

    get black1(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GHLBlack1) !== -1;
    }
    
    get black2(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GHLBlack2) !== -1;
    }
        
    get black3(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GHLBlack3) !== -1;
    }

    get white1(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GHLWhite1) !== -1;
    }
    
    get white2(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GHLWhite2) !== -1;
    }
        
    get white3(): boolean {
        return this.type.indexOf(ChartStoreTrackNoteType.GHLWhite3) !== -1;
    }

    flipBlack1(): void {
        this.flip(ChartStoreTrackNoteType.GHLBlack1);
    }

    flipBlack2(): void {
        this.flip(ChartStoreTrackNoteType.GHLBlack2);
    }

    flipBlack3(): void {
        this.flip(ChartStoreTrackNoteType.GHLBlack3);
    }

    flipWhite1(): void {
        this.flip(ChartStoreTrackNoteType.GHLWhite1);
    }

    flipWhite2(): void {
        this.flip(ChartStoreTrackNoteType.GHLWhite2);
    }

    flipWhite3(): void {
        this.flip(ChartStoreTrackNoteType.GHLWhite3);
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
