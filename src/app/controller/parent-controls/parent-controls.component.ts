import { Component } from '@angular/core';

import { SelectorService } from '../selector/selector.service';

@Component({
    selector: 'app-parent-controls',
    templateUrl: './parent-controls.component.html',
    styleUrls: ['./parent-controls.component.css'],
})
export class ParentControlsComponent {

    noteSelected: boolean;
    eventSelected: boolean;

    constructor(private selectorService: SelectorService) {
        this.eventSelected = false;
        this.selectorService.selectedEvents.subscribe((event) => {
            if (!event) {
                this.eventSelected = false;
                return;
            }
            this.eventSelected = true;
        });
        this.noteSelected = false;
        this.selectorService.selectedNotes.subscribe((note) => {
            if (!note) {
                this.noteSelected = false;
                return;
            }
            this.noteSelected = true;
        });
    }
}
