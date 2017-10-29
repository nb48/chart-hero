import { Component } from '@angular/core';

import { ChartViewTrackControllerService }
from './chart-view/track-controller/chart-view-track-controller.service';
import { ChartViewTrack } from './chart-view/chart-view-track';
import { ModelImporterService } from './model/import-export/model-importer.service';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent {

    constructor(
        private modelImporter: ModelImporterService,
        private trackController: ChartViewTrackControllerService,
    ) {
        this.modelImporter.import('');
        this.trackController.newTrack(ChartViewTrack.GHLGuitarExpert);
    }
}
