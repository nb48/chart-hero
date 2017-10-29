import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Model, ModelTrack } from '../../model/model';
import { ChartViewTrack } from '../chart-view-track';

@Injectable()
export class ChartViewTrackControllerService {

    private trackSubject: ReplaySubject<ChartViewTrack>;

    constructor() {
        this.trackSubject = new ReplaySubject<ChartViewTrack>();
    }

    get track(): Observable<ChartViewTrack> {
        return this.trackSubject.asObservable();
    }

    newTrack(track: ChartViewTrack) {
        this.trackSubject.next(track);
    }

    defaultTrack(cs: Model): void {
        let longestTrack = ChartViewTrack.GuitarExpert;
        let longestCount = 0;
        const checkTrack = (track: ModelTrack, view: ChartViewTrack): void => {
            if (track.events.length > longestCount) {
                longestTrack = view;
                longestCount = track.events.length;
            }
        };
        checkTrack(cs.guitar.expert, ChartViewTrack.GuitarExpert);
        checkTrack(cs.guitar.hard, ChartViewTrack.GuitarHard);
        checkTrack(cs.guitar.medium, ChartViewTrack.GuitarMedium);
        checkTrack(cs.guitar.easy, ChartViewTrack.GuitarEasy);
        checkTrack(cs.ghlGuitar.expert, ChartViewTrack.GHLGuitarExpert);
        checkTrack(cs.ghlGuitar.hard, ChartViewTrack.GHLGuitarHard);
        checkTrack(cs.ghlGuitar.medium, ChartViewTrack.GHLGuitarMedium);
        checkTrack(cs.ghlGuitar.easy, ChartViewTrack.GHLGuitarEasy);
        this.newTrack(longestTrack);
    }
}
