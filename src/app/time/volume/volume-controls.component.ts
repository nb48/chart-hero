import { Component } from '@angular/core';

import { VolumeService } from './volume.service';

@Component({
    selector: 'app-volume-controls',
    templateUrl: './volume-controls.component.html',
    styleUrls: ['./volume-controls.component.css'],
})
export class VolumeControlsComponent {

    constructor(public service: VolumeService) {
    }

    captureEvent(event: any) {
        event.stopPropagation();
    }
}
