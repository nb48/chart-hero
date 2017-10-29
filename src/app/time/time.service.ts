import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AudioPlayerService } from '../audio-player/audio-player.service';

@Injectable()
export class TimeService {

    private currentlyPlaying: boolean;
    private currentTime: number;
    private lastAudioTime: number;
    private lastPlayedTime: number;
    private lastRealTime: number;
    private subscription: Subscription;
    private timeEmitter: EventEmitter<number>;

    constructor(private audioPlayer: AudioPlayerService) {
        this.timeEmitter = new EventEmitter<number>();
        this.currentlyPlaying = false;
        this.lastPlayedTime = this.currentTime;
        this.audioPlayer.times.subscribe((time: number) => {
            this.audioTimeUpdate(time);
        });
        this.audioPlayer.ended.subscribe(() => {
            this.stop();
        });
    }

    get times(): EventEmitter<number> {
        return this.timeEmitter;
    }

    set time(time: number) {
        this.currentTime = time;
        this.timeEmitter.emit(time);
    }

    get playing(): boolean {
        return this.currentlyPlaying;
    }

    play() {
        this.audioPlayer.start(this.currentTime);
        this.currentlyPlaying = true;
        this.lastRealTime = Date.now();
        this.lastAudioTime = this.currentTime;
        this.lastPlayedTime = this.currentTime;
        this.subscription = Observable.interval(16.666).subscribe(() => {
            this.estimateAudioTime();
        });
    }

    pause() {
        this.subscription.unsubscribe();
        this.audioPlayer.stop();
        this.currentlyPlaying = false;
    }

    stop() {
        this.pause();
        this.time = 0;
    }

    repeat() {
        const playing = this.playing;
        if (playing) {
            this.pause();
        }
        this.currentTime = this.lastPlayedTime;
        if (playing) {
            this.play();
        }
        this.timeEmitter.emit(this.currentTime);
    }

    private audioTimeUpdate(audioTime: number): void {
        this.lastRealTime = Date.now();
        this.lastAudioTime = audioTime;
    }

    private estimateAudioTime(): void {
        const realTime = Date.now();
        const realTimeSinceLastUpdate = realTime - this.lastRealTime;
        const estimate = this.lastAudioTime + (realTimeSinceLastUpdate / 1000);
        this.time = estimate;
    }
}
