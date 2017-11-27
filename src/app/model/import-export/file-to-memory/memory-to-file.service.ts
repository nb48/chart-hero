import { Injectable, EventEmitter } from '@angular/core';

import { Memory, MemoryMetadata, MemorySyncTrack, MemoryTrack } from '../memory';

const formatMidiTime = (midiTime: number): string => {
    return ('' + midiTime).split('.')[0];
};

@Injectable()
export class MemoryToFileService {

    export(memory: Memory): string {
        return this.exportChart(memory);
    }

    private exportChart(chart: Memory): string {
        let file = `[Song]\n{\n${this.exportMetadata(chart.metadata)}}\n`
        + `[SyncTrack]\n{\n${this.exportSyncTrack(chart.syncTrack)}}\n`;
        const maybeAddTrack = (name: string, track: MemoryTrack[]) => {
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

    private exportMetadata(metadata: MemoryMetadata[]): string {
        return metadata.map(({ name, value }) => {
            return `    ${name} = ${value}\n`;
        }).join('');
    }

    private exportSyncTrack(syncTrack: MemorySyncTrack[]): string {
        return syncTrack.map(({ midiTime, type, value, text }) => {
            if (type === 'B') {
                return `    ${formatMidiTime(midiTime)} = ${type} ${value}\n`;
            }
            if (type === 'TS') {
                return `    ${formatMidiTime(midiTime)} = ${type} ${value}\n`;                
            }
            return `    ${formatMidiTime(midiTime)} = ${type} ${text}\n`;
        }).join('');
    }

    private exportTrack(track: MemoryTrack[]): string {
        return track.map(({ midiTime, type, note, length, text }) => {
            if (type === 'N') {
                return `    ${formatMidiTime(midiTime)} = ${type} ${note} ${length}\n`;
            }
            return `    ${formatMidiTime(midiTime)} = ${type} ${text}\n`;                
        }).join('');
    }
}
