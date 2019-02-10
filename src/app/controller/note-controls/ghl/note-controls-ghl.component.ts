import { Component, Input } from '@angular/core';

import { ModelTrackNoteType } from '../../../model/model';
import { TypeService } from '../../type/type.service';

@Component({
    selector: 'app-note-controls-ghl',
    templateUrl: './note-controls-ghl.component.html',
    styleUrls: ['./note-controls-ghl.component.css'],
})
export class NoteControlsGHLComponent {
    @Input() type: ModelTrackNoteType[];

    constructor(private typeService: TypeService) {
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
        this.typeService.flip1();
    }

    flipBlack2(): void {
        this.typeService.flip2();
    }

    flipBlack3(): void {
        this.typeService.flip3();
    }

    flipWhite1(): void {
        this.typeService.flip4();
    }

    flipWhite2(): void {
        this.typeService.flip5();
    }

    flipWhite3(): void {
        this.typeService.flip6();
    }
}
