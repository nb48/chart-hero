import { EventEmitter, Injectable } from '@angular/core';

import { BPMChange, Chart, ChartEvent } from '../chart';

const DEFAULT_CHART: Chart = {
    metadata: new Map<string, string>(),
    events: [{
        type: 'time-signature-change',
        time: 0,
        event: {
            timeSignature: 4,
        },
    }, {
        type: 'bpm-change',
        time: 0,
        event: {
            bpm: 60,
        },
    }, {
        type: 'note',
        time: 1,
        event: {
            color: ['green'],
        },
    }],
};

@Injectable()
export class ChartStoreService {

    private $chart: Chart;
    private $beats: number[];
    private $newChart: EventEmitter<void>;

    constructor() {
        this.$chart = DEFAULT_CHART;
        this.buildBeats();
        this.$newChart = new EventEmitter<void>();        
    }

    set chart(chart: Chart) {
        this.$chart = chart;
        this.buildBeats();
        this.$newChart.emit();
    }

    get chart() {
        return this.$chart;
    }

    get beats(): number[] {
        return this.$beats;
    }

    get newChart(): EventEmitter<void> {
        return this.$newChart;
    }

    get offset(): number {
        return this.$chart.metadata.has('Offset')
            ? parseFloat(this.$chart.metadata.get('Offset'))
            : 0;
    }
    
    private buildBeats(): void {
        const bpmChanges = this.$chart.events
            .filter(e => e.type === 'bpm-change')
            .sort((a, b) => a.time - b.time);
        this.$beats = [];
        let currentIncrement = 0;
        let currentTime = 0 - this.offset;
        bpmChanges.forEach((change) => {
            while (currentTime < change.time) {
                this.$beats.push(currentTime);
                currentTime += currentIncrement;
            }
            currentTime = change.time;
            currentIncrement = 60 / (change.event as BPMChange).bpm;
        });
        const endOfSong = 200;
        while (currentTime < endOfSong) {
            this.$beats.push(currentTime);
            currentTime += currentIncrement;
        }
    }
}
