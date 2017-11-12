import { Component } from '@angular/core';

import { ActionsService } from '../../model/actions/actions.service';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.css'],
})
export class ActionsComponent {

    constructor(public service: ActionsService) {
    }
}
