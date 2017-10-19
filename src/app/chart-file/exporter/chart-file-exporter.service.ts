import { Injectable, EventEmitter } from '@angular/core';

import {
    ChartFile,
    ChartFileMetadata,
    ChartFileSyncTrack,
    ChartFileEvent,
    ChartFileTrack,
} from '../chart-file';

const formatMidiTime = (midiTime: number): string => {
    return ('' + midiTime).split('.')[0];
};

@Injectable()
export class ChartFileExporterService {

    private $chartFile: ChartFile;

    constructor() {
    }

    set chartFile(eventEmitter: EventEmitter<ChartFile>) {
        eventEmitter.subscribe((chartFile: ChartFile) => {
            this.$chartFile = chartFile;
        });
    }

    export(): string {
        return this.exportChart(this.$chartFile);
    }

    private exportChart(chart: ChartFile): string {
        return `[Song]\n{\n${this.exportMetadata(chart.metadata)}}\n`
        + `[SyncTrack]\n{\n${this.exportSyncTrack(chart.syncTrack)}}\n`
        + `[Events]\n{\n${this.exportEvents(chart.events)}}\n`
        + `[ExpertGHLGuitar]\n{\n${this.exportTrack(chart.track)}}`;
    }

    private exportMetadata(metadata: ChartFileMetadata[]): string {
        return metadata.map(({ name, value }) => {
            return `    ${name} = ${value}\n`;
        }).join('');
    }

    private exportSyncTrack(syncTrack: ChartFileSyncTrack[]): string {
        return syncTrack.map(({ midiTime, type, value, text }) => {
            if (type === 'B') {
                return `    ${formatMidiTime(midiTime)} = ${type} ${value}\n`;
            }
            return `    ${formatMidiTime(midiTime)} = ${type} ${text}\n`;
        }).join('');
    }

    private exportEvents(events: ChartFileEvent[]): string {
        return events.map(({ midiTime, type, text }) => {
            return `    ${formatMidiTime(midiTime)} = ${type} ${text}\n`;
        }).join('');
    }

    private exportTrack(track: ChartFileTrack[]): string {
        return track.map(({ midiTime, type, note, length, text }) => {
            if (type === 'N') {
                return `    ${formatMidiTime(midiTime)} = ${type} ${note} ${length}\n`;
            }
            return `    ${formatMidiTime(midiTime)} = ${type} ${text}\n`;                
        }).join('');
    }
}
