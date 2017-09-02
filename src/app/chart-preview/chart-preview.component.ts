import { Component, OnInit } from '@angular/core';

import { AudioStoreService } from '../audio-store/audio-store.service';

@Component({
  selector: 'app-chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.css']
})
export class ChartPreviewComponent implements OnInit {

  constructor(public audioStore: AudioStoreService) {
  }

  ngOnInit() {
  }
}
