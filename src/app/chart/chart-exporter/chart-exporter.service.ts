import { Injectable } from '@angular/core';

import { Chart, BPMChange, TimeSignatureChange, Note } from '../chart';
import { ChartStoreService } from '../chart-store/chart-store.service';
import { MidiTimeConverterService } from '../midi-time-converter/midi-time-converter.service';

@Injectable()
export class ChartExporterService {

    private $chart: Chart;

    constructor(
        private midiTimeConverter: MidiTimeConverterService,
        private store: ChartStoreService) {
    }

    get chart(): string {
        this.$chart = this.store.chart;
        this.$chart.events.forEach((event) => {
            event.time -= this.store.offset;
        });
        this.midiTimeConverter.setup(this.$chart.metadata);
        this.calculateBPMChanges();
        return `[Song]\n{\n${this.exportSong()}}\n`
             + `[SyncTrack]\n{\n${this.exportSyncTrack()}}\n`
             + `[Events]\n{\n${this.exportEvents()}}\n`
             + `[ExpertSingle]\n{\n${this.exportExpertSingle()}}`;
    }

    private calculateBPMChanges(): void {
        this.$chart.events
            .filter(event => event.type === 'bpm-change')
            .sort((a, b) => a.time - b.time)
            .forEach((event) => {
                this.midiTimeConverter.addBPMChange(
                    event.time,
                    this.midiTimeConverter.calculateMidiTime(event.time),
                    (event.event as any).bpm);
            });
    }

    private exportSong(): string {
        const metadata = Array.from(this.$chart.metadata.entries()).map(([name, value]) => {
            return `    ${name} = ${value}\n`;
        });
        return metadata.join('');
    }

    private exportSyncTrack(): string {
        const syncTrack = this.$chart.events
            .filter((event) => {
                return ['time-signature-change', 'bpm-change'].indexOf(event.type) !== -1;
            })
            .map((event) => {
                const time = this.midiTimeConverter.formatMidiTime(
                    this.midiTimeConverter.calculateMidiTime(event.time),
                );
                if (event.type === 'time-signature-change') {
                    const timeSignature = (event.event as TimeSignatureChange).timeSignature;
                    return `    ${time} = TS ${timeSignature}\n`;
                } else if (event.type === 'bpm-change') {
                    const bpm = (event.event as BPMChange).bpm * 1000;
                    return `    ${time} = B ${bpm}\n`;
                }
            });
        return syncTrack.join('');
    }

    private exportEvents(): string {
        return '';
    }

    private exportExpertSingle(): string {
        const expertSingle = this.$chart.events
            .filter(event => event.type === 'note')
            .map((event) => {
                let color;
                switch ((event.event as Note).color[0]) {
                case 'green':
                    color = 0;
                    break;
                case 'red':
                    color = 1;
                    break;
                case 'yellow':
                    color = 2;
                    break;
                case 'blue':
                    color = 3;
                    break;
                case 'orange':
                    color = 4;
                    break;
                case undefined:
                    color = 7;
                    break;
                }
                const time = this.midiTimeConverter.formatMidiTime(
                    this.midiTimeConverter.calculateMidiTime(event.time),
                );
                return `    ${time} = N ${color} 0\n`;
            });
        return expertSingle.join('');
    }
}
