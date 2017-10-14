import { EventEmitter, Injectable } from '@angular/core';

import { ChartFile } from '../chart-file/chart-file';
import { ChartStore } from './chart-store';
import { ChartStoreMidiTimeService } from './chart-store-midi-time.service';

@Injectable()
export class ChartStoreGHLConverterService {

    constructor(private midiTimeService: ChartStoreMidiTimeService) {
    }

    import(chartFile: ChartFile): ChartStore {
        return {
            metadata: [],
            events: [],
        };
    }

    export(chartStore: ChartStore): ChartFile {
        return {
            metadata: [],
            syncTrack: [],
            events: [],
            track: [],
        };
    }
}
