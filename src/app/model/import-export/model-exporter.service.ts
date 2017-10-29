import { Injectable } from '@angular/core';

import { ModelService } from '../model.service';
import { MemoryToFileService } from './file-to-memory/memory-to-file.service';
import { ModelToMemoryService } from './memory-to-model/model-to-memory.service';

@Injectable()
export class ModelExporterService {

    constructor(
        private model: ModelService,
        private memoryToFile: MemoryToFileService,
        private modelToMemory: ModelToMemoryService,
    ) {
    }

    export(): string {
        const model = this.model.model;
        const memory = this.modelToMemory.export(model);
        const file = this.memoryToFile.export(memory);
        return file;
    }
}
