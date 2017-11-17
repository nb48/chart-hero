import { EventEmitter, Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { AudioPlayerService } from './audio-player/audio-player.service';

const interval = 1000 / 60;
const frame = 1 / 60;

@Injectable()
export class TimeService {

    private currentlyPlaying: boolean;
    private currentTime: number;
    private lastPlayedTime: number;
    private subscription: Subscription;
    private timeCounter: number;
    private timeSubject: ReplaySubject<number>;

    constructor(private audioPlayer: AudioPlayerService) {
        this.timeSubject = new ReplaySubject<number>();
        this.time = 0;
        this.currentlyPlaying = false;
        this.lastPlayedTime = this.currentTime;
        this.audioPlayer.times.subscribe((time: number) => {
            if (isNaN(time)) {
                return;
            }
            const difference = Math.abs(time - this.timeCounter);
            if (this.playing && (difference > 0.002 && difference < 0.33)) {
                return;
            }
            this.timeCounter = time;
        });
        this.audioPlayer.ended.subscribe(() => {
            this.stop();
        });
    }

    get times(): Observable<number> {
        return this.timeSubject.asObservable();
    }

    set time(time: number) {
        this.currentTime = time;
        this.timeSubject.next(time);
    }

    get playing(): boolean {
        return this.currentlyPlaying;
    }

    play() {
        this.audioPlayer.start(this.currentTime);
        this.currentlyPlaying = true;
        this.lastPlayedTime = this.currentTime;
        this.timeCounter = undefined;
        const renderer = Observable.interval(interval).subscribe(() => {
            if (this.timeCounter && this.playing) {
                this.timeCounter += frame;
                this.time = this.timeCounter;                
            }
        });
        this.subscription = renderer;
    }

    pause() {
        this.subscription.unsubscribe();
        this.subscription = undefined;
        this.audioPlayer.stop();
        this.currentlyPlaying = false;
        this.time = this.currentTime;
    }

    stop() {
        if (this.playing) {
            this.pause();
        }
        this.time = 0;                
    }

    repeat() {
        if (this.playing) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
            this.audioPlayer.stop();
            this.time = this.lastPlayedTime;
            this.play();
        } else {
            this.time = this.lastPlayedTime;
        }
    }
}
