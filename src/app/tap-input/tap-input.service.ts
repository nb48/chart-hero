import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { TimeService } from '../time/time.service';

export interface TapInputTime {
    time: number;
    selected: boolean;
}

@Injectable()
export class TapInputService {

    private timesSubject: BehaviorSubject<TapInputTime[]>;
    private currentTime: number;

    constructor(private timeService: TimeService) {
        this.timesSubject = new BehaviorSubject<TapInputTime[]>([]);
        this.timeService.times.subscribe((time) => {
            this.currentTime = time;
        });
    }

    get times(): Observable<TapInputTime[]> {
        return this.timesSubject.asObservable();
    }

    addTime(): void {
        this.timesSubject.next([...this.timesSubject.value, {
            time: this.currentTime,
            selected: false,
        }]);
    }

    createNotes(): void {
        console.log('Create notes');
    }
}
