import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

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
}
