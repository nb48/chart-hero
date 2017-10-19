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
        let file = `[Song]\n{\n${this.exportMetadata(chart.metadata)}}\n`
        + `[SyncTrack]\n{\n${this.exportSyncTrack(chart.syncTrack)}}\n`
        + `[Events]\n{\n${this.exportEvents(chart.events)}}\n`;
        const maybeAddTrack = (name: string, track: ChartFileTrack[]) => {
            if (track) {
                file += `[${name}]\n{\n${this.exportTrack(track)}}`;
            }
        };
        maybeAddTrack('ExpertSingle', chart.guitar.expert);
        maybeAddTrack('HardSingle', chart.guitar.hard);
        maybeAddTrack('MediumSingle', chart.guitar.medium);
        maybeAddTrack('EasySingle', chart.guitar.easy);
        maybeAddTrack('ExpertDoubleBass', chart.bass.expert);
        maybeAddTrack('HardDoubleBass', chart.bass.hard);
        maybeAddTrack('MediumDoubleBass', chart.bass.medium);
        maybeAddTrack('EasyDoubleBass', chart.bass.easy);
        maybeAddTrack('ExpertDrums', chart.drums.expert);
        maybeAddTrack('HardDrums', chart.drums.hard);
        maybeAddTrack('MediumDrums', chart.drums.medium);
        maybeAddTrack('EasyDrums', chart.drums.easy);
        maybeAddTrack('ExpertGHLGuitar', chart.ghlGuitar.expert);
        maybeAddTrack('HardGHLGuitar', chart.ghlGuitar.hard);
        maybeAddTrack('MediumGHLGuitar', chart.ghlGuitar.medium);
        maybeAddTrack('EasyGHLGuitar', chart.ghlGuitar.easy);
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
