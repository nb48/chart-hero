
import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileTrack } from '../../chart-file/chart-file';
import { ChartStoreGenericExporterService, NoteExporter }
from '../generic/chart-store-generic-exporter.service';
import { ChartStoreTrack, ChartStoreTrackNoteType } from '../chart-store';

const guitarNoteExporter: NoteExporter = (note: ChartStoreTrackNoteType): number => {
    switch (note) {
    case ChartStoreTrackNoteType.GHLBlack1:
        return 3;
    case ChartStoreTrackNoteType.GHLBlack2:
        return 4;
    case ChartStoreTrackNoteType.GHLBlack3:
        return 8;
    case ChartStoreTrackNoteType.GHLWhite1:
        return 0;
    case ChartStoreTrackNoteType.GHLWhite2:
        return 1;
    case ChartStoreTrackNoteType.GHLWhite3:
        return 2;
    }
};

@Injectable()
export class ChartStoreGuitarExporterService {

    constructor(private genericExporter: ChartStoreGenericExporterService) {
    }

    export(
        track: ChartStoreTrack,
        syncTrack: ChartStoreTrack,
        resolution: number,
        offset: number,
    ): ChartFileTrack[] {
        return this.genericExporter.export
            (track, syncTrack, resolution, offset, guitarNoteExporter);
    }
}
