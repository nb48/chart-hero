import { Injectable } from '@angular/core';

import { ModelService } from '../model.service';
import { FileToMemoryService } from './file-to-memory/file-to-memory.service';
import { MemoryToModelService } from './memory-to-model/memory-to-model.service';
import { TimeService } from './../../time/time.service';
import { ChartViewTrackControllerService }
from '../../chart-view/track-controller/chart-view-track-controller.service';

@Injectable()
export class ModelImporterService {

    constructor(
        private model: ModelService,
        private fileToMemory: FileToMemoryService,
        private memoryToModel: MemoryToModelService,
        private timeService: TimeService,
        private trackService: ChartViewTrackControllerService,
    ) {
    }

    import(file: string): void {
        const memory = this.fileToMemory.import(file);
        const model = this.memoryToModel.import(memory);
        this.timeService.time = 0;
        this.trackService.defaultTrack(model);
        this.model.model = model;
    }
}
