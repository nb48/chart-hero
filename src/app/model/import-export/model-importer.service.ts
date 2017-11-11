import { Injectable } from '@angular/core';

import { TimeService } from '../../time/time.service';
import { TrackService } from '../../track/track.service';
import { ModelService } from '../model.service';
import { FileToMemoryService } from './file-to-memory/file-to-memory.service';
import { MemoryToModelService } from './memory-to-model/memory-to-model.service';

@Injectable()
export class ModelImporterService {

    constructor(
        private timeService: TimeService,
        private trackService: TrackService,
        private modelService: ModelService,
        private fileToMemory: FileToMemoryService,
        private memoryToModel: MemoryToModelService,
    ) {
        this.import('');
    }

    import(file: string): void {
        const memory = this.fileToMemory.import(file);
        const model = this.memoryToModel.import(memory);
        this.timeService.time = 0;
        this.trackService.defaultTrack(model);
        this.modelService.model = model;
    }
}
