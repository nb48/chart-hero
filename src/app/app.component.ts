import { Component } from '@angular/core';

import { Track } from './track/track';
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
        this.trackService.newTrack(Track.GHLGuitarExpert);
    }
}
