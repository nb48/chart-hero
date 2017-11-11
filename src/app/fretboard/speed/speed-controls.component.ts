import { Component } from '@angular/core';

import { SpeedService } from './speed.service';

@Component({
    selector: 'app-speed-controls',
    templateUrl: './speed-controls.component.html',
    styleUrls: ['./speed-controls.component.css'],
})
export class SpeedControlsComponent {

    constructor(service: SpeedService) {
    }
}
