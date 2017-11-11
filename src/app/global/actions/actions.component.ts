import { Component } from '@angular/core';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.css'],
})
export class ActionsComponent {

    constructor() {
    }

    addNote() {
        console.log('Add Note');
    }
}
