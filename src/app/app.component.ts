import { Component } from '@angular/core';

import { ChartFileImporterService } from './chart-file/chart-file-importer.service';
import { ChartStoreService } from './chart-store/chart-store.service';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent {

    constructor(private fileImporter: ChartFileImporterService) {
        this.fileImporter.import(defaultFile);
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
