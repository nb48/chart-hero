import { EventEmitter, Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Observable } from 'rxjs';

const frame = 1000 / 60;

@Injectable()
export class AudioPlayerService {

    private audioLoaded: boolean;
    private timeEmitter: EventEmitter<number>;
    private endedEmitter: EventEmitter<void>;
    private howl: Howl;

    constructor() {
        this.audioLoaded = false;
        this.timeEmitter = new EventEmitter<number>();
        this.endedEmitter = new EventEmitter<void>();
        Observable.interval(frame).subscribe(() => {
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

    setAudio(url: string, extension: string) {
        this.audioLoaded = false;
        this.howl = new Howl({
            src: [url],
            format: [extension],
        });
        this.howl.once('load', () => {
            this.audioLoaded = true;
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
