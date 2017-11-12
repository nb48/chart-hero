import { EventEmitter, Injectable } from '@angular/core';

import { ModelTrack, ModelTrackNoteType } from '../../../model';
import { MemoryTrack } from '../../memory';
import {
    GenericTrackExporterService,
    NoteExporter,
} from '../generic/generic-track-exporter.service';

const ghlNoteExporter: NoteExporter = (note: ModelTrackNoteType): number => {
    switch (note) {
    case ModelTrackNoteType.GHLBlack1:
        return 3;
    case ModelTrackNoteType.GHLBlack2:
        return 4;
    case ModelTrackNoteType.GHLBlack3:
        return 8;
    case ModelTrackNoteType.GHLWhite1:
        return 0;
    case ModelTrackNoteType.GHLWhite2:
        return 1;
    case ModelTrackNoteType.GHLWhite3:
        return 2;
    }
};

@Injectable()
export class GHLTrackExporterService {

    constructor(private genericExporter: GenericTrackExporterService) {
    }

    export(
        track: ModelTrack,
        syncTrack: ModelTrack,
        resolution: number,
        offset: number,
    ): MemoryTrack[] {
        return this.genericExporter.export(track, syncTrack, resolution, offset, ghlNoteExporter);
    }
}
