import { Injectable } from '@angular/core';

const readTime = (time: string): number => {
    try {
        const minutes = time.split('m')[0];
        const seconds = time.split('m')[1].split('s')[0];
        return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    } catch {
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

    constructor() {
        this.$loaded = false;
    }

    get loaded(): boolean {
        return this.$loaded;
    }

    set audio(url: string) {
        this.$loaded = true;
        this.$audio = new Audio();
        this.$audio.src = url;
        this.$audio.load();
        this.$currentTime = '0m0s';
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
        (this.$audio as any).fastSeek(readTime(this.$currentTime));
        this.$frame = window.setInterval(() => this.frame(), 16);
    }

    pause() {
        this.$playing = false;
        this.$audio.pause();
        this.$currentTime = showTime(this.$audio.currentTime);
        window.clearInterval(this.$frame);
    }

    stop() {
        this.$playing = false;
        this.$audio.pause();
        this.$currentTime = showTime(0);
        window.clearInterval(this.$frame);
    }

    private frame() {
        this.$currentTime = showTime(this.$audio.currentTime);
        if (this.$audio.ended) {
            this.stop();
        }
    }
}
