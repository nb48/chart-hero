import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { ActionsService } from '../model/actions/actions.service';
import { TimeService } from '../time/time.service';

export interface TapInputTime {
    time: number;
    selected: boolean;
}

@Injectable()
export class TapInputService {

    private timesSubject: BehaviorSubject<TapInputTime[]>;
    private currentTime: number;

    constructor(
        private actionsService: ActionsService,
        private timeService: TimeService,
    ) {
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

    selectAll(): void {
        this.timesSubject.value.forEach(time => time.selected = true);
        this.timesSubject.next(this.timesSubject.value);
    }

    deselectAll(): void {
        this.timesSubject.value.forEach(time => time.selected = false);
        this.timesSubject.next(this.timesSubject.value);
    }

    createNotes(): void {
        const newNotes = this.timesSubject.value.filter(time => time.selected);
        const newNoteTimes = newNotes.map(time => time.time);
        const noDuplicates = Array.from(new Set(newNoteTimes));
        this.actionsService.addNoteAtTimes(noDuplicates);
        const newTimes = this.timesSubject.value.filter(time => !time.selected);
        this.timesSubject.next(newTimes);
    }

    deleteTimes(): void {
        this.timesSubject.next([]);
    }
}
