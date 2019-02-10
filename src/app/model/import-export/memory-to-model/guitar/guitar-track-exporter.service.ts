import { EventEmitter, Injectable } from '@angular/core';

import { ModelTrack, ModelTrackNoteType } from '../../../model';
import { MemoryTrack } from '../../memory';
import {
    GenericTrackExporterService,
    NoteExporter,
} from '../generic/generic-track-exporter.service';

const guitarNoteExporter: NoteExporter = (note: ModelTrackNoteType): number => {
    switch (note) {
    case ModelTrackNoteType.GuitarGreen:
        return 0;
    case ModelTrackNoteType.GuitarRed:
        return 1;
    case ModelTrackNoteType.GuitarYellow:
        return 2;
    case ModelTrackNoteType.GuitarBlue:
        return 3;
    case ModelTrackNoteType.GuitarOrange:
        return 4;
    }
};

@Injectable()
export class GuitarTrackExporterService {

    constructor(private genericExporter: GenericTrackExporterService) {
    }

    export(
        track: ModelTrack,
        syncTrack: ModelTrack,
        resolution: number,
        offset: number,
    ): MemoryTrack[] {
        return this.genericExporter
            .export(track, syncTrack, resolution, offset, guitarNoteExporter);
    }
}
