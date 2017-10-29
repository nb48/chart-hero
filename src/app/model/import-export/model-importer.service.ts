import { Injectable } from '@angular/core';

import { ModelService } from '../model.service';
import { FileToMemoryService } from './file-to-memory/file-to-memory.service';
import { MemoryToModelService } from './memory-to-model/memory-to-model.service';

@Injectable()
export class ModelImporterService {

    constructor(
        private model: ModelService,
        private fileToMemory: FileToMemoryService,
        private memoryToModel: MemoryToModelService,
    ) {
    }

    import(file: string): void {
        const memory = this.fileToMemory.import(file);
        const model = this.memoryToModel.import(memory);
        this.model.model = model;
    }
}
