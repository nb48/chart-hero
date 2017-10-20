import { Component } from '@angular/core';

import { ChartFileImporterService } from './chart-file/importer/chart-file-importer.service';
import { ChartViewControllerService } from './chart-view/controller/chart-view-controller.service';
import { ChartViewTrack } from './chart-view/chart-view-track';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent {

    constructor(
        private fileImporter: ChartFileImporterService,
        private viewController: ChartViewControllerService,
    ) {
        this.fileImporter.import(defaultFile);
        this.viewController.newTrack(ChartViewTrack.GHLGuitarExpert);
    }
}

const defaultFile = `[Song]
{
    Name = Default Song
    Artist = Default Artist
    Charter = Default Charter
    Resolution = 200
    Offset = 0
}
[SyncTrack]
{
    0 = B 210000
    0 = TS 4
}
[Events]
{
}
[ExpertGHLGuitar]
{
    200 = N 3 0
    400 = N 1 0
    600 = N 2 0
    600 = N 8 0
}`;
