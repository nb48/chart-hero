import { Injectable } from '@angular/core';

import { TimeService } from '../time/time.service';

@Injectable()
export class TapInputService {

    private currentTime: number;
    private times: number[];

    constructor(private timeService: TimeService) {
        this.timeService.times.subscribe((time) => {
            this.currentTime = time;
        });
        this.times = [];
    }

    addTime(): void {
        this.times.push(this.currentTime);
    }
}
