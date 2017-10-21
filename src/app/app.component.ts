import { Component } from '@angular/core';

import { ChartFileImporterService } from './chart-file/importer/chart-file-importer.service';
import { ChartViewTrackControllerService }
from './chart-view/track-controller/chart-view-track-controller.service';
import { ChartViewTrack } from './chart-view/chart-view-track';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent {

    constructor(
        private fileImporter: ChartFileImporterService,
        private trackController: ChartViewTrackControllerService,
    ) {
        this.fileImporter.import('');
        this.trackController.newTrack(ChartViewTrack.GHLGuitarExpert);
    }
}
