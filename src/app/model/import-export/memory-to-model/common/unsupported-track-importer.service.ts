import { EventEmitter, Injectable } from '@angular/core';

import { ModelTrack } from '../../../model';
import { MemoryTrack } from '../../memory';

@Injectable()
export class UnsupportedTrackImporterService {

    import(track: MemoryTrack[]): ModelTrack {
        return {
            events: [],
            unsupported: track ? track : [],
        };
    }
}
