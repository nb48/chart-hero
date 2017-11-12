import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AudioPlayerService {

    private $loaded: boolean;
    private $audio: HTMLAudioElement;
    private timeEmitter: EventEmitter<number>;
    private endedEmitter: EventEmitter<void>;

    constructor() {
        this.$loaded = false;
        this.timeEmitter = new EventEmitter<number>();
        this.endedEmitter = new EventEmitter<void>();
    }

    get loaded(): boolean {
        return this.$loaded;
    }

    set audio(url: string) {
        this.$loaded = true;
        this.$audio = new Audio();
        this.$audio.src = url;
        this.$audio.load();
        this.$audio.addEventListener('timeupdate', () => {
            this.timeEmitter.emit(this.$audio.currentTime);
        });
        this.$audio.addEventListener('ended', () => {
            this.endedEmitter.emit();
        });
    }

    get times(): EventEmitter<number> {
        return this.timeEmitter;
    }

    get ended(): EventEmitter<void> {
        return this.endedEmitter;
    }
    
    start(time: number): void {
        this.$audio.currentTime = time;
        this.$audio.play();
    }

    stop(): void {
        this.$audio.pause();
    }
}
