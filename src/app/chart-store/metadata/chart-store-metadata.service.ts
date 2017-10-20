import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileMetadata } from '../../chart-file/chart-file';
import { ChartStore, ChartStoreMetadata } from '../chart-store';

@Injectable()
export class ChartStoreMetadataService {

    import(metadata: ChartFileMetadata[]): ChartStoreMetadata[] {
        if (!metadata) {
            return [this.defaultResolution(), this.defaultOffset()];
        }
        if (!metadata.find(m => m.name === 'Resolution')) {
            metadata.push(this.defaultResolution());
        }
        if (!metadata.find(m => m.name === 'Offset')) {
            metadata.push(this.defaultOffset());
        }
        return metadata as ChartStoreMetadata[];
    }

    export(metadata: ChartStoreMetadata[]): ChartFileMetadata[] {
        return metadata as ChartFileMetadata[];
    }

    getResolution(metadata: ChartStoreMetadata[]): number {
        return parseFloat(metadata.find(m => m.name === 'Resolution').value);         
    }
    
    getOffset(metadata: ChartStoreMetadata[]): number {
        return parseFloat(metadata.find(m => m.name === 'Offset').value);     
    }

    private defaultResolution(): ChartStoreMetadata {
        return {
            name: 'Resolution',
            value: '192',
        };
    }

    private defaultOffset(): ChartStoreMetadata {
        return {
            name: 'Offset',
            value: '0',
        };
    }
}
