import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { ChartViewService } from '../chart-view/chart-view.service';
import { ChartView } from '../chart-view/chart-view';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
})
export class EditorComponent {

    constructor(public audioPlayer: AudioPlayerService, public chartView: ChartViewService) {
    }
}
