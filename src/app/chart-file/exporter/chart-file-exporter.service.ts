import { Injectable, EventEmitter } from '@angular/core';

import {
    ChartFile,
    ChartFileMetadata,
    ChartFileSyncTrack,
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
        let file = `[Song]\n{\n${this.exportMetadata(chart.metadata)}}\n`
        + `[SyncTrack]\n{\n${this.exportSyncTrack(chart.syncTrack)}}\n`;
        const maybeAddTrack = (name: string, track: ChartFileTrack[]) => {
            if (track) {
                file += `[${name}]\n{\n${this.exportTrack(track)}}\n`;
            }
        };
        maybeAddTrack('ExpertSingle', chart.guitar.expert);
        maybeAddTrack('HardSingle', chart.guitar.hard);
        maybeAddTrack('MediumSingle', chart.guitar.medium);
        maybeAddTrack('EasySingle', chart.guitar.easy);
        maybeAddTrack('ExpertGHLGuitar', chart.ghlGuitar.expert);
        maybeAddTrack('HardGHLGuitar', chart.ghlGuitar.hard);
        maybeAddTrack('MediumGHLGuitar', chart.ghlGuitar.medium);
        maybeAddTrack('EasyGHLGuitar', chart.ghlGuitar.easy);
        maybeAddTrack('Events', chart.events);
        maybeAddTrack('PART VOCALS', chart.vocals);
        maybeAddTrack('VENUE', chart.venue);
        return file;
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

    private exportTrack(track: ChartFileTrack[]): string {
        return track.map(({ midiTime, type, note, length, text }) => {
            if (type === 'N') {
                return `    ${formatMidiTime(midiTime)} = ${type} ${note} ${length}\n`;
            }
            return `    ${formatMidiTime(midiTime)} = ${type} ${text}\n`;                
        }).join('');
    }
}
