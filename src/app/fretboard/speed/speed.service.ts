import { Injectable } from '@angular/core';

const speed = 1;
const timeBefore = (1 / speed) * 1.2;
const timeAfter = (1 / speed) * -0.3;
const spacer = 0.2;

const zeroPosition = 100 * 1.2 / 1.5;

@Injectable()
export class SpeedService {

    constructor() {
    }

    zeroPosition() {
        return zeroPosition;
    }

    timeInView(eventTime: number, currentTime: number): boolean {
        return eventTime > (currentTime + timeAfter - spacer) &&
            eventTime < (currentTime + timeBefore + spacer);
    }

    calculateYPos(eventTime: number, currentTime: number): number {
        const bottom = currentTime + timeAfter;
        const top = currentTime + timeBefore;
        return (1 - (eventTime - bottom) / (top - bottom)) * 100;
    }
}
