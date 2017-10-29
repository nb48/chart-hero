import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ModelTrackNoteType } from '../../model/model';

@Component({
    selector: 'app-note-controls-ghl',
    templateUrl: './note-controls-ghl.component.html',
    styleUrls: ['./note-controls-ghl.component.css'],
})
export class NoteControlsGHLComponent {
    @Input() type: ModelTrackNoteType[];
    @Output() changed: EventEmitter<ModelTrackNoteType[]>;

    constructor() {
        this.changed = new EventEmitter<ModelTrackNoteType[]>();
    }

    get black1(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GHLBlack1) !== -1;
    }
    
    get black2(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GHLBlack2) !== -1;
    }
        
    get black3(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GHLBlack3) !== -1;
    }

    get white1(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GHLWhite1) !== -1;
    }
    
    get white2(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GHLWhite2) !== -1;
    }
        
    get white3(): boolean {
        return this.type.indexOf(ModelTrackNoteType.GHLWhite3) !== -1;
    }

    flipBlack1(): void {
        this.flip(ModelTrackNoteType.GHLBlack1);
    }

    flipBlack2(): void {
        this.flip(ModelTrackNoteType.GHLBlack2);
    }

    flipBlack3(): void {
        this.flip(ModelTrackNoteType.GHLBlack3);
    }

    flipWhite1(): void {
        this.flip(ModelTrackNoteType.GHLWhite1);
    }

    flipWhite2(): void {
        this.flip(ModelTrackNoteType.GHLWhite2);
    }

    flipWhite3(): void {
        this.flip(ModelTrackNoteType.GHLWhite3);
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
