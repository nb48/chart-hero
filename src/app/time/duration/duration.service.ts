import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Track, getTrack } from '../../track/track';
import { ModelService } from '../../model/model.service';
import { Model, ModelTrackEvent } from '../../model/model';
import { AudioPlayerService } from '../audio-player/audio-player.service';

const minDuration = 5;

@Injectable()
export class DurationService {

    private audioDuration: number;
    private modelDuration: number;
    private durationSubject: ReplaySubject<number>;

    constructor(private model: ModelService, private audioPlayer: AudioPlayerService) {
        this.audioDuration = minDuration;
        this.durationSubject = new ReplaySubject<number>();
        this.audioPlayer.durations.subscribe((duration: number) => {
            this.buildAudioDuration(duration);
            this.newDuration();
        });
        this.model.models.subscribe((model) => {
            this.buildDuration(model);
            this.newDuration();
        });
    }

    get durations(): Observable<number> {
        return this.durationSubject.asObservable();
    }

    private newDuration(): void {
        const duration = Math.max(this.audioDuration, this.modelDuration);
        this.durationSubject.next(duration);
    }

    private buildAudioDuration(duration: number): void {
        this.audioDuration = Math.max(minDuration, duration);
    }

    private buildDuration(model: Model): void {
        const events: ModelTrackEvent[] = [];
        Object.keys(Track)
            .map(k => Track[k])
            .filter(v => typeof v === 'number')
            .forEach((track: Track) => {
                events.push(...getTrack(model, track).events);                
            });
        const lastEvent = events.sort((a, b) => b.time - a.time)[0];
        const lastLength = lastEvent && (lastEvent as any).length ? (lastEvent as any).length : 0;
        const duration = lastEvent ? lastEvent.time + lastLength : minDuration;
        this.modelDuration = Math.max(minDuration, duration);
    }
}
