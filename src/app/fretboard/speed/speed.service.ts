import { Injectable } from '@angular/core';

const spacer = 0.2;

const zeroPosition = 100 * 1.5 / 1.8;

const speedValues = {
    1: 0.2,
    2: 0.4,
    3: 0.6,
    4: 0.8,
    5: 1,
    6: 1.2,
    7: 1.4,
    8: 1.6,
    9: 1.8,
    10: 2,
    11: 2.2,
    12: 2.4,
    13: 2.6,
    14: 2.8,
    15: 3.0,
    16: 3.2,
    17: 3.4,
    18: 3.6,
    19: 3.8,
    20: 4,
};

@Injectable()
export class SpeedService {

    private currentSpeed: number;
    private currentSpeedValue: number;
    private timeBefore: number;
    private timeAfter: number;

    constructor() {
        this.speed = 5;
    }

    get speed(): number {
        return this.currentSpeedValue;
    }

    set speed(speed: number) {
        this.currentSpeed = speedValues[speed];
        this.currentSpeedValue = speed;
        this.timeBefore = (1 / this.currentSpeed) * 1.5;
        this.timeAfter = (1 / this.currentSpeed) * -0.3;
    }

    zeroPosition() {
        return zeroPosition;
    }

    timeInView(eventTime: number, currentTime: number): boolean {
        return eventTime > (currentTime + this.timeAfter - spacer) &&
            eventTime < (currentTime + this.timeBefore + spacer);
    }

    calculateYPos(eventTime: number, currentTime: number): number {
        const bottom = currentTime + this.timeAfter;
        const top = currentTime + this.timeBefore;
        return (1 - (eventTime - bottom) / (top - bottom)) * 100;
    }
}
