import { EventEmitter, Injectable } from '@angular/core';
import { Howl } from 'howler';
import { interval } from 'rxjs';

const frame = 1000 / 60;

@Injectable()
export class AudioPlayerService {

    private audioLoaded: boolean;
    private volume: number;
    private timeEmitter: EventEmitter<number>;
    private endedEmitter: EventEmitter<void>;
    private durationEmitter: EventEmitter<number>;
    private howl: Howl;

    constructor() {
        this.audioLoaded = false;
        this.volume = undefined;
        this.timeEmitter = new EventEmitter<number>();
        this.endedEmitter = new EventEmitter<void>();
        this.durationEmitter = new EventEmitter<number>();
        interval(frame).subscribe(() => {
            if (this.audioLoaded) {
                this.timeEmitter.emit(this.howl.seek() as number);
            }
        });
    }

    get loaded(): boolean {
        return this.audioLoaded;
    }

    get times(): EventEmitter<number> {
        return this.timeEmitter;
    }

    get ended(): EventEmitter<void> {
        return this.endedEmitter;
    }

    get durations(): EventEmitter<number> {
        return this.durationEmitter;
    }

    setVolume(volume: number) {
        this.volume = volume;
        if (this.howl) {
            this.howl.volume(this.volume);
        }
    }

    setAudio(url: string, extension: string): void {
        this.audioLoaded = false;
        this.howl = new Howl({
            src: [url],
            format: [extension],
            volume: this.volume,
        });
        this.howl.once('load', () => {
            this.audioLoaded = true;
            this.durationEmitter.emit(this.howl.duration());
        });
        this.howl.on('end', () => {
            this.endedEmitter.emit();
        });
    }

    start(time: number): void {
        this.howl.seek(time);
        this.howl.play();
    }

    stop(): void {
        this.howl.pause();
    }
}
