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
        this.fileImporter.import('');
        this.viewController.newTrack(ChartViewTrack.GHLGuitarExpert);
    }
}
