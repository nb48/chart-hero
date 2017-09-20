import { Component } from '@angular/core';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { ChartStoreService } from '../chart/chart-store/chart-store.service';

const timeBefore = 1.4;
const timeAfter = -0.2;

const zeroPosition = (): number => {
    return timeBefore / (timeBefore - timeAfter) * 100;
};

const calculateLatest = (currentTime: number): number => {
    return currentTime + timeBefore;
};

const calculateEarliest = (currentTime: number): number => {
    return currentTime + timeAfter;
};

const timeIsInView = (time: number, currentTime: number): boolean => {
    const latest = calculateLatest(currentTime);
    const earliest = calculateEarliest(currentTime);
    return time > earliest && time < latest;
};

const calculatePosition = (time: number, currentTime: number): number => {
    const latest = calculateLatest(currentTime);
    const earliest = calculateEarliest(currentTime);
    return (latest - time) / (latest - earliest) * 100;
};

@Component({
    selector: 'app-chart-display',
    templateUrl: './chart-display.component.html',
    styleUrls: ['./chart-display.component.css'],
})
export class ChartDisplayComponent {

    zeroPosition = zeroPosition();
    beats: {
        position: number;
    }[];

    constructor(private audioPlayer: AudioPlayerService, private chartStore: ChartStoreService) {
        this.buildView(0);
        this.audioPlayer.frameEvent.subscribe((time: number) => {
            this.buildView(time);
        });
        this.chartStore.newChart.subscribe(() => {
            this.buildView(0);
        });
    }

    buildView(currentTime: number): void {
        const latest = currentTime + timeBefore;
        const earliest = currentTime + timeAfter;
        this.beats = this.chartStore.beats
            .filter(time => timeIsInView(time, currentTime))
            .map(time => ({
                position: calculatePosition(time, currentTime),
            }));
    }
}
