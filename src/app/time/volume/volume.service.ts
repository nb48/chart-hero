import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AudioPlayerService } from '../audio-player/audio-player.service';

const defaultVolume = 25;

@Injectable()
export class VolumeService {

    private volumeSubject: BehaviorSubject<number>;

    constructor(private audioPlayer: AudioPlayerService) {
        this.volumeSubject = new BehaviorSubject<number>(undefined);
        this.newVolume(defaultVolume);
    }

    get volumes(): Observable<number> {
        return this.volumeSubject.asObservable();
    }

    newVolume(volume: number) {
        this.audioPlayer.setVolume(volume / 100);
        this.volumeSubject.next(volume);
    }
}
