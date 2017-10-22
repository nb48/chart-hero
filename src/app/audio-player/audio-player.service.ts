import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

const readTime = (time: string): number => {
    try {
        const minutes = time.split('m')[0];
        const seconds = time.split('m')[1].split('s')[0];
        const result = parseInt(minutes, 10) * 60 + parseFloat(seconds);
        if (isNaN(result)) {
            throw new Error();
        }
        return result;
    } catch (error) {
        return 0;
    }
};

@Injectable()
export class AudioPlayerService {

    private $loaded: boolean;
    private $audio: HTMLAudioElement;
    private $currentTime: string;
    private $playing: boolean;
    private $frame: Subscription;
    private $frameEvent: EventEmitter<number>;
    private $lastPlayedTime: number;

    constructor(private zone: NgZone) {
        this.$loaded = false;
        this.$frameEvent = new EventEmitter<number>();
        this.$currentTime = this.showTime(0);
    }

    get loaded(): boolean {
        return this.$loaded;
    }

    set audio(url: string) {
        this.$loaded = true;
        this.$audio = new Audio();
        this.$audio.src = url;
        this.$audio.load();
        this.$playing = false;
    }

    get currentTime(): string {
        return this.$currentTime;
    }

    set currentTime(currentTime: string) {
        this.$currentTime = currentTime;
    }

    get playing(): boolean {
        return this.$playing;
    }

    inputTime(time: string): void {
        this.$currentTime = time;
        this.$frameEvent.emit(readTime(time));
    }

    setTime(time: number): void {
        this.$currentTime = this.showTime(time);
        this.$frameEvent.emit(time);
    }

    showTime(time: number): string {
        const minutes = Math.floor(time / 60);
        const seconds = time - (minutes * 60);
        return `${minutes}m${seconds.toFixed(2)}s`;
    }

    play() {
        this.$lastPlayedTime = readTime(this.$currentTime);
        this.$playing = true;
        this.$audio.play();
        this.$audio.currentTime = readTime(this.$currentTime);
        this.$frame = Observable.interval(16.666).subscribe((n) => {
            this.frame();
        });
    }

    pause() {       
        this.$playing = false;
        this.$audio.pause();
        this.$currentTime = this.showTime(this.$audio.currentTime);
        this.$frame.unsubscribe();
        this.$frameEvent.emit(this.$audio.currentTime);
    }

    stop() {      
        this.$playing = false;
        this.$audio.pause();
        this.$currentTime = this.showTime(0);
        this.$frame.unsubscribe();
        this.$frameEvent.emit(0);
    }

    repeat() {
        this.$currentTime = this.showTime(this.$lastPlayedTime);
        this.$frameEvent.emit(this.$lastPlayedTime);
        if (this.$playing) {
            this.$audio.currentTime = readTime(this.$currentTime);            
        }
    }

    get frameEvent(): EventEmitter<number> {
        return this.$frameEvent;
    }

    private frame() {
        this.$currentTime = this.showTime(this.$audio.currentTime);
        this.$frameEvent.emit(this.$audio.currentTime);
        if (this.$audio.ended) {
            this.stop();
        }
    }
}
