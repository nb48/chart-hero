import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const frame = 1000 / 60;

@Injectable()
export class AudioPlayerService {

    private context: AudioContext;
    private source: AudioBufferSourceNode;
    private buffer: AudioBuffer;
    private audioLoaded: boolean;
    private startTime: number;
    private offset: number;
    private timeEmitter: EventEmitter<number>;
    private endedEmitter: EventEmitter<void>;

    constructor() {
        this.audioLoaded = false;
        this.timeEmitter = new EventEmitter<number>();
        this.endedEmitter = new EventEmitter<void>();
        this.context = new AudioContext;
        const timestampSupport = (this.context as any).getOutputTimestamp !== undefined;
        Observable.interval(frame).subscribe(() => {
            const base = this.context.currentTime - this.startTime + this.offset;
            if (timestampSupport) {
                const timestamp = (this.context as any).getOutputTimestamp();
                const difference = (performance.now() - timestamp.performanceTime) / 1000;
                const accurateTime = base + difference + (this.context as any).baseLatency;
                this.timeEmitter.emit(accurateTime);
            } else {
                this.timeEmitter.emit(base);
            }
        });
    }

    get loaded(): boolean {
        return this.audioLoaded;
    }

    set audio(arrayBuffer: ArrayBuffer) {
        this.audioLoaded = false;
        this.context.decodeAudioData(arrayBuffer).then((buffer) => {
            this.audioLoaded = true;
            this.buffer = buffer;
        }).catch((error) => {
            this.buffer = undefined;
        });
    }

    get times(): EventEmitter<number> {
        return this.timeEmitter;
    }

    get ended(): EventEmitter<void> {
        return this.endedEmitter;
    }
    
    start(time: number): void {
        this.startTime = this.context.currentTime;
        this.offset = time;
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.context.destination);
        this.source.start(0, time);
        this.source.onended = () => {
            this.endedEmitter.emit();
        };
    }

    stop(): void {
        this.source.stop();
        this.source.disconnect();
    }
}
