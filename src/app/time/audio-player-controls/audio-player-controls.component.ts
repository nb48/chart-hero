import { Component } from '@angular/core';

import { AudioPlayerService } from '../audio-player/audio-player.service';
import { TimeService } from '../time.service';

export const showTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time - (minutes * 60);
    return `${minutes}m${seconds.toFixed(3)}s`;
};

const readTime = (time: string): number => {
    try {
        const minutes = time.split('m')[0];
        const seconds = time.split('m')[1].split('s')[0];
        const result = parseInt(minutes, 10) * 60 + parseFloat(seconds);
        return result;
    } catch (error) {
        return NaN;
    }
};

@Component({
    selector: 'app-audio-player-controls',
    templateUrl: './audio-player-controls.component.html',
    styleUrls: ['./audio-player-controls.component.css'],
})
export class AudioPlayerControlsComponent {

    private time: number;
    private text: string;

    constructor (
        private audioPlayer: AudioPlayerService,
        private timeService: TimeService,
    ) {
        this.time = 0;
        this.timeService.times.subscribe((time: number) => {
            this.time = time;
        });
    }

    get loaded(): boolean {
        return this.audioPlayer.loaded;
    }

    get playing(): boolean {
        return this.timeService.playing;
    }

    get currentTime(): string {
        return showTime(this.time);
    }

    saveTime(newTime: string): void {
        this.text = newTime;
    }

    changeTime(): void {
        const time = readTime(this.text);
        if (!isNaN(time)) {
            this.timeService.time = time;        
        }
    }

    play(): void {
        this.timeService.play();
    }

    pause(): void {
        this.timeService.pause();
    }

    stop(): void {
        this.timeService.stop();
    }

    repeat(): void {
        this.timeService.repeat();
    }
}
