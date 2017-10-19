import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileTrack } from '../../chart-file/chart-file';
import { ChartStoreTrack } from '../chart-store';

@Injectable()
export class ChartStoreTrackImporterService {

    import(track: ChartFileTrack[]): ChartStoreTrack {
        return {
            events: [],
            unsupported: track ? track : [],
        };
    }
}
