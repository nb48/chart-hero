import { Injectable } from '@angular/core';

import { ChartViewTrack } from '../chart-view-track';

@Injectable()
export class ChartViewControllerService {

    track: ChartViewTrack;

    constructor() {
    }
}
