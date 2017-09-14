import { Injectable } from '@angular/core';

import { ChartStoreService } from '../chart-store/chart-store.service';

@Injectable()
export class ChartBuilderService {

    constructor(private store: ChartStoreService) {
    }
}
