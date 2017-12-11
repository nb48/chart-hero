import { Component } from '@angular/core';

@Component({
    selector: 'app-modals',
    templateUrl: './modals.component.html',
    styleUrls: ['./modals.component.css'],
})
export class ModalsComponent {

    constructor() {
    }

    keybindings(): void {
        console.log('Keybindings unimplemented');
    }

    metadata(): void {
        console.log('Metadata unimplemented');
    }
}
