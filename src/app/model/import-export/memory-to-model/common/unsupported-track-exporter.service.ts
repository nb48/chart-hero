import { EventEmitter, Injectable } from '@angular/core';

import { ModelTrack } from '../../../model';
import { MemoryTrack } from '../../memory';

@Injectable()
export class UnsupportedTrackExporterService {

    export(track: ModelTrack): MemoryTrack[] {
        return track.unsupported.length > 0 ? track.unsupported : null;
    }
}
