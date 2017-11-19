import { EventEmitter, Injectable } from '@angular/core';

import { ModelTrack, ModelTrackEventType, ModelTrackNoteType } from '../../../model';
import { MemorySyncTrack, MemoryTrack } from '../../memory';
import {
    GenericTrackImporterService,
    NoteImporter,
    SupportedNotes,
} from '../generic/generic-track-importer.service';

const supportedGuitarNotes: SupportedNotes = [0, 1, 2, 3, 4, 5, 6, 7];

const guitarNoteImporter: NoteImporter = (notes: number[]): ModelTrackNoteType[] => {
    if (notes[0] === 7) {
        return [];
    }
    return notes.map((note) => {
        switch (note) {
        case 0:
            return ModelTrackNoteType.GuitarGreen;
        case 1:
            return ModelTrackNoteType.GuitarRed;
        case 2:
            return ModelTrackNoteType.GuitarYellow;
        case 3:
            return ModelTrackNoteType.GuitarBlue;
        case 4:
            return ModelTrackNoteType.GuitarOrange;
        }
    });
};

@Injectable()
export class GuitarTrackImporterService {

    constructor(private genericImporter: GenericTrackImporterService) {
    }

    import(
        track: MemoryTrack[],
        syncTrack: MemorySyncTrack[],
        resolution: number,
        offset: number,
    ): ModelTrack {
        return this.genericImporter.import(
            track,
            syncTrack,
            resolution,
            offset,
            supportedGuitarNotes,
            guitarNoteImporter,
            ModelTrackEventType.GuitarNote,
        );
    }
}
