import { EventEmitter, Injectable } from '@angular/core';

const increment = 10;

@Injectable()
export class ChartStoreIdGeneratorService {

    nextId: number;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.nextId = increment;
    }

    id(): number {
        const newId = this.nextId;
        this.nextId += increment;
        return newId;
    }
}
