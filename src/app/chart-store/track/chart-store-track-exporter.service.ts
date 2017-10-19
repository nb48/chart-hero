import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileTrack } from '../../chart-file/chart-file';
import { ChartStoreTrack } from '../chart-store';

@Injectable()
export class ChartStoreTrackExporterService {

    export(track: ChartStoreTrack): ChartFileTrack[] {
        return track.unsupported.length > 0 ? track.unsupported : null;
    }
}
