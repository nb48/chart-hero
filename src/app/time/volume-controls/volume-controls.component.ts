import { Component } from '@angular/core';

@Component({
    selector: 'app-volume-controls',
    templateUrl: './volume-controls.component.html',
    styleUrls: ['./volume-controls.component.css'],
})
export class VolumeControlsComponent {

    constructor() {
    }

    captureEvent(event: any) {
        event.stopPropagation();
    }

    get volume(): number {
        return 50;
    }

    set volume(volume: number) {
    }
}
