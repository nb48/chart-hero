import { Component } from '@angular/core';

import { ChartStoreService } from './chart-store/chart-store.service';
import { AudioStoreService } from './audio-store/audio-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode = 'audio-upload';

  constructor(public audioStore: AudioStoreService, public chartStore: ChartStoreService) {
  }
}
