import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Track } from './track';
import { Model, ModelTrack } from '../model/model';

@Injectable()
export class TrackService {

    private tracksSubject: ReplaySubject<Track>;

    constructor() {
        this.tracksSubject = new ReplaySubject<Track>();
    }

    get tracks(): Observable<Track> {
        return this.tracksSubject.asObservable();
    }

    newTrack(track: Track) {
        this.tracksSubject.next(track);
    }

    defaultTrack(cs: Model): void {
        let longestTrack = Track.GuitarExpert;
        let longestCount = 0;
        const checkTrack = (track: ModelTrack, view: Track): void => {
            if (track.events.length > longestCount) {
                longestTrack = view;
                longestCount = track.events.length;
            }
        };
        checkTrack(cs.guitar.expert, Track.GuitarExpert);
        checkTrack(cs.guitar.hard, Track.GuitarHard);
        checkTrack(cs.guitar.medium, Track.GuitarMedium);
        checkTrack(cs.guitar.easy, Track.GuitarEasy);
        checkTrack(cs.ghlGuitar.expert, Track.GHLGuitarExpert);
        checkTrack(cs.ghlGuitar.hard, Track.GHLGuitarHard);
        checkTrack(cs.ghlGuitar.medium, Track.GHLGuitarMedium);
        checkTrack(cs.ghlGuitar.easy, Track.GHLGuitarEasy);
        this.newTrack(longestTrack);
    }
}
