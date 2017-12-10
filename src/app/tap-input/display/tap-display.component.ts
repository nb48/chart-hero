import { Component } from '@angular/core';

import { TapInputService } from '../tap-input.service';

@Component({
    selector: 'app-tap-display',
    templateUrl: './tap-display.component.html',
    styleUrls: ['./tap-display.component.css'],
})
export class TapDisplayComponent {

    constructor(private service: TapInputService) {
    }
}
