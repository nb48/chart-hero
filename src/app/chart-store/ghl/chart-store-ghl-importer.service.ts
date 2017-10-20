import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileSyncTrack, ChartFileTrack } from '../../chart-file/chart-file';
import { ChartStoreGenericImporterService, NoteImporter, SupportedNotes }
from '../generic/chart-store-generic-importer.service';
import { ChartStoreTrack, ChartStoreTrackNoteType } from '../chart-store';

const supportedGHLNotes: SupportedNotes = [0, 1, 2, 3, 4, 7, 8];

const ghlNoteImporter: NoteImporter = (notes: number[]): ChartStoreTrackNoteType[] => {
    if (notes[0] === 7) {
        return [];
    }
    return notes.map((note) => {
        switch (note) {
        case 3:
            return ChartStoreTrackNoteType.GHLBlack1;
        case 4:
            return ChartStoreTrackNoteType.GHLBlack2;
        case 8:
            return ChartStoreTrackNoteType.GHLBlack3;
        case 0:
            return ChartStoreTrackNoteType.GHLWhite1;
        case 1:
            return ChartStoreTrackNoteType.GHLWhite2;
        case 2:
            return ChartStoreTrackNoteType.GHLWhite3;
        }
    });
};

@Injectable()
export class ChartStoreGHLImporterService {

    constructor(private genericImporter: ChartStoreGenericImporterService) {
    }

    import(
        track: ChartFileTrack[],
        syncTrack: ChartFileSyncTrack[],
        resolution: number,
        offset: number,
    ): ChartStoreTrack {
        return this.genericImporter.import
            (track, syncTrack, resolution, offset, supportedGHLNotes, ghlNoteImporter);
    }
}
