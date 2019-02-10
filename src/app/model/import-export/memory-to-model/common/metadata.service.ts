import { EventEmitter, Injectable } from '@angular/core';

import { Model, ModelMetadata } from '../../../model';
import { MemoryMetadata } from '../../memory';

@Injectable()
export class MetadataService {

    import(metadata: MemoryMetadata[]): ModelMetadata[] {
        if (!metadata) {
            return [this.defaultResolution(), this.defaultOffset()];
        }
        if (!metadata.find(m => m.name === 'Resolution')) {
            metadata.push(this.defaultResolution());
        }
        if (!metadata.find(m => m.name === 'Offset')) {
            metadata.push(this.defaultOffset());
        }
        return metadata as ModelMetadata[];
    }

    export(metadata: ModelMetadata[]): MemoryMetadata[] {
        return metadata as MemoryMetadata[];
    }

    getResolution(metadata: ModelMetadata[]): number {
        return parseFloat(metadata.find(m => m.name === 'Resolution').value);
    }

    getOffset(metadata: ModelMetadata[]): number {
        return parseFloat(metadata.find(m => m.name === 'Offset').value);
    }

    private defaultResolution(): ModelMetadata {
        return {
            name: 'Resolution',
            value: '192',
        };
    }

    private defaultOffset(): ModelMetadata {
        return {
            name: 'Offset',
            value: '0',
        };
    }
}
