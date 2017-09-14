import { Injectable } from '@angular/core';

import { ChartStoreService } from '../chart-store/chart-store.service';

@Injectable()
export class ChartLoaderService {

    constructor(private store: ChartStoreService) {
    }

    set chart(url: string) {
        console.log('Chart URL:', url);
    }
}
