import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { AudioPlayerService } from './audio-player/audio-player.service';

@Injectable()
export class TimeService {

    private currentlyPlaying: boolean;
    private currentlyRepeating: boolean;
    private currentTime: number;
    private lastPlayedTime: number;
    private timeSubject: ReplaySubject<number>;

    constructor(private audioPlayer: AudioPlayerService) {
        this.timeSubject = new ReplaySubject<number>();
        this.time = 0;
        this.currentlyPlaying = false;
        this.lastPlayedTime = this.currentTime;
        this.audioPlayer.times.subscribe((time: number) => {
            if (this.playing) {
                this.time = time;
            }
        });
        this.audioPlayer.ended.subscribe(() => {
            if (this.currentlyRepeating) {
                this.currentlyRepeating = false;
                return;
            }
            if (this.playing) {
                this.stop();
            }
        });
    }

    get times(): Observable<number> {
        return this.timeSubject.asObservable();
    }

    set time(time: number) {
        this.currentTime = time;
        this.refresh();
    }

    get playing(): boolean {
        return this.currentlyPlaying;
    }

    refresh() {
        this.timeSubject.next(this.currentTime);
    }

    play() {
        if (!this.audioPlayer.loaded) {
            return;
        }
        this.currentlyPlaying = true;
        this.audioPlayer.start(this.currentTime);
        this.lastPlayedTime = this.currentTime;
    }

    pause() {
        if (!this.audioPlayer.loaded) {
            return;
        }
        this.currentlyPlaying = false;
        this.audioPlayer.stop();
    }

    stop() {
        if (!this.audioPlayer.loaded) {
            return;
        }
        if (this.playing) {
            this.pause();
        }
        this.time = 0;
    }

    repeat() {
        if (!this.audioPlayer.loaded) {
            return;
        }
        if (this.playing) {
            this.currentlyRepeating = true;
            this.audioPlayer.stop();
            this.time = this.lastPlayedTime;
            this.audioPlayer.start(this.lastPlayedTime);
        } else {
            this.time = this.lastPlayedTime;
        }
    }
}
