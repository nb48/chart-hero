import { Component } from '@angular/core';

import { KeybindingsService } from './keybindings.service';

@Component({
    selector: 'app-keybindings',
    templateUrl: './keybindings.component.html',
})
export class KeybindingsComponent {

    constructor(public service: KeybindingsService) {
    }
}
