import { Injectable } from '@angular/core';

import { Chart, ChartEvent, ChartEventType, NoteColor } from '../chart';
import { ChartStoreService } from '../chart-store/chart-store.service';
import { MidiTimeConverterService } from '../midi-time-converter/midi-time-converter.service';

@Injectable()
export class ChartImporterService {

    private $chart: string;
    private $metadata: Map<string, string>;
    private $events: ChartEvent[];

    constructor(
        private midiTimeConverter: MidiTimeConverterService,
        private store: ChartStoreService) {
    }

    set chart(chart: string) {
        this.$chart = chart;
        this.$metadata = new Map<string, string>();
        this.$events = [];
        this.importMetadata();
        this.importSyncTrack();
        this.importEvents();
        this.importExpertSingle();
        this.store.chart = {
            metadata: this.$metadata,
            events: this.$events,
        };
    }

    private importMetadata(): void {
        this.findSection('[Song]').forEach(([name, value]) => {
            this.$metadata.set(name, value);
        });
    }

    private importSyncTrack(): void {
        this.midiTimeConverter.clearBPMChanges();
        this.findSection('[SyncTrack]').forEach(([midiTime, content]) => {
            const [chartType, value] = content.split(' ');
            const time = this.midiTimeConverter.calculateTime(parseInt(midiTime, 10));
            let type: ChartEventType;
            let event;
            if (chartType === 'TS') {
                type = 'time-signature-change';
                event = {
                    timeSignature: parseInt(value, 10),
                };
            } else if (chartType === 'B') {
                type = 'bpm-change';
                event = {
                    bpm: parseInt(value, 10) / 1000,
                };
                this.midiTimeConverter.addBPMChange(
                    time, parseInt(midiTime, 10), parseInt(value, 10) / 1000);
            } else {
                console.warn('Unsupported [SyncTrack]', midiTime, content);
            }
            this.$events.push({ time, type, event });
        });
    }

    private importEvents(): void {
        this.findSection('[Events]').forEach(([midiTime, content]) => {
            console.warn('Unsupported [Event]', midiTime, content);
        });
    }

    private importExpertSingle(): void {
        this.findSection('[ExpertSingle]').forEach(([midiTime, content]) => {
            const [type, value, length] = content.split(' ');
            const time = this.midiTimeConverter.calculateTime(parseInt(midiTime, 10));
            let color: NoteColor;
            switch (value) {
            case '0':
                color = 'green';
                break;
            case '1':
                color = 'red';
                break;
            case '2':
                color = 'yellow';
                break;
            case '3':
                color = 'blue';
                break;
            case '4':
                color = 'orange';
                break;
            default:
                console.warn('Unsupported [ExpertSingle]', midiTime, content);
            }
            this.$events.push({
                time,
                type: 'note',
                event: {
                    color: [color],
                },
            });
        });
    }

    private findSection(header: string): string[][] {
        const fromHeader = this.$chart.substring(this.$chart.indexOf(header));
        const section = fromHeader.substring(fromHeader.indexOf('{') + 1, fromHeader.indexOf('}'));
        return section.split('\n')
            .filter(s => s.trim() !== '')
            .map(s => s.split('=').map(s => s.trim()));
    }
}
