import { Component, Input } from '@angular/core';

import { Beat } from './beat';

@Component({
    selector: '[app-beat]',
    templateUrl: './beat.component.html',
})
export class BeatComponent {
    @Input() beat: Beat;
}
