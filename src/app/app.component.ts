import { Component } from '@angular/core';

import { ChartStoreService2 } from './chart-store/chart-store.service';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent {

    constructor(private chartStoreService: ChartStoreService2) {
    }
}
