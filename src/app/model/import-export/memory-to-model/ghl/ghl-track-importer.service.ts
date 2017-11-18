import { EventEmitter, Injectable } from '@angular/core';

import { ModelTrack, ModelTrackEventType, ModelTrackNoteType } from '../../../model';
import { MemorySyncTrack, MemoryTrack } from '../../memory';
import {
    GenericTrackImporterService,
    NoteImporter,
    SupportedNotes,
} from '../generic/generic-track-importer.service';

const supportedGHLNotes: SupportedNotes = [0, 1, 2, 3, 4, 5, 7, 8];

const ghlNoteImporter: NoteImporter = (notes: number[]): ModelTrackNoteType[] => {
    if (notes[0] === 7) {
        return [];
    }
    return notes.map((note) => {
        switch (note) {
        case 3:
            return ModelTrackNoteType.GHLBlack1;
        case 4:
            return ModelTrackNoteType.GHLBlack2;
        case 8:
            return ModelTrackNoteType.GHLBlack3;
        case 0:
            return ModelTrackNoteType.GHLWhite1;
        case 1:
            return ModelTrackNoteType.GHLWhite2;
        case 2:
            return ModelTrackNoteType.GHLWhite3;
        }
    });
};

@Injectable()
export class GHLTrackImporterService {

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
            supportedGHLNotes,
            ghlNoteImporter,
            ModelTrackEventType.GHLNote,
        );
    }
}
