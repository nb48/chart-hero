import { EventEmitter, Injectable, NgZone } from '@angular/core';

const readTime = (time: string): number => {
    try {
        const minutes = time.split('m')[0];
        const seconds = time.split('m')[1].split('s')[0];
        const result = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
        if (isNaN(result)) {
            throw new Error();
        }
        return result;
    } catch (error) {
        return 0;
    }
};

const showTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time - (minutes * 60);
    return `${minutes}m${seconds.toFixed(2)}s`;
};

@Injectable()
export class AudioPlayerService {

    private $loaded: boolean;
    private $audio: HTMLAudioElement;
    private $currentTime: string;
    private $playing: boolean;
    private $frame: number;
    private $frameEvent: EventEmitter<number>;

    constructor(private zone: NgZone) {
        this.$loaded = false;
        this.$frameEvent = new EventEmitter<number>();
    }

    get loaded(): boolean {
        return this.$loaded;
    }

    set audio(url: string) {
        this.$loaded = true;
        this.$audio = new Audio();
        this.$audio.src = url;
        this.$audio.load();
        this.$currentTime = showTime(0);
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

    play() {
        this.$playing = true;
        this.$audio.play();
        this.$audio.currentTime = readTime(this.$currentTime);
        this.zone.runOutsideAngular(() => {
            this.$frame = window.setInterval(() => this.frame(), 16);
        });
    }

    pause() {       
        this.$playing = false;
        this.$audio.pause();
        this.$currentTime = showTime(this.$audio.currentTime);
        this.zone.runOutsideAngular(() => {
            window.clearInterval(this.$frame);
        });
        this.$frameEvent.emit(this.$audio.currentTime);
    }

    stop() {      
        this.$playing = false;
        this.$audio.pause();
        this.$currentTime = showTime(0);
        this.zone.runOutsideAngular(() => {
            window.clearInterval(this.$frame);
        });
        this.$frameEvent.emit(0);
    }

    get frameEvent(): EventEmitter<number> {
        return this.$frameEvent;
    }

    private frame() {
        this.zone.run(() => {
            this.$currentTime = showTime(this.$audio.currentTime);
            this.$frameEvent.emit(this.$audio.currentTime);
            if (this.$audio.ended) {
                this.stop();
            }
        });
    }
}
