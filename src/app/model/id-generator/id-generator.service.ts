import { Injectable } from '@angular/core';

const increment = 10;

@Injectable()
export class IdGeneratorService {

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

    catchUp(maxId: number): void {
        this.nextId = maxId + increment;
    }
}
