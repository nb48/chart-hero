import { Component } from '@angular/core';

import { ModelImporterService } from '../../model/import-export/model-importer.service';
import { FileService } from '../file.service';

@Component({
    selector: 'app-file-select',
    templateUrl: './file-select.component.html',
    styleUrls: ['./file-select.component.css'],
})
export class FileSelectComponent {

    constructor(
        private modelImporter: ModelImporterService,
        public service: FileService,
    ) {
    }

    reset() {
        this.modelImporter.import('');
        this.service.loadChartFileName('');
    }
}
