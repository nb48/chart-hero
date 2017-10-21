
import { EventEmitter, Injectable } from '@angular/core';

import { ChartFileTrack } from '../../chart-file/chart-file';
import { ChartStoreGenericExporterService, NoteExporter }
from '../generic/chart-store-generic-exporter.service';
import { ChartStoreTrack, ChartStoreTrackNoteType } from '../chart-store';

const guitarNoteExporter: NoteExporter = (note: ChartStoreTrackNoteType): number => {
    switch (note) {
    case ChartStoreTrackNoteType.GuitarGreen:
        return 0;
    case ChartStoreTrackNoteType.GuitarRed:
        return 1;
    case ChartStoreTrackNoteType.GuitarYellow:
        return 2;
    case ChartStoreTrackNoteType.GuitarBlue:
        return 3;
    case ChartStoreTrackNoteType.GuitarOrange:
        return 4;
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
