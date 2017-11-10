import { Component } from '@angular/core';

import { ChartViewTrack } from './chart-view/chart-view-track';
import { ModelImporterService } from './model/import-export/model-importer.service';
import { TrackService } from './track/track.service';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent {

    constructor(
        private modelImporter: ModelImporterService,
        private trackService: TrackService,
    ) {
        this.modelImporter.import('');
        this.trackService.newTrack(ChartViewTrack.GHLGuitarExpert);
    }
}
