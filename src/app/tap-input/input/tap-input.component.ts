import { Component } from '@angular/core';

import { TapInputService } from '../tap-input.service';

@Component({
    selector: 'app-tap-input',
    templateUrl: './tap-input.component.html',
    styleUrls: ['./tap-input.component.css'],
})
export class TapInputComponent {

    constructor(private service: TapInputService) {
    }
}
